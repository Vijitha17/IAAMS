const express = require("express");
const router = express.Router();
const { 
  registerUser,
  loginUser,
  logout,
  getUser,
  updateUser,
  changePassword,
  getManagementUsers,
  getCollegeUsers,
  getDepartmentUsers,
  getAllUsers
} = require("../controllers/userController");
const { protect } = require("../middleWare/authMiddleware");
const { 
  requireRole, 
  requireAdminLevel, 
  canManageInventory 
} = require("../middleWare/roleMiddleware");

// Public routes
router.post("/login", loginUser);

// Protected routes
router.use(protect);

router.post("/logout", logout);
router.get("/me", getUser);
router.put("/me", updateUser);
router.patch("/password", changePassword);

// User registration - role-based access
router.post("/register", 
  protect,
  requireRole(['management_admin', 'principal', 'hod']), 
  registerUser
);


router.get("/", 
    requireRole(['management_admin', 'principal', 'hod', 'department_admin']), 
    getAllUsers
);

// Management admin only
router.get("/management/users", 
  requireRole(['management_admin', 'management_people']), 
  requireAdminLevel(['management']),
  getManagementUsers
);

// Principal/College admin only
router.get("/college/users", 
  requireRole(['principal', 'hod']), 
  requireAdminLevel(['principal', 'hod']),
  getCollegeUsers
);

// Department admin only
router.get("/department/users", 
  requireRole(['department_admin']), 
  requireAdminLevel(['department']),
  getDepartmentUsers
);

module.exports = router;