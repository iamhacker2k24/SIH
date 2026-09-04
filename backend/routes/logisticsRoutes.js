const express = require('express');
const router = express.Router();
const { getLogisticsOptions, bookStorageOrTransport } = require('../controllers/logisticsController');

router.get('/', getLogisticsOptions);
router.post('/book', bookStorageOrTransport);

module.exports = router;
