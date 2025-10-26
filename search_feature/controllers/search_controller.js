// // search_feature/controllers/search_controller.js
const searchService = require('../services/search_services');

class SearchController {
  async getContent(req, res) {
    try {
      const { search_query } = req.params;

      // Validate the search query
      console.log(search_query);
      if (!search_query || !/^[a-z0-9]+$/i.test(search_query)) {
        return res.status(400).json({ error: 'Invalid search query' });
      }

      // Fetch matched data
      const matchedUsers = await searchService.getMatchedUsers(search_query);
      const matchedPosts = await searchService.getMatchedPosts(search_query);
      const matchedHashtags = await searchService.getMatchedHashtags(search_query);

      // Combine results
      const combinedResults = [
        ...matchedUsers.map(user => ({ type: 'user', data: user })),
        ...matchedPosts.map(post => ({ type: 'post', data: post })),
        ...matchedHashtags.map(hashtag => ({ type: 'hashtag', data: hashtag }))
      ];

      // Respond based on results
      if (combinedResults.length > 0) {
        console.log(`${combinedResults.length} matches found`);
        return res.status(200).json(combinedResults);
      }

      return res.status(404).json({ error: 'No matches found' });
    } catch (error) {
      console.error(`Search error: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new SearchController();



