const express = require('express');
const router = express.Router();
const {
  createCollege,
  getColleges,
  getCollegeById,
  updateCollege,
  deleteCollege
} = require('../controllers/collegeController');
const { protect } = require('../middleWare/authMiddleware');
const { requireRole, requireAdminLevel } = require('../middleWare/roleMiddleware');

// Create a college (Management Admin only)
router.post(
  '/',
  protect,
  requireRole(['management_admin']),
  requireAdminLevel(['management']),
  createCollege
);

// Get all colleges (Protected)
router.get('/', protect, getColleges);

// Get single college by ID (Protected)
router.get('/:id', protect, getCollegeById);

// Update a college (Management Admin only)
router.put(
  '/:id',
  protect,
  requireRole(['management_admin']),
  requireAdminLevel(['management']),
  updateCollege
);

// Delete a college (Management Admin only)
router.delete(
  '/:id',
  protect,
  requireRole(['management_admin']),
  requireAdminLevel(['management']),
  deleteCollege
);

module.exports = router;