const User = require('../../user_app/models/user');
const Post = require('../../post_app/models/post');
const Hashtag = require('../../search_feature/models/hashtag');

class SearchService {
    static async getMatchedUsers(searchQuery) {
        try {
            return await User.find({ username: { $regex: searchQuery, $options: 'i' } });
        } catch (err) {
            console.error('Error fetching matched users:', err);
            throw err; // Re-throw to be handled by the controller
        }
    }

    static async getMatchedPosts(searchQuery) {
        try {
            return await Post.find({ content: { $regex: searchQuery, $options: 'i' } });
        } catch (err) {
            console.error('Error fetching matched posts:', err);
            throw err;
        }
    }

    static async getMatchedHashtags(searchQuery) {
        try {
            return await Hashtag.find({ hashtag: { $regex: `#${searchQuery}`, $options: 'i' } });
        } catch (err) {
            console.error('Error fetching matched hashtags:', err);
            throw err;
        }
    }
}

module.exports = SearchService;
