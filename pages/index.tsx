import React, { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data.output);
  };

  return (
    <div style={{ padding: '3rem', fontFamily: 'Arial' }}>
      <h1>KINGSLEY</h1>
      <p>Your emotionally intelligent executive assistant</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit">Ask Kingsley</button>
      </form>

      {response && (
        <div style={{ marginTop: '2rem' }}>
          <strong>🧾 Answer:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
// Main chat page goes here
