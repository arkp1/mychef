import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

const hf = new HfInference(process.env.REACT_APP_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // system prompt for the gemini model
// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
// You don't need to use every ingredient they mention in your recipe. 
// The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
// Format your response in markdown to make it easier to render to a web page.`;

// // initialize the gemini API
// const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

// export async function getRecipeFromGemini(ingredientsArr) {
//   const ingredientsString = ingredientsArr.join(", ");
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//  // instead of getGenerativeModel

//     const prompt = `${SYSTEM_PROMPT} I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

//     const result = await model.generateContent(prompt);
//     return result.response.text(); // gemini's response
//   } catch (err) {
//     console.error("Error fetching recipe:", err.message);
//     return "Sorry, I couldn't generate a recipe right now.";
//   }
// }



//qwen AI

// import axios from 'axios';

// const API_KEY = process.env.REACT_APP_QWEN_API_KEY; // replace with your actual API key

// export async function getRecipeFromQwen(prompt) {
//   const url = 'https://api.example.com/v1/generate'; // Replace with actual Qwen API URL

//   const messages = [
//     { role: "system", content: "You are Qwen, created by Alibaba Cloud. You are a helpful assistant." },
//     { role: "user", content: prompt },
//   ];

//   try {
//     const response = await axios.post(url, {
//       api_key: API_KEY,
//       messages: messages,
//       max_new_tokens: 512,
//     });

//     const generatedText = response.data.result; // adjust depending on the API response structure
//     return generatedText;
//   } catch (error) {
//     console.error("Error fetching recipe:", error);
//     return "Sorry, I couldn't generate a recipe right now.";
//   }
// }
