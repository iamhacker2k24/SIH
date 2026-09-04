const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllLots,
  getLotById,
  createLot,
  placeBid,
  acceptBid
} = require('../controllers/lotController');

router.get('/', getAllLots);
router.get('/:id', getLotById);
router.post('/', authMiddleware, createLot);
router.post('/:id/bid', authMiddleware, placeBid);
router.post('/:id/accept-bid', authMiddleware, acceptBid);

module.exports = router;
