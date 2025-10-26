// user_app/controllers/user_controller.js
require('dotenv').config()
const jwt = require('jsonwebtoken');
const userService = require('../services/user_service');

class UserController {

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);
      res.status(200).json(user);
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await userService.createUser(userData);
      res.status(201).json(user);
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.loginUser(email, password);
      
      const accessToken = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
      res.setHeader('Authorization', `Bearer ${accessToken}`);
  
      res.status(200).json({ message: 'Login successful', accessToken }); //token ki jagah user tha og me
    }
    catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async followUser(req, res) {
    try {
      const followerId = req.user.id; // Assume user is authenticated and their ID is available
      console.log(followerId);
      const { followedId } = req.params;
      const follow = await userService.followUser(followerId, followedId);
      res.status(200).json({ message: 'User followed successfully', follow });
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async unfollowUser(req, res) {
    try {
      const followerId = req.user.id; // Assume user is authenticated
      const { followedId } = req.params;
      await userService.unfollowUser(followerId, followedId);
      res.status(200).json({ message: 'User unfollowed successfully' });
    }
    catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getFollowers(req, res) {
    try {
      const { userId } = req.params;
      const followers = await userService.getFollowers(userId);
      res.status(200).json(followers);
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async getFollowing(req, res) {
    try {
      const { userId } = req.params;
      const following = await userService.getFollowing(userId);
      res.status(200).json(following);
    }
    catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
