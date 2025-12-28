const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a e-commerce support agent.

Shipping: Worldwide (5–10 business days)
Returns: 30-day return window
Support: Mon–Fri, 9AM–6PM IST
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

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 200,
    });

    return res.choices[0].message.content;
  } catch (err) {
    console.error("LLM error:", err.message);
    return "Sorry, I'm having trouble responding right now.";
  }
}

module.exports = { generateReply };
