const Post = require('../models/post');
const Hashtag = require('../../search_feature/models/hashtag')

class PostService {
  async getAllPosts() {
    return await Post.find().populate('user_id', 'username').sort({ created_at: -1 });
  }

  async getPostById(postId) {
    const post = await Post.findById(postId).populate('user_id', 'username');
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async createPost(userId, content) {
    const post = new Post({ user_id: userId, content });
    this.hashtagCheck(content);
    await post.save();
    return post;
  }

  async updatePost(userId, postId, content) {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.user_id !== userId){
      throw new Error('Unauthorized: You can only update your own posts');
    }
    post.content = content;
    post.updated_at = new Date();
    this.hashtagCheck(content);
    await post.save();
    return post;
  }

  async deletePost(userId, postId) {
    // const post = await Post.findByIdAndDelete(postId);
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    console.log(post.user_id);
    console.log(userId);
    if (post.user_id.toString() !== userId){
      throw new Error('Unauthorized: You can only delete your own posts');
    }
    await post.delete()
    return post;
  }

  async hashtagCheck(content) {
    // Extract all hashtags from the content
    const hashtags = await Hashtag.find({}); // Fetch all hashtags from the database
    const databaseHashtags = hashtags.map(h => h.hashtag); // List of hashtags from the database
    const postHashtags = [];

    // Split content by '#' and check each potential hashtag
    const contentHashtags = content.split('#').slice(1); // Remove text before the first '#'
    
    for (const tag of contentHashtags) {
        let hashtag = '#';
        for (let char of tag) {
            if (/[a-zA-Z0-9]/.test(char)) { // Only alphanumeric characters are valid
                hashtag += char;
            } else {
                break; // Stop once a non-alphanumeric character is encountered
            }
        }

        postHashtags.push(hashtag);

        // Check if the hashtag already exists in the database
        if (databaseHashtags.includes(hashtag)) {
            const existingHashtag = await Hashtag.findOne({ hashtag: hashtag });
            existingHashtag.frequency += 1;
            existingHashtag.lastUsed = new Date();
            await existingHashtag.save();
        } else {
            const newHashtag = new Hashtag({
                hashtag: hashtag,
                frequency: 1,
                lastUsed: new Date()
            });
            await newHashtag.save();
        }
    }

    return postHashtags.length > 0 ? postHashtags : null;
  }
}


module.exports = new PostService();
