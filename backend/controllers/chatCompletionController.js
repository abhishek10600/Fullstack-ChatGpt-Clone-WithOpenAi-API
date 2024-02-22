import openAI from "openai";

export const sendChat = async (req, res, next) => {
    try {
        const { prompt } = req.body
        const openAi = new openAI({
            apiKey: process.env.OPENAI_API_SECRET_KEY
        })
        const completion = await openAi.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            max_tokens: 100
        });
        const modelResponse = completion.choices[0].message.content
        return res.status(200).json({
            success: true,
            message: "Api is working",
            data: modelResponse
        })
    } catch (error) {
        console.log(error)
    }
}