// user_app/routes/user_routes.js
const express = require('express');
const userController = require('../controllers/user_controller');
const { authenticateToken } = require('../../shared/utils/auth');

const router = express.Router();

// User routes
router.get('/users', userController.getAllUsers.bind(userController));
router.get('/users/:username', userController.getUser.bind(userController));
router.post('/users', userController.createUser.bind(userController));
router.post('/users/login', userController.loginUser.bind(userController));

// Follow/Unfollow routes
router.post('/users/:followedId/follow', authenticateToken, userController.followUser.bind(userController));
router.delete('/users/:followedId/unfollow', authenticateToken, userController.unfollowUser.bind(userController));
router.get('/users/:userId/followers', authenticateToken, userController.getFollowers.bind(userController));
router.get('/users/:userId/following', authenticateToken, userController.getFollowing.bind(userController));

module.exports = router;
