const Post = require('../models/post');
const fs = require('fs');

module.exports = class postController {
  // Fetch all posts
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Fetch a single post by ID
  static async fetchPostByID(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Create a new post
  static async createPost(req, res) {
    const photoName = req.file.filename;
    const post = new Post({
      title: req.body.title,
      category: req.body.category,
      details: req.body.details,
      photo: photoName,
    });

    try {
      await post.save();
      res.status(201).json({ message: 'Post created successfully!' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Update post
  static async updatePost(req, res) {
    const id = req.params.id;
    const { title, details } = req.body;
    let photoName = '';
    try {
      const post = await Post.findById(id);
      if (req.file) {
        photoName = req.file.filename;
        fs.unlinkSync(`./public/uploads/${post.photo}`, (err) => {
          if (err) throw err;
          console.log('File has been delete');
        });
      } else {
        photoName = post.photo;
      }
      await Post.updateOne({ _id: id }, { title, photo: photoName, details });
      res
        .status(200)
        .json({ message: `PostID: ${post.id} has been changeed!` });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Delete post
  static async deletePost(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findByIdAndDelete(id);
      if (post.photo != '' && post.photo != null) {
        fs.unlinkSync(`./public/uploads/${post.photo}`, (err) => {
          if (err) throw err;
          console.log(`File has been delete!!`);
        });
      } else {
        console.log(`No such file in directory don't need to delete`);
      }
      res.status(200).json({ message: `The post has been delete!!` });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
