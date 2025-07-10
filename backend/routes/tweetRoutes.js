import express from "express";
import {
  getTweets,
  createTweet,
  toggleLikeTweet,
} from "../controllers/tweetController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTweets).post(protect, createTweet);
router.route("/:id/like").post(protect, toggleLikeTweet);

export default router;
