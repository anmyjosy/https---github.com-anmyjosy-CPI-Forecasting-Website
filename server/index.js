const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const EmployeeModel = require('./models/Employee');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://cpiforecast.netlify.app"],
    credentials: true
}));
app.use(cookieParser());

mongoose.connect("mongodb+srv://anmyjosy:Anmy2003!@cluster0.1ksxdqo.mongodb.net/employee");

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ email: user.email }, process.env.KEY, { expiresIn: '1h' });
          res.cookie('token', token, { httpOnly: true });
          res.json("success");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("no record existed");
      }
    })
    .catch(err => res.json(err));
});

app.post("/register", async (req, res) => {
  const { name, email, password,role,purpose } = req.body;
  const user = await EmployeeModel.findOne({ email });
  if (user) {
    return res.json({ message: "user already existed" });
  }

  const newUser = new EmployeeModel({
    name,
    email,
    password,
    role,
    purpose
  });

  await newUser.save();
  return res.json({ status: true, message: "record registed" });
});

const verifyUser = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "No token" });
    }
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded; // Optionally attach the decoded token to the request object
    next();
  } catch (err) {
    return res.json({ status: false, message: "Token verification failed", error: err.message });
  }
};

app.get('/verify', verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

app.listen(3001, () => {
  console.log("server is running");
});
