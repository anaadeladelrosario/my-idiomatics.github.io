'use client'

import styles from "./page.module.css";
import "./globals.css";
import { useState } from "react";

const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    const idiomatic = `Instead of doing word-for-word translations, interpret and translate the idiomatic expression and detect the language the idiom is written in and the desired language output language if specified: ${prompt}`
    e.preventDefault();
    console.log("prompt", prompt)
    console.log("api", apikey)
    console.log("idiomatic", idiomatic)
    setLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         /* 'Authorization': `Bearer ${apikey}` ,*/
        },
        body: JSON.stringify({idiomatic}),
      });

      const data = await res.json();
      setResponse(data.choices[0].text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error communicating with OpenAI');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={"overflow-y-auto p-10 rounded-md max-w-3xl mx-auto"}>
          <h1 className="text-3xl font-bold underline">My idiomatics</h1>
      <form onSubmit={handleSubmit}>
        <textarea
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
