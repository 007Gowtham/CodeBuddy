import dotenv from "dotenv";
import { generateQuestionWithRetry } from "./service/questionService.js";
import { generateTestCasesWithRetry } from "./service/testCaseService.js";

dotenv.config();

async function testQuestionGeneration() {
  try {
    console.log("==============================");
    console.log("Generating Question...");
    console.log("==============================");

    const questionInput = {
      topic: "tree",
      level: "hard",
      concepts: "maximum subarray, dynamic programming"
    };

    const questionData = await generateQuestionWithRetry(questionInput);
    console.log("\n✅ Generated Question JSON:");
    console.log(JSON.stringify(questionData, null, 2));

    console.log("\n==============================");
    console.log("Generating Test Cases...");
    console.log("==============================");

    const testCaseInput = {
      problem: questionData.description,
      inputFormat: questionData.input_format,
      outputFormat: questionData.output_format,
      constraints: questionData.constraints
    };

    const testCases = await generateTestCasesWithRetry(testCaseInput);
    console.log("\n✅ Generated Test Cases JSON:");
    console.log(JSON.stringify(testCases, null, 2));

    console.log("\n==============================");
    console.log("SUMMARY:");
    console.log(`Total Test Cases: ${testCases.length}`);
    console.log(`Sample Test Cases: ${testCases.filter(tc => tc.is_sample).length}`);
    console.log(`Hidden Test Cases: ${testCases.filter(tc => tc.is_hidden).length}`);
    console.log("==============================");

    return { question: questionData, testCases };
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    process.exit(1);
  }
}

testQuestionGeneration()
  .then(() => console.log("\n✅ All tests completed!"))
  .catch(error => console.error("\n❌ Test suite failed:", error));
