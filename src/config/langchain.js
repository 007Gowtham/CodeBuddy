import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

export const geminiLLM = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.0-flash-exp",
  temperature: 0.7,
  maxOutputTokens: 8192,
  topP: 0.95,
  topK: 40,
});
