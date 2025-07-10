import asyncHandler from "../middleware/asyncHandler.js";
import Tweet from "../models/tweetModel.js";

const getTweets = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find({})
    .populate("author", "name username")
    .sort({ createdAt: -1 });
  res.json(tweets);
});

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    res.status(400);
    throw new Error("Invalid tweet data");
  }

  const tweet = new Tweet({
    author: req.user._id,
    content,
  });

  const created = await tweet.save();
  const populated = await created.populate("author", "name username");

  res.status(201).json(populated);
});

const toggleLikeTweet = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);

  if (!tweet) {
    res.status(404);
    throw new Error("Resource not found");
  }

  const userId = req.user._id;
  const alreadyLiked = tweet.likes.includes(userId);

  if (alreadyLiked) {
    tweet.likes = tweet.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
  } else {
    tweet.likes.push(userId);
  }

  await tweet.save();
  const updatedTweet = await tweet.populate("author", "name username");

  res.status(200).json(updatedTweet);
});

const getTweetById = asyncHandler(async (req, res) => {
  const tweet = await Tweet.findById(req.params.id);

  if (tweet) return res.json(tweet);
});

export { getTweets, createTweet, toggleLikeTweet, getTweetById };
