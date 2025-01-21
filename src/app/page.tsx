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
    <div  className={styles.page}>
       <div style={{color: "#282425", backgroundColor: "#EF9995", width: "100%", padding: "20px", borderRadius: "20px"}} className="text-3xl font-bold fancy-skyblue">
       My idiomatics
        </div>
      <main style={{border: "1px solid #ccc", borderRadius: "20px", backgroundColor: "#EBDC99"}} className={styles.main}>
        <div className={"overflow-y-auto p-10 rounded-md max-w-3xl mx-auto"}>
          <h1 style={{color: "#282425"}} className="text-xl font-bold ">Type your idiom here</h1>
      <form onSubmit={handleSubmit}>
        <textarea style={{width: "100%", maxWidth: "600px",  height:"auto%", minHeight:"150px", margin:"1%", padding:"10px", boxSizing: "border-box", resize: "vertical", backgroundColor: "#d1c6a1", color: "#282425"}}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your idiom"
        />
        <button style={{backgroundColor: "#EF9995", color: "#282425"}}  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {response && (
        <div style={{border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#d1c6a1", padding: "20px", marginTop: "20px"}} className={styles.main}>
          <h2 style={{color: "#282425"}} className="text-2xl font-bold">Response from OpenAI:</h2>
          <p style={{color: "#282425"}}>{response}</p>
        </div>
      )}
        </div>
      </main>
      <footer className={styles.footer}>    
      <p style={{color:"transparent",  background: "linear-gradient(to right, #E4D8B4 50%, #282425 50%)", padding: "5px", borderRadius: "10px"}}>
        <span style={{color: "#282425",}}>Intended meaning rather</span><span style={{color: "#E4D8B4"}}> than translating literally...</span></p>    
      </footer>
    </div>
  );
}
