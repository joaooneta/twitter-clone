import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import tweetContents from "./data/tweetContents.js";
import User from "./models/userModel.js";
import Tweet from "./models/tweetModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Tweet.deleteMany();

    const createdUsers = await User.insertMany(users);

    const tweetsData = [];

    createdUsers.forEach((user) => {
      for (let i = 0; i < 3; i++) {
        const content =
          tweetContents[Math.floor(Math.random() * tweetContents.length)];

        const otherUsers = createdUsers.filter(
          (u) => u._id.toString() !== user._id.toString()
        );

        const likes = otherUsers
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * otherUsers.length))
          .map((u) => u._id);

        tweetsData.push({
          author: user._id,
          content,
          likes,
        });
      }
    });

    await Tweet.insertMany(tweetsData);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Tweet.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-D") {
  destroyData();
} else {
  importData();
}
