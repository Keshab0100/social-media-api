import express from "express";
import checkAuth from "../middleware/auth_user.js";
import User from "../model/User.js";

const Router = express.Router();

// Instead of ID I have used email, bcoz we are nowhere giving user their id, hence you won't be able to check the follow/unfollow routes
// atleast user will know their emails so they can follow/unfollow each other.

// GET user
Router.get("/user", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.userData.email });
    if (!user) res.status(404).json("User not found");

    res.status(200).json({
      username: user.username,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

// POST api/follow/id
Router.post("/follow/:id", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.id });
    const currentUser = await User.findOne({ email: req.userData.email });

    if (!user.followers.includes(req.userData.email)) {
      await user.updateOne({ $push: { followers: req.userData.email } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json("Successfully followed the user");
    } else {
      res.status(400).json("You already follow that user!!");
    }
  } catch (error) {}
});

// POST api/unfollow/id
Router.post("/unfollow/:id", checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.id });
    const currentUser = await User.findOne({ email: req.userData.email });

    if (user.followers.includes(req.userData.email)) {
      await user.updateOne({ $pull: { followers: req.userData.email } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json("Successfully unfollowed the user");
    } else {
      res.status(400).json("You already don't follow that user!!");
    }
  } catch (error) {}
});

export default Router;
