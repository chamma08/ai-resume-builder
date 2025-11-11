import OpenAI from "openai";

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is not set in environment variables");
}

if (!process.env.OPENAI_MODEL_NAME) {
    console.error("❌ OPENAI_MODEL_NAME is not set in environment variables");
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
    defaultHeaders: {
        'Content-Type': 'application/json',
    }
});

console.log("✅ AI service initialized with model:", process.env.OPENAI_MODEL_NAME);
console.log("✅ AI service base URL:", process.env.OPENAI_BASE_URL || "default OpenAI URL");

export default openai;