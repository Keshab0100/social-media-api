import express from "express";
import checkAuth from "../middleware/auth_user.js";
import { follow_user, get_user, unfollow_user } from "../controller/user.js";
import { login, register } from "../controller/auth.js";
import {
  add_comment,
  add_post,
  delete_post,
  get_all_post,
  get_one_post,
  like_post,
  unlike_post,
} from "../controller/post.js";

const Router = express.Router();

// Instead of ID I have used email, bcoz we are nowhere giving user their id, hence you won't be able to check the follow/unfollow routes
// atleast user will know their emails so they can follow/unfollow each other.

// Authenticate login
Router.post("/authenticate", login);

// POST api/follow/id
Router.post("/follow/:id", checkAuth, follow_user);

// POST api/unfollow/id
Router.post("/unfollow/:id", checkAuth, unfollow_user);

// GET user
Router.get("/user", checkAuth, get_user);

// Post api/posts new post
Router.post("/posts", checkAuth, add_post);

// Delete api/posts/:id delete post
Router.delete("/posts/:id", checkAuth, delete_post);

// Post api/like/:id like the post with id by auth user
Router.post("/like/:id", checkAuth, like_post);

// Post api/unlike/:id unlike the post with id by auth user
Router.post("/unlike/:id", checkAuth, unlike_post);

// Post api/comment/id add comment for post with id by auth user      IP comment  OP comment-id
Router.post("/comment/:id", checkAuth, add_comment);

// Get api/posts/id get a single post with id populated with no of likes and comments
Router.get("/posts/:id", checkAuth, get_one_post);

// Get api/all_posts return all post by auth user in order of post time
Router.post("/all_posts", checkAuth, get_all_post);

// Register
Router.get("/register", register);

export default Router;
