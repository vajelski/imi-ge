type HistoryMessage = { role: 'user' | 'model'; text: string };

const postGemini = async (body: Record<string, unknown>) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json() as { text?: string; image?: string | null; error?: string };
  if (!response.ok) throw new Error(data.error || 'AI request failed');
  return data;
};

export const chatWithAssistant = async (history: HistoryMessage[], newMessage: string): Promise<string> => {
  try {
    const result = await postGemini({ operation: 'chat', history, message: newMessage });
    return result.text || 'ბოდიშს გიხდით, ამჟამად ვერ გპასუხობთ. გთხოვთ სცადოთ მოგვიანებით.';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "დაფიქსირდა შეცდომა კავშირის დროს. გთხოვთ შეამოწმოთ ინტერნეტი.";
  }
};

// Specialized function for Global Assistant (Ultra-low token usage)
export const chatWithGlobalAssistant = async (history: HistoryMessage[], newMessage: string): Promise<string> => {
  try {
    const result = await postGemini({ operation: 'global', history, message: newMessage });
    return result.text || 'ვერ გავიგე.';
  } catch (error) {
    console.error("Global Assistant Error:", error);
    return "ხარვეზია.";
  }
};

// Specialized function for Voice Chat Demo
export const chatWithVoiceAssistant = async (message: string): Promise<string> => {
  try {
    const result = await postGemini({ operation: 'voice', message });
    return result.text || 'ვერ გავიგე, გთხოვთ გაიმეოროთ.';
  } catch (error) {
    console.error("Voice API Error:", error);
    return "კავშირის პრობლემაა.";
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    const result = await postGemini({ operation: 'image', prompt });
    return result.image || null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    return null;
  }
};

export const analyzeImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const result = await postGemini({ operation: 'vision', base64Image, mimeType, prompt });
    return result.text || 'ვერ შევძელი სურათის გაანალიზება.';
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "დაფიქსირდა შეცდომა სურათის დამუშავებისას.";
  }
};
