const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const REQUIRED_COMMIT_ARTIFACTS = [
  "requirements.md",
  "architecture.md",
  "design-review.md",
  "impl-plan.md",
  "code-review.md",
  "verification.md",
];

const REQUIRED_PR_ARTIFACTS = [
  ...REQUIRED_COMMIT_ARTIFACTS,
  "PR.md",
  "CHANGELOG.md",
];

const IN_SCOPE_MARKERS = [
  { label: "Add Todo", patterns: [/Add Todo/, /addTodo/] },
  { label: "Edit Todo", patterns: [/Edit/, /updateTodo/, /Save Todo/] },
  { label: "Delete Todo", patterns: [/Delete/, /deleteTodo/] },
];

const TEST_COMMAND = ["node", ["--test", ".\\todo-app\\app.test.js"]];

function readStdin() {
  return new Promise(function (resolve, reject) {
    let input = "";

    process.stdin.setEncoding("utf8");
    process.stdin.on("data", function (chunk) {
      input += chunk;
    });
    process.stdin.on("end", function () {
      resolve(input);
    });
    process.stdin.on("error", reject);
  });
}

function emit(decision, reason) {
  const output = {
    permissionDecision: decision,
  };

  if (reason) {
    output.permissionDecisionReason = reason;
  }

  process.stdout.write(JSON.stringify(output, null, 2));
}

function logDiagnostic(message) {
  process.stderr.write(String(message) + "\n");
}

function normalizeToolInput(toolInput) {
  if (typeof toolInput === "string") {
    return toolInput;
  }

  if (!toolInput || typeof toolInput !== "object") {
    return "";
  }

  const candidateKeys = [
    "command",
    "input",
    "text",
    "prompt",
    "args",
    "commandLine",
  ];

  for (const key of candidateKeys) {
    const value = toolInput[key];

    if (typeof value === "string") {
      return value;
    }

    if (Array.isArray(value)) {
      return value.join(" ");
    }
  }

  try {
    return JSON.stringify(toolInput);
  } catch (error) {
    return "";
  }
}

function tokenizeCommand(commandText) {
  return commandText
    .toLowerCase()
    .replace(/[\r\n]+/g, " ")
    .replace(/[|;&()]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function hasSequence(tokens, sequence) {
  if (tokens.length < sequence.length) {
    return false;
  }

  for (let index = 0; index <= tokens.length - sequence.length; index += 1) {
    let matches = true;

    for (let offset = 0; offset < sequence.length; offset += 1) {
      if (tokens[index + offset] !== sequence[offset]) {
        matches = false;
        break;
      }
    }

    if (matches) {
      return true;
    }
  }

  return false;
}

function classifyCommand(commandText) {
  const tokens = tokenizeCommand(commandText);

  if (hasSequence(tokens, ["gh", "pr", "create"])) {
    return "pr";
  }

  if (hasSequence(tokens, ["git", "commit"])) {
    return "commit";
  }

  return null;
}

function resolveRepoPath(cwd, relativePath) {
  return path.resolve(cwd || process.cwd(), relativePath);
}

function missingFiles(cwd, files) {
  return files.filter(function (file) {
    return !fs.existsSync(resolveRepoPath(cwd, file));
  });
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    return "";
  }
}

function verifyAppScope(cwd) {
  const appJsPath = resolveRepoPath(cwd, path.join("todo-app", "app.js"));
  const indexHtmlPath = resolveRepoPath(
    cwd,
    path.join("todo-app", "index.html"),
  );
  const appJs = readFileSafe(appJsPath);
  const indexHtml = readFileSafe(indexHtmlPath);
  const combined = appJs + "\n" + indexHtml;

  const missing = IN_SCOPE_MARKERS.filter(function (check) {
    return !check.patterns.some(function (pattern) {
      return pattern.test(combined);
    });
  }).map(function (check) {
    return check.label;
  });

  return {
    ok: missing.length === 0,
    missing: missing,
  };
}

function runTests(cwd) {
  const result = spawnSync(TEST_COMMAND[0], TEST_COMMAND[1], {
    cwd: cwd || process.cwd(),
    encoding: "utf8",
    shell: false,
    windowsHide: true,
  });

  const stdout = typeof result.stdout === "string" ? result.stdout.trim() : "";
  const stderr = typeof result.stderr === "string" ? result.stderr.trim() : "";
  const details = [stdout, stderr].filter(Boolean).join("\n");

  return {
    ok: result.status === 0,
    details: details,
    error: result.error ? String(result.error.message || result.error) : "",
  };
}

function verificationHasEvidence(cwd) {
  const verificationPath = resolveRepoPath(cwd, "verification.md");
  const content = readFileSafe(verificationPath);

  const hasAutomatedEvidence =
    /node\s+--test\s+\.\\todo-app\\app\.test\.js/i.test(content);
  const hasManualEvidence = /Manual Checks Actually Performed/i.test(content);
  const avoidsFabrication = !/not run|pending|tbd/i.test(content);

  return {
    ok: hasAutomatedEvidence && hasManualEvidence && avoidsFabrication,
    reasons: [
      hasAutomatedEvidence
        ? null
        : "verification.md does not document the required automated test command.",
      hasManualEvidence
        ? null
        : "verification.md does not contain a manual verification evidence section.",
      avoidsFabrication
        ? null
        : "verification.md appears to contain placeholder or non-executed verification language.",
    ].filter(Boolean),
  };
}

function prPreparationLooksValid(cwd) {
  const prPath = resolveRepoPath(cwd, "PR.md");
  const content = readFileSafe(prPath);

  const hasPreparationTitle = /Pull Request Preparation/i.test(content);
  const avoidsFalseClaim =
    !/pull request was created/i.test(content) ||
    /No GitHub pull request was created/i.test(content);
  const hasManualStep = /Create a GitHub pull request manually/i.test(content);

  return {
    ok: hasPreparationTitle && avoidsFalseClaim && hasManualStep,
    reasons: [
      hasPreparationTitle
        ? null
        : "PR.md does not present itself as PR preparation.",
      avoidsFalseClaim
        ? null
        : "PR.md appears to claim that a pull request already exists.",
      hasManualStep
        ? null
        : "PR.md does not preserve the manual PR creation step.",
    ].filter(Boolean),
  };
}

function formatMissing(label, items) {
  if (!items.length) {
    return null;
  }

  return label + ": " + items.join(", ");
}

function validateCommitLike(cwd) {
  const failures = [];
  const missingArtifacts = missingFiles(cwd, REQUIRED_COMMIT_ARTIFACTS);
  const scopeCheck = verifyAppScope(cwd);
  const tests = runTests(cwd);

  if (missingArtifacts.length) {
    failures.push(
      formatMissing("Missing required SDLC artifacts", missingArtifacts),
    );
  }

  if (!scopeCheck.ok) {
    failures.push(
      formatMissing("Todo scope markers not found", scopeCheck.missing),
    );
  }

  if (!tests.ok) {
    failures.push(
      "Automated tests failed: node --test .\\todo-app\\app.test.js" +
        (tests.error ? " (" + tests.error + ")" : "") +
        (tests.details ? "\n" + tests.details : ""),
    );
  }

  return failures;
}

function validatePr(cwd) {
  const failures = [];
  const missingArtifacts = missingFiles(cwd, REQUIRED_PR_ARTIFACTS);
  const tests = runTests(cwd);
  const verification = verificationHasEvidence(cwd);
  const prPrep = prPreparationLooksValid(cwd);

  if (missingArtifacts.length) {
    failures.push(
      formatMissing("Missing required PR artifacts", missingArtifacts),
    );
  }

  if (!tests.ok) {
    failures.push(
      "Automated tests failed: node --test .\\todo-app\\app.test.js" +
        (tests.error ? " (" + tests.error + ")" : "") +
        (tests.details ? "\n" + tests.details : ""),
    );
  }

  if (!verification.ok) {
    failures.push.apply(failures, verification.reasons);
  }

  if (!prPrep.ok) {
    failures.push.apply(failures, prPrep.reasons);
  }

  return failures;
}

function buildReason(prefix, failures) {
  return prefix + "\n- " + failures.join("\n- ");
}

async function main() {
  const rawInput = await readStdin();
  const event = rawInput.trim() ? JSON.parse(rawInput) : {};
  const hookEventName = event.hook_event_name || event.hookEventName;
  const toolName = event.tool_name || event.toolName;
  const toolInput = event.tool_input || event.toolArgs;
  const cwd = event.cwd || process.cwd();

  if (hookEventName !== "PreToolUse" && hookEventName !== "preToolUse") {
    emit("allow");
    return;
  }

  if (toolName !== "powershell" && toolName !== "bash") {
    emit("allow");
    return;
  }

  const commandText = normalizeToolInput(toolInput);
  const commandType = classifyCommand(commandText);

  if (!commandType) {
    emit("allow");
    return;
  }

  let failures = [];

  if (commandType === "commit") {
    failures = validateCommitLike(cwd);
  } else if (commandType === "pr") {
    failures = validatePr(cwd);
  }

  if (failures.length) {
    const reasonPrefix =
      commandType === "pr"
        ? "Denied gh pr create: pre-PR validation failed."
        : "Denied git command: pre-commit validation failed.";

    logDiagnostic(reasonPrefix + " " + failures.join(" | "));
    emit("deny", buildReason(reasonPrefix, failures));
    process.exitCode = 2;
    return;
  }

  emit("allow");
}

main().catch(function (error) {
  logDiagnostic(error && error.stack ? error.stack : String(error));
  emit("deny", "Denied by validation hook because the hook errored.");
  process.exitCode = 2;
});
