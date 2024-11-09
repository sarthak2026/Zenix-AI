// main.js

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

// Import the personal question handling functions
import { isPersonalQuestion, getPersonalAnswer } from './personalQuestions'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
}

async function run(prompt) {
  // If the prompt is a personal question, return the predefined answer
  if (isPersonalQuestion(prompt)) {
    const answer = getPersonalAnswer(prompt)
    console.log(answer)
    return answer
  }

  // If it's not a personal question, use the generative AI API
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  })

  const result = await chatSession.sendMessage(prompt)
  const response = await result.response.text()
  console.log(response)

  return response
}

export default run
