const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are a helpful customer support agent for a small e-commerce store.

Store policies:
- Shipping: We ship worldwide. Delivery takes 5–10 business days.
- Returns: 30-day return window for unused products.
- Refunds: Refunds processed within 5 business days.
- Support hours: Monday–Friday, 9 AM–6 PM IST.

Guidelines:
- Be concise and friendly
- Answer clearly
- If unsure, say you will connect to human support
`;

async function generateReply(history, userMessage) {
  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),

      { role: "user", content: userMessage },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 200,
      temperature: 0.3,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("LLM error:", error.message);
    return "Sorry, our support agent is temporarily unavailable.";
  }
}

module.exports = { generateReply };
