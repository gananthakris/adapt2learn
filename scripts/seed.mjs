import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), ".seed-output");
fs.mkdirSync(outDir, { recursive: true });

const seedSummary = {
  generatedAt: new Date().toISOString(),
  course: "Introduction to React",
  topics: 8,
  quizzes: 1,
  skills: 8
};

fs.writeFileSync(path.join(outDir, "seed-summary.json"), JSON.stringify(seedSummary, null, 2));
console.log("Seed summary written to .seed-output/seed-summary.json");
