import { GoogleGenerativeAI } from "@google/generative-ai";

type Destination = {
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
};

// const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const API_KEY = "AIzaSyCEgT4oH6RHIsGoQOiX5gVhfNFRprfihTg";

const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateDestination(): Promise<Destination[] | null> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Mention number of cities below

    const prompt = `Generate a JSON array with 50 famous cities, ensuring the response is strictly valid JSON:
[
  {
    "city": "Paris",
    "country": "France",
    "clues": [
      "This city is home to a famous tower that sparkles every night.",
      "Known as the 'City of Love' and a hub for fashion and art."
    ],
    "fun_fact": [
      "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
      "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules."
    ],
    "trivia": [
      "This city is famous for its croissants and macarons. Bon appétit!",
      "Paris was originally a Roman city called Lutetia."
    ]
  },
  {
    "city": "Tokyo",
    "country": "Japan",
    "clues": [
      "This city has the world's busiest pedestrian crossing.",
      "Famous for cherry blossoms and anime culture."
    ],
    "fun_fact": [
      "Tokyo was formerly known as Edo before it became Japan’s capital.",
      "It has more Michelin-star restaurants than any other city in the world."
    ],
    "trivia": [
      "Sushi, a global favorite, originated in this country!",
      "The city has an underground bicycle parking system!"
    ]
  },
  {
    "city": "New York",
    "country": "USA",
    "clues": [
      "The Statue of Liberty calls this city home.",
      "Known as 'The Big Apple'."
    ],
    "fun_fact": [
      "Times Square was originally called Longacre Square until 1904.",
      "Central Park is larger than the country of Monaco!"
    ],
    "trivia": [
      "This city has the first pizzeria in the United States.",
      "New York City’s subway system is one of the world's largest."
    ]
  }
]`;

    // Generate content
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

    // Extract response text correctly
    const responseText = await result.response.text();

    if (responseText) {
      console.log("Raw response from Gemini:", responseText); // Debugging step

      // Ensure it's valid JSON by cleaning extra formatting
      const cleanedResponseText = responseText.trim().replace(/^```json\s*/, "").replace(/\s*```$/, "");

      console.log("Cleaned response:", cleanedResponseText); // Debugging step

      return JSON.parse(cleanedResponseText);
    }
  } catch (error) {
    console.error("Error generating destination data:", error);
  }

  return null;
}
