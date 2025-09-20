// generateBio.js
const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function generateBio(name, role) {
  // fallback agar API key nahi hai
  if (!OPENAI_API_KEY) return `${name} is a professional ${role}.`;

  try {
    const prompt = `Write a 1-sentence professional bio for ${name}, who is a ${role}.`;
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
      },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );

    return res.data.choices?.[0]?.message?.content?.trim() || `${name} is a professional ${role}.`;
  } catch (err) {
    console.error('OpenAI error:', err.message);
    return `${name} is a professional ${role}.`;
  }
}

module.exports = generateBio;
