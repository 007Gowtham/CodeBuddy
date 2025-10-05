import { createQuestionController } from "../controllers/questionController.js";
import express from "express";

const questionRouter = express.Router()

questionRouter.post('/:id',createQuestionController);

export default questionRouter;