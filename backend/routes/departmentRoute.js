const express = require('express');
const router = express.Router();
const {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');
const { protect } = require('../middleWare/authMiddleware');
const { requireRole, requireAdminLevel } = require('../middleWare/roleMiddleware');

// Create a department (Admin only)
router.post(
  '/',
  protect,
  requireRole(['management_admin', 'principal']),
  requireAdminLevel(['management', 'principal']),
  createDepartment
);

// Get all departments (Protected)
router.get('/', protect, getDepartments);

// Get single department by ID (Protected)
router.get('/:id', protect, getDepartmentById);

// Update a department (Admin only)
router.put(
  '/:id',
  protect,
  requireRole(['management_admin', 'principal']),
  requireAdminLevel(['management', 'principal']),
  updateDepartment
);

// Delete a department (Admin only)
router.delete(
  '/:id',
  protect,
  requireRole(['management_admin']),
  requireAdminLevel(['management']),
  deleteDepartment
);

module.exports = router;