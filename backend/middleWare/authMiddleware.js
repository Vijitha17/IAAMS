const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
          res.status(401);
          throw new Error("Not authorized, please login");
        } // Removed stray 'f' character
    
        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // Get user id from token
        const user = await User.findByPk(verified.id, {
          attributes: { exclude: ['password'] } // Exclude password field
        });
        
        if (!user) {
          res.status(401);
          throw new Error("User not found");
        }
        req.user = user;
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login");
      }
});

module.exports = { protect };