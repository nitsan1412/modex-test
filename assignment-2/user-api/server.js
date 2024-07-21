const express = require('express');
const dotenv = require("dotenv");

const userRoutes = require('./routes/users');
const db = require("./utils/db");
const cors = require("cors");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());

db.once("open", () => {
  console.log("Connected to MongoDB");
  app.use(express.json());
  app.use('/api/users', userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

