const express = require('express');
const router = express.Router();
const {
  getAllPrices,
  getPriceById,
  getRecommendations,
  createOrUpdatePrice
} = require('../controllers/mandiController');

router.get('/prices', getAllPrices);
router.get('/prices/:id', getPriceById);
router.get('/recommendations', getRecommendations);
router.post('/prices', createOrUpdatePrice);

module.exports = router;
