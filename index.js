const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./src/utils/database/db");
const tradeRoutes = require("./src/api/tradeLogger/tradeLog.routes");
const userRoutes = require("./src/api/users/users.routes");
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL; // not in use

const server = express();
db.connectDB();

server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
server.use(express.json({ limit: "5mb" }));

server.use(express.urlencoded({ extended: false }));

server.use("/trades", tradeRoutes);
server.use("/users", userRoutes);

server.listen(PORT, () => {
  console.log("Server is Working in PORT 8080");
});
