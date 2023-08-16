import User from "../model/User.js";

export const get_user = async (req, res) => {
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
};

export const follow_user = async (req, res) => {
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
};

export const unfollow_user = async (req, res) => {
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
};
