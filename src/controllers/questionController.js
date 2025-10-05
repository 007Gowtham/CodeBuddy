import asyncHandler from '../utils/async-handler.js';
import ApiResponse from '../utils/api-response.js';
import { saveQuestionService } from '../service/savequestions.js';

export const createQuestionController = asyncHandler(async (req, res) => {
        console.log("🤖 Generating the question in controller");

      
        const { id } = req.params; 
        

        const savedQuestion = await saveQuestionService(id);

        return res.status(201).json(
            new ApiResponse(savedQuestion, "Question created successfully", 201)
        );

});
