import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";

// Assign API key to variable
const apiKey = process.env.API_KEY;
// Initialise OpenAI API
const OPENAI_API_KEY = new OpenAI({ apiKey: apiKey });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
   
        const prompt = req.body.prompt;

    if(!prompt) {
        res.status(400).json({ error: "Missing prompt" });
        return;
    }
    if(prompt.length > 100) {
        res.status(400).json({ error: "Prompt too long" });
        return;
    }  
    
    const completion = await OPENAI_API_KEY.completions.create({
        model: "gpt-4o-mini",
        prompt: `Instead of doing word-for-word translations, interpret and translate the idiomatic expression and detect the language the idiom is written in and the desired language output language if specified ${prompt}`,
        max_tokens: 500,
        temperature: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
    });

    if(!completion.choices[0].text) {
        res.status(500).json({ error: "No response from OpenAI" });
        return;
    }

    res.status(200).json({completion});
}
}