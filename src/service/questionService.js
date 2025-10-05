import { PromptTemplate } from "@langchain/core/prompts";
import { questionGenerationPrompt } from "../prompts/questiongeneration.js";
import { geminiLLM } from "../config/langchain.js";
import { getResponseText, cleanJsonResponse, safeJsonParse } from "../utils/parseHelpers.js";
import { retryWithBackoff } from "../utils/retryHelper.js";

export const questionChain = async (input) => {
  try {
    console.log("🤖 Generating question with Gemini...");

    const promptTemplate = PromptTemplate.fromTemplate(questionGenerationPrompt);
    const formattedPrompt = await promptTemplate.format(input);
    const response = await geminiLLM.invoke(formattedPrompt);
    const responseText = getResponseText(response);

    console.log("📝 Raw response received, parsing JSON...");
    console.log("Response preview:", responseText.substring(0, 200) + "...");

    const cleanedText = cleanJsonResponse(responseText);
    const parsedData = safeJsonParse(cleanedText);

    const requiredFields = ["name", "description", "input_format", "output_format", "constraints", "examples"];

    for (const field of requiredFields) {
      if (!parsedData[field]) throw new Error(`Missing required field: ${field}`);
    }

    if (!Array.isArray(parsedData.examples) || parsedData.examples.length < 2) throw new Error("At least 2 examples are required");

    console.log("✅ Question generated successfully:", parsedData.name);

    return parsedData;
    
  } catch (error) {
    console.error("❌ Error in questionChain:", error.message);
    throw new Error(`Question generation failed: ${error.message}`);
  }
};

export const generateQuestionWithRetry = async (input) => {
  return retryWithBackoff(() => questionChain(input));
};
