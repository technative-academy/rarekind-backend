import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const dataPath = path.resolve("mock-data/users.json");
    const users = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    res.json(users);
  } catch (error) {
    console.error("Error reading users.json:", error);
    res.status(500).json({ message: "Error loading users data" });
  }
});

export default router;
