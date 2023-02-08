import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../MongoDB/PostModel.js';

const router = express.Router();

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

const getImg = async (req, res) => {
    try {
        const allPosts = await Post.find({});
        res.status(200).json({ success: true, data: allPosts });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Error loading posts!' });
      }
};

const createImg = async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
          });
          res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating the post! please try again.' });
    }
};

router.get("/", getImg);
router.post("/", createImg);

export default router;