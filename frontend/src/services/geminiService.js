const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function generateOrder(prompt) {
    try {
        const finalPrompt = `
You are an AI Order Intelligence Assistant.

Convert the user's request into a valid order and analyze business risk.

User Request:
${prompt}

Return ONLY valid JSON in this exact format:

{
  "order": {
    "customerName": "AI Customer",
    "items": [
      {
        "productName": "",
        "quantity": 0,
        "price": 0
      }
    ],
    "totalAmount": 0,
    "status": "Pending"
  },
  "analysis": {
    "riskLevel": "Low",
    "confidence": 95,
    "warnings": [],
    "recommendation": ""
  }
}

Order Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- totalAmount = quantity * price.
- confidence must be between 0 and 100.
- riskLevel must be Low, Medium or High.
- warnings must be an array of strings.

Risk Analysis Rules:
- If quantity is greater than 100, riskLevel must be "High".
- If price is less than 1000 for premium electronics like iPhone, MacBook, Laptop, riskLevel must be "High".
- If totalAmount is greater than 500000, riskLevel must be "Medium" or "High".
- Add clear warnings for unusual quantity, suspicious price, or high-value order.
- recommendation must be specific and business-focused.
`;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: finalPrompt,
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json();

        console.log("Gemini Raw Response:", data);

        if (!response.ok) {
            throw new Error(data.error?.message || "Gemini API failed");
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("Gemini se empty response aaya.");
        }

        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        console.log("Clean AI Text:", cleanText);

        return JSON.parse(cleanText);
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
}