
import { useToast } from "@/components/ui/use-toast";

// Define the response type from Gemini
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
  }>;
}

// Keep track of API key without storing it in localStorage for security
let geminiApiKey: string | null = null;

export const setGeminiApiKey = (key: string) => {
  geminiApiKey = key;
};

export const getGeminiApiKey = () => {
  // First check memory
  if (geminiApiKey) return geminiApiKey;
  
  // Then check localStorage as fallback
  const storedKey = localStorage.getItem("geminiApiKey");
  if (storedKey) {
    geminiApiKey = storedKey;
    return storedKey;
  }
  
  return null;
};

export const geminiAiService = {
  async generateResponse(
    message: string, 
    context: string,
    category?: string
  ): Promise<string> {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      throw new Error("API key not set. Please set your Gemini API key first.");
    }

    try {
      // Build the prompt with context about disability assistance
      const categoryContext = category 
        ? `The user is asking about ${category}-related assistance. `
        : '';
        
      const prompt = `
        ${categoryContext}You are a helpful AI assistant specializing in accessibility and disability support.
        Provide clear, concise, and respectful guidance for the following query related to accessibility assistance.
        Context about the assistance platform: ${context}
        
        User query: ${message}
      `;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate response");
      }

      const data = await response.json() as GeminiResponse;
      
      if (
        data.candidates &&
        data.candidates[0]?.content?.parts &&
        data.candidates[0].content.parts[0]?.text
      ) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Error with Gemini API:", error);
      throw error;
    }
  }
};
