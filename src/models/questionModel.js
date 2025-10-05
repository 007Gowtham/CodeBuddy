import prisma from "../db/prismaClient.js";

export const createQuestionModel = async (
  roomTopicId,
  title,
  statement,
  level,
  examples = [],
  testCases = [],
  constraintDescription = null
) => {
  try {
    console.log("🤖 Generating question in model...");

    const question = await prisma.question.create({
      data: {
        room_topic_id: Number(roomTopicId),
        name: title,
        description: statement,
        level_override: level,
        examples: {
          create: examples.map((ex, index) => ({
            input: ex.input,
            output: ex.output,
            order: index + 1
          }))
        },
        testCases: {
          create: testCases.map((tc, index) => ({
            input: tc.input,
            expected_output: tc.expected_output,
            is_sample: tc.is_sample ?? false,
            is_hidden: tc.is_hidden ?? true,
            weight: tc.weight ?? (tc.is_sample ? 10 : 5),
            time_limit: tc.time_limit ?? 1000,
            memory_limit: tc.memory_limit ?? 256,
            order: index + 1
          }))
        },
        constraint: constraintDescription
          ? {
              create: {
                description: constraintDescription
              }
            }
          : undefined
      },
      include: { examples: true, testCases: true, constraint: true }
    });

    console.log("✅ Question created successfully:", question.name);
    return question;
  } catch (err) {
    console.error("❌ Error creating question:", err);
    throw err;
  }
};
