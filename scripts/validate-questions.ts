import { collectQuestionBank } from "../lib/questions/collectQuestionBank";
import { validateQuestionBank } from "../lib/questions/validatePracticeQuestion";
import { runGeneratorSelfTests } from "../data/questions/year9/maths/generators/runGeneratorSelfTests";

const generatorErrors = runGeneratorSelfTests();
if (generatorErrors.length > 0) {
  console.error("Generator self-tests failed:\n");
  for (const msg of generatorErrors) console.error(`  ${msg}`);
  process.exit(1);
}

const issues = validateQuestionBank(collectQuestionBank());

if (issues.length > 0) {
  console.error(`Question validation failed (${issues.length} issue(s)):\n`);
  for (const issue of issues) {
    console.error(`  [${issue.id}] ${issue.rule}: ${issue.message}`);
  }
  process.exit(1);
}

console.log(`OK — ${collectQuestionBank().length} questions passed validation.`);