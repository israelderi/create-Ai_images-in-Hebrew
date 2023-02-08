import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});

const openAI = new OpenAIApi(configuration);

const createImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const aiResponse = await openAI.createImage({
            prompt: prompt,
            size: '1024x1024',
            n: 1,
            response_format: 'b64_json',
          });
          const newImage = aiResponse.data.data[0].b64_json;
          res.status(200).json({ photo: newImage });
    } catch (error) {
        res.status(500).send(error?.response.data.error.message || 'Something went wrong!');
    }
};

router.post('/', createImage);

export default router;