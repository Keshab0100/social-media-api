import Post from "../model/Post.js";
import Comment from "../model/Comment.js"

export const add_post = async (req, res) => {
  const newPost = new Post({
    userId: req.userData.email,
    title: req.body.title,
    desc: req.body.desc,
  });
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
};

export const delete_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.userData.email) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(200).json("You can only delete post created by you.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const like_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.userData.email)) {
      await post.updateOne({ $push: { likes: req.userData.email } });
      res.status(200).json("The post has been liked");
    } else {
      res.status(200).json("You have already like the post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unlike_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(req.userData.email)) {
      await post.updateOne({ $pull: { likes: req.userData.email } });
      res.status(200).json("The post has been unliked");
    } else {
      res.status(200).json("You have already unliked the post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const get_one_post = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.find({ postId: req.params.id });
    res.status(200).json({
      id: post.id,
      title: post.title,
      desc: post.desc,
      created_at: post.createdAt,
      comments: comment.length,
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const get_all_post = async (req, res) => {
  try {
    const userPost = await Post.find({ userId: req.userData.email });

    const modifiedArray = await Promise.all(
      userPost.map(async (post) => {
        const commentArray = await Comment.find({
          postId: post._id,
        });

        return {
          _id: post._id,
          title: post.title,
          desc: post.desc,
          created_at: post.createdAt,
          comments: commentArray,
          likes: post.likes.length,
        };
      })
    );

    console.log(modifiedArray);
    res.json(modifiedArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const add_comment = async (req, res) => {
  const comment = new Comment({
    postId: req.params.id,
    userId: req.userData.email,
    comment: req.body.comment,
  });
  try {
    const savedComment = await comment.save();
    res.status(200).json({
      commentId: savedComment.id,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
