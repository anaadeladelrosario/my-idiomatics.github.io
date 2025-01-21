'use client'

import styles from "./page.module.css";
import "./globals.css";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/idiomatics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt}),
      });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error communicating with OpenAI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <p className="fancy-purple">Test...</p>
      <p className="fancy-skyblue">Test...</p>
      <main className={styles.main}>
        <div className={"overflow-y-auto p-10 rounded-md max-w-3xl mx-auto"}>
          <h1 className="text-3xl font-bold underline">My idiomatics</h1>
      <form onSubmit={handleSubmit}>
        <textarea className="fancy-skyblue"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your idiom"
        />
        <button  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {response && (
        <div>
          <h2>Response from OpenAI:</h2>
          <p>{response}</p>
        </div>
      )}
          
        </div>
      </main>
      <footer className={styles.footer}>    
      <p>Intended meaning rather than translating literally...</p>    
      </footer>
    </div>
  );
}
