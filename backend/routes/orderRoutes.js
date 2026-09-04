const express = require('express');
const router = express.Router();
const { getAllOrders, getOrderById, updateEscrowStatus } = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/escrow', updateEscrowStatus);

module.exports = router;
