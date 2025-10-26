const express = require('express');
const postController = require('../controllers/post_controller');
const { authenticateToken } = require('../../shared/utils/auth');

const router = express.Router();

router.get('/posts', postController.getAllPosts.bind(postController));
router.get('/posts/:post_id', postController.getPost.bind(postController));
router.post('/posts', authenticateToken, postController.createPost.bind(postController));
router.put('/posts/:post_id', authenticateToken, postController.updatePost.bind(postController));
router.delete('/posts/:post_id', authenticateToken, postController.deletePost.bind(postController));

module.exports = router;
