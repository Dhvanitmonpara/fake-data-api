import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_URL);
const genAI = new GoogleGenerativeAI("AIzaSyBbO-tLXbc8sATbyfARMqfXTG1wvcaTEzA");

const base_prompt = "I'll provide you some mongodb schema and I want you to generate some data for me. ignore all the extra text just give me objects, Make sure every object is and references are connected to each other. No text formatting just a simple string with quality text. Here is the schema: "

export default async function run(prompt) {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // const prompt = "Write a story about a magic backpack."

    const result = await model.generateContent(base_prompt + prompt);
    const response = result.response;
    const text = response.text();
    return text
}

// run('feeling headache');