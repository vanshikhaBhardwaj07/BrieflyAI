import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function generateSummaryFromOpenAI(pdfText: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: SUMMARY_SYSTEM_PROMPT },
                {
                    role: "user",
                    content: `Transform this document into an engaging,easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                }
            ],
            temperature: 0.5,
            max_tokens: 1500
        });

        return completion.choices[0].message.content;

    } catch (error) {
        const err = error as { status?: number; message?: string };

        if (err.status === 429) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }
        throw err;
    }
}
