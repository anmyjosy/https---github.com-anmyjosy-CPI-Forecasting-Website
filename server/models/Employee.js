const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const EmploySchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  purpose: String
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "No token" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded; // Store the decoded token in request object
    next();
  } catch (err) {
    return res.json({ status: false, message: "Token verification failed", error: err.message });
  }
};

router.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

module.exports = router;
