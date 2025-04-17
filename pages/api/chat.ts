import { NextApiRequest, NextApiResponse } from 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string;
      SYSTEM_PROMPT: string;
    }
  }
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? '';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: process.env.SYSTEM_PROMPT ?? '',
        },
        {
          role: 'user',
          content: prompt,
        }
      ],
    }),
  });

  const data = await response.json();
  const output = data?.choices?.[0]?.message?.content || 'No response';

  res.status(200).json({ output });
}
