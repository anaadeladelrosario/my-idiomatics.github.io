/*Use Next.js API Routes to act as an intermediary between the frontend and OpenAI's API, 
ensuring you don’t expose your OpenAI API key on the client side and set up a serverless function to handle requests to the OpenAI API.*/
import axios from 'axios';
import OpenAI from "openai";

// Assign API key to variable
const apiKey = process.env.API_KEY;
// Initialise OpenAI API
const OPENAI_API_KEY = new OpenAI({ apiKey: apiKey });

const completion = await OPENAI_API_KEY.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { prompt } = req.body;

            const response = await axios.post(
                'https://api.openai.com/v1/completions', /*GPT-3.5*/ /*Use https://api.openai.com/v1/chat/completions for GPT-4*/
                {
                    model: 'text-davinci-003',
                    prompt,
                    max_tokens: 150,
                },
               {
                    headers: {
                       'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data from OpenAI' });
            console.log(error)
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
