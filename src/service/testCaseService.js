import { PromptTemplate } from "@langchain/core/prompts";
import { testCaseGenerationPrompt } from "../prompts/testcaseprompt.js";
import { geminiLLM } from "../config/langchain.js";
import { getResponseText, cleanJsonResponse, safeJsonParse } from "../utils/parseHelpers.js";
import { retryWithBackoff } from "../utils/retryHelper.js";

export const testCaseChain = async (input) => {
    try {
        console.log("🧪 Generating test cases with Gemini...");

        const promptTemplate = PromptTemplate.fromTemplate(testCaseGenerationPrompt);

        const formattedPrompt = await promptTemplate.format(input);

        const response = await geminiLLM.invoke(formattedPrompt);

        const responseText = getResponseText(response);

        console.log("📝 Raw response received, parsing JSON...");
        console.log("Response preview:", responseText.substring(0, 200) + "...");

        const cleanedText = cleanJsonResponse(responseText);
        const parsedData = safeJsonParse(cleanedText);

        if (!Array.isArray(parsedData)) throw new Error("Test cases must be an array");

        if (parsedData.length < 5) throw new Error(`At least 5 test cases required, got ${parsedData.length}`);

        const sampleCases = parsedData.filter(tc => tc.is_sample === true && tc.is_hidden === false);

        if (sampleCases.length < 2) throw new Error(`At least 2 sample test cases required, got ${sampleCases.length}`);
        parsedData.forEach(tc => {
            tc.weight = tc.weight || (tc.is_sample ? 10 : 5);
            tc.time_limit = tc.time_limit || 1000;
            tc.memory_limit = tc.memory_limit || 256;
        });

        console.log(`✅ Generated ${parsedData.length} test cases successfully`);

        return parsedData;
        
    } catch (error) {
        console.error("❌ Error in testCaseChain:", error.message);
        throw new Error(`Test case generation failed: ${error.message}`);
    }
};

export const generateTestCasesWithRetry = async (input) => {
    return retryWithBackoff(() => testCaseChain(input));
};
