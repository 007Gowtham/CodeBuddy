import fetch from 'node-fetch';

async function testQuestionCreationAPI() {
  try {
    console.log("Testing question creation API endpoint...");
    
    // First, let's check if the server is running
    const healthCheck = await fetch('http://localhost:5000/');
    if (!healthCheck.ok) {
      console.error("Server is not running. Please start the server first with: npm run dev");
      return;
    }
    
    console.log("Server is running!");
    
    // Test the question creation endpoint
    // Note: You'll need to replace '1' with an actual room ID from your database
    const response = await fetch('http://localhost:5000/questions/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log("Question creation successful!");
      console.log("Response:", JSON.stringify(result, null, 2));
    } else {
      const error = await response.text();
      console.error("Question creation failed:", error);
    }
    
  } catch (error) {
    console.error("Error testing API:", error.message);
  }
}

testQuestionCreationAPI();
