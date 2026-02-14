import { spawn } from "node:child_process";

const port = 4022;
const baseUrl = `http://127.0.0.1:${port}`;

const pages = [
  "/",
  "/dashboard",
  "/skill-graph",
  "/tutor",
  "/analytics",
  "/class-analytics",
  "/login",
  "/topics/topic-jsx",
  "/quiz/quiz-jsx-basics"
];

const apiChecks = [
  {
    path: "/api/quiz",
    method: "GET",
    expected: (json) => Array.isArray(json.quizzes) && json.quizzes.length > 0
  },
  {
    path: "/api/recommendations",
    method: "GET",
    expected: (json) => Array.isArray(json.recommendations) && json.recommendations.length > 0
  },
  {
    path: "/api/chat",
    method: "POST",
    body: { message: "Smoke test" },
    expected: (json) => typeof json.reply === "string" && json.reply.length > 0
  }
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 12000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function waitUntilReady(retries = 40) {
  for (let i = 0; i < retries; i += 1) {
    try {
      const res = await fetchWithTimeout(baseUrl);
      if (res.ok) return;
    } catch {
      // retry
    }
    await wait(500);
  }
  throw new Error("Server did not become ready in time");
}

async function main() {
  const server = spawn("npx", ["next", "start", "-p", String(port)], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"]
  });

  server.stdout.on("data", (chunk) => {
    process.stdout.write(`[server] ${chunk}`);
  });

  server.stderr.on("data", (chunk) => {
    process.stderr.write(`[server] ${chunk}`);
  });

  try {
    await waitUntilReady();

    for (const path of pages) {
      const res = await fetchWithTimeout(`${baseUrl}${path}`);
      if (!res.ok) throw new Error(`Page check failed: ${path} -> ${res.status}`);
      console.log(`[ok] Page ${path} -> ${res.status}`);
    }

    for (const check of apiChecks) {
      const res = await fetchWithTimeout(`${baseUrl}${check.path}`, {
        method: check.method,
        headers: { "Content-Type": "application/json" },
        body: check.body ? JSON.stringify(check.body) : undefined
      });
      if (!res.ok) throw new Error(`API check failed: ${check.path} -> ${res.status}`);
      const json = await res.json();
      if (!check.expected(json)) throw new Error(`API payload check failed: ${check.path}`);
      console.log(`[ok] API ${check.path} -> ${res.status}`);
    }

    console.log("E2E smoke checks passed.");
  } finally {
    if (!server.killed) {
      server.kill("SIGTERM");
      await wait(500);
      if (!server.killed) server.kill("SIGKILL");
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
