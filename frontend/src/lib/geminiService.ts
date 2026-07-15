import { GoogleGenAI } from '@google/genai';

// Initialize the client
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
  vertexai: true
});

export const chatWithAssistant = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `შენ ხარ IMI.GE-ის ქართული AI ასისტენტი. ისაუბრე ბუნებრივად, ადამიანურად, თბილად და პროფესიონალურად. შენი ამოცანაა მომხმარებელს დაეხმარო IMI.GE-ის სერვისების გაგებაში: AI CRM ინტეგრაცია, AI-first CRM ტრანსფორმაცია, ხმოვანი AI ასისტენტები, RAG სისტემები, ბიზნეს ავტომატიზაცია, AI Operator და Social Commerce AI. უპასუხე ქართულად. არ მოიგონო ფასი, კლიენტის შედეგი, API, ინტეგრაცია ან ფუნქცია, რომელიც ამ კონტექსტში არ არის დადასტურებული. თუ კითხვა სცდება IMI.GE-ის ცოდნის სფეროს, თქვი ეს პირდაპირ და შესთავაზე კონსულტაციის მოთხოვნა. მოკლე კითხვაზე უპასუხე მოკლედ, რთულზე კი ახსენი ნაბიჯებად. არ გამოიყენო ხელოვნური მარკეტინგული ფრაზები და არ წარმოაჩინო თავი ადამიანად.`,
        temperature: 0.7,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "ბოდიშს გიხდით, ამჟამად ვერ გპასუხობთ. გთხოვთ სცადოთ მოგვიანებით.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "დაფიქსირდა შეცდომა კავშირის დროს. გთხოვთ შეამოწმოთ ინტერნეტი.";
  }
};

// Specialized function for Global Assistant (Ultra-low token usage)
export const chatWithGlobalAssistant = async (history: { role: 'user' | 'model'; text: string }[], newMessage: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        // STRICT instruction to save tokens and keep voice output short
        systemInstruction: `შენ ხარ IMI.GE-ის ხმოვანი ასისტენტი.
        Answer in Georgian. 
        CRITICAL: Keep response under 20 words. 
        No lists. No markdown. No formatting. Just plain text.`,
        temperature: 0.5,
        maxOutputTokens: 50, // Hard limit to save tokens
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "ვერ გავიგე.";
  } catch (error) {
    console.error("Global Assistant Error:", error);
    return "ხარვეზია.";
  }
};

// Specialized function for Voice Chat Demo
export const chatWithVoiceAssistant = async (message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `შენ ხარ IMI.GE-ის ხმოვანი ასისტენტი.
        Answer in Georgian. Keep your responses VERY short, conversational, and concise (maximum 2-3 sentences). 
        Do not use markdown formatting like asterisks or bullet points.`,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text || "ვერ გავიგე, გთხოვთ გაიმეოროთ.";
  } catch (error) {
    console.error("Voice API Error:", error);
    return "კავშირის პრობლემაა.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const imageData = response.generatedImages[0].image;
      if (imageData && imageData.imageBytes) {
        const base64ImageBytes = imageData.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};

export const analyzeImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const base64Data = base64Image.split(',')[1];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        role: 'user',
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt + " (უპასუხე ქართულად)",
          },
        ],
      },
    });

    return response.text || "ვერ შევძელი სურათის გაანალიზება.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "დაფიქსირდა შეცდომა სურათის დამუშავებისას.";
  }
};
