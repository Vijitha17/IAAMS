const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { sequelize } = require("./models"); // ✅ only use this Sequelize instance

const userRoute = require("./routes/userRoute");
const collegeRoute = require("./routes/collegeRoute");
const departmentRoute = require("./routes/departmentRoute");
const errorHandler = require("./middleWare/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);
app.use("/api/colleges", collegeRoute);
app.use("/api/departments", departmentRoute);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Sequelize DB connected via models/index.js");

    await sequelize.sync({ alter: true }); // or { force: true } if resetting DB
    console.log("🔄 DB synced successfully (via models/index.js)");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
};

startServer();
