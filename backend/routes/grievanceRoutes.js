const express = require('express');
const router = express.Router();
const { getAllGrievances, createGrievance, updateGrievanceStatus } = require('../controllers/grievanceController');

router.get('/', getAllGrievances);
router.post('/', createGrievance);
router.put('/:id/status', updateGrievanceStatus);

module.exports = router;
