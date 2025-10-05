import { createQuestionService } from './src/service/questionService.js';
import prisma from './src/db/prismaClient.js';

async function testQuestionCreation() {
  try {
    console.log("Testing question creation...");
  
    // First, let's check if there are any rooms
    const rooms = await prisma.room.findMany({
      include: { roomTopics: true }
    });
    
    console.log(`Found ${rooms.length} rooms in database`);
    
    if (rooms.length === 0) {
      console.log("No rooms found. Creating a test room with topics...");
      
      // Create a test room
      const testRoom = await prisma.room.create({
        data: {
          name: "Test Room",
          team_size: 2,
          max_teams: 5,
          duration: 60,
          roomTopics: {
            create: [
              {
                name: "Dynamic Programming",
                level: "Easy",
                no_of_questions: 2
              },
              {
                name: "Arrays",
                level: "Medium", 
                no_of_questions: 1
              }
            ]
          }
        },
        include: { roomTopics: true }
      });
      
      console.log("Created test room:", testRoom.room_id);
      
      // Test question creation for this room
      const questions = await createQuestionService(testRoom.room_id);
      console.log(`Successfully created ${questions.length} questions`);
      
      // Display the created questions
      questions.forEach((q, index) => {
        console.log(`\nQuestion ${index + 1}:`);
        console.log(`Title: ${q.name}`);
        console.log(`Description: ${q.description?.substring(0, 100)}...`);
        console.log(`Examples: ${q.examples?.length || 0}`);
        console.log(`Test Cases: ${q.testCases?.length || 0}`);
      });
      
    } else {
      // Use the first existing room
      const room = rooms[0];
      console.log(`Using existing room: ${room.name} (ID: ${room.room_id})`);
      
      const questions = await createQuestionService(room.room_id);
      console.log(`Successfully created ${questions.length} questions`);
    }
    
  } catch (error) {
    console.error("Error testing question creation:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testQuestionCreation();
