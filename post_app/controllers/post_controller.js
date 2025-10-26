const { use } = require('../routes/post_routes');
const postService = require('../services/post_service');

class PostController {
  async getAllPosts(req, res) {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(posts);
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPost(req, res) {
    try {
      const post = await postService.getPostById(req.params.post_id);
      res.status(200).json(post);
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createPost(req, res) {
    try {
      const userId = req.user.id; // Assume authenticated user ID
      const { content } = req.body;
      const post = await postService.createPost(userId, content);
      res.status(201).json(post);
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { content } = req.body;
      const userId = req.user.id;
      const post = await postService.updatePost(userId, req.params.post_id, content);
      res.status(200).json({ message: 'Post updated successfully', post });
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      await postService.deletePost(req.user.id, req.params.post_id);
      res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new PostController();
