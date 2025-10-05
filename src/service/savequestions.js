import { generateQuestionWithRetry } from "./questionService.js";
import { generateTestCasesWithRetry } from "./testCaseService.js";
import { createQuestionModel } from "../models/questionModel.js"; 
import prisma from "../db/prismaClient.js";

const generateQuestion = async (name, level, roomTopicId) => {
  try {
    console.log("🤖 Generating question for topic:", name);

    const generatedQuestion = await generateQuestionWithRetry({
      topic: name,
      level,
      concepts: "sliding window"
    });

    console.log("📝 Generated question:", generatedQuestion.name);

    const testCaseInput = {
      problem: generatedQuestion.description,
      inputFormat: generatedQuestion.input_format,
      outputFormat: generatedQuestion.output_format,
      constraints: generatedQuestion.constraints
    };

    const generatedTestCases = await generateTestCasesWithRetry(testCaseInput);
    console.log(`🧪 Generated ${generatedTestCases.length} test cases`);

    const examples = generatedQuestion.examples || [];
    const constraintDescription = generatedQuestion.constraints || null;

    const savedQuestion = await createQuestionModel(
      roomTopicId,
      generatedQuestion.name,
      generatedQuestion.description,
      generatedQuestion.level_override || level,
      examples,
      generatedTestCases,
      constraintDescription
    );

    console.log("✅ Question saved successfully:", savedQuestion.name);
    return savedQuestion;

  } catch (err) {
    console.error("❌ Failed to generate and save question:", err);
    throw err;
  }
};

export const saveQuestionService = async (roomId) => {
  try {
    const room = await prisma.room.findUnique({ where: { room_id: Number(roomId) } });
    if (!room) throw new Error("Room not found");

    const topics = await prisma.roomTopic.findMany({ where: { room_id: room.id } });

    const totalQuestionsCreated = [];

    for (const topic of topics) {
      for (let i = 0; i < topic.no_of_questions; i++) {
        const question = await generateQuestion(topic.name, topic.level, topic.id);
        totalQuestionsCreated.push(question);
      }
    }

    return totalQuestionsCreated;

  } catch (err) {
    console.error("❌ Error in saveQuestionService:", err);
    throw err;
  }
};
