const express = require("express");
const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
  findUserByString,
} = require("../Controllers/userController");

const router = express.Router();

router.get("/search-user", findUserByString);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;
