// search_feature/routes/search_routes.js
const express = require('express');
const searchController = require('../controllers/search_controller');

const router = express.Router();

router.get('/search/:search_query', searchController.getContent.bind(searchController));

module.exports = router;