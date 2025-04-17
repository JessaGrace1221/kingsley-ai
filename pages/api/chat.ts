import { NextApiRequest, NextApiResponse } from 'next';

const OPENAI_API_KEY = process.env.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;

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
          content: process.env.SYSTEM_PROMPT,
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
