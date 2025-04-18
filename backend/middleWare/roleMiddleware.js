const asyncHandler = require("express-async-handler");
const { User } = require("../models");

// Middleware to check if user has required role
const requireRole = (requiredRoles) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    if (!requiredRoles.includes(user.role)) {
      res.status(403);
      throw new Error("Access denied. Insufficient permissions");
    }

    next();
  });
};

// Middleware to check administrative level (management/principal/hod/department)
const requireAdminLevel = (requiredLevels) => {
  return asyncHandler(async (req, res, next) => {
    const user = req.user;
    
    if (!user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    if (!requiredLevels.includes(user.adminLevel)) {
      res.status(403);
      throw new Error("Access denied. Insufficient administrative permissions");
    }

    next();
  });
};

// Helper functions for common permission checks
const canManageInventory = asyncHandler(async (req, res, next) => {
  const user = req.user;
  
  if (user.role !== 'management_admin') {
    res.status(403);
    throw new Error("Only management admins can manage inventory");
  }
  
  next();
});

const canApproveRequests = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const validRoles = ['management_admin', 'principal', 'hod'];
  
  if (!validRoles.includes(user.role)) {
    res.status(403);
    throw new Error("You don't have permission to approve requests");
  }
  
  next();
});

const canManageBudget = asyncHandler(async (req, res, next) => {
  const user = req.user;
  
  if (user.role !== 'management_people') {
    res.status(403);
    throw new Error("Only management people can manage budgets");
  }
  
  next();
});

const canInitiatePurchase = asyncHandler(async (req, res, next) => {
  const user = req.user;
  
  if (user.role !== 'management_admin') {
    res.status(403);
    throw new Error("Only management admins can initiate purchases");
  }
  
  next();
});

module.exports = { 
  requireRole, 
  requireAdminLevel,
  canManageInventory,
  canApproveRequests,
  canManageBudget,
  canInitiatePurchase
};