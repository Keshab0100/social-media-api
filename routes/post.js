import express from "express";
import checkAuth from "../middleware/auth_user.js";
import Post from "../model/Post.js";

const Router = express.Router();

// Delete api/posts/:id delete post
// Get api/posts/id get a single post with id populated with no of likes and comments
// Get api/all_posts return all post by auth user in order of post time
//    Return
//         -id
//         -title
//         -desc
//         -created_at
//         -comments array of comments
//         -likes number
// Post api/like/:id like the post with id by auth user
// Post api/unlike/:id unlike the post with id by auth user

// Post api/comment/id add comment for post with id by auth user      IP comment  OP comment-id

// Post api/posts new post
Router.post("/", checkAuth, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();

    res.status(200).json({
      postId: savedPost.id,
      title: req.body.title,
      description: req.body.desc || "No desc provided",
      created_at: savedPost.createdAt,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

export default Router;
