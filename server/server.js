import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/generate", async (req, res) => {
  const { task, input } = req.body;

  const prompts = {
    summarize: `Summarize the following text:\n\n${input}`,
    caption: `Generate a catchy caption for the following text:\n\n${input}`,
    rewrite: `Rewrite the following text to improve its clarity and style:\n\n${input}`,
  };

  try {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{role: "user", content: prompts[task]}]
    });
    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Error generating content' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});