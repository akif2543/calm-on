require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user");
const { formatErrors, valid } = require("../util/validations");

// const secret = process.env.SECRET;
const secret = '123@#!SDF';

const router = express.Router();

router.post("/login", async (req, res) => {

  const { email, password } = req.body;
  console.log(email, password)
  if (!email || !valid(email) || !password || !valid(password))
    return res
      .status(422)
      .json({ error: "You need to enter an email and password" });

  const found = await User.findOne({ email });

  if (found) {
    const match = await bcrypt.compare(password, found.password);

    if (match) {
      const user = found.toJSON();
      delete user.password;
      jwt.sign(user, secret, (err, token) => {
        if (token) {
          res.status(201).json({
            token: `Bearer ${token}`,
          });
        } else {
          res.status(500).json(err);
        }
      });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password, birthday } = req.body;

  if (
    !email ||
    !valid(email) ||
    !password ||
    !valid(password) ||
    !birthday ||
    !valid(birthday)
  )
    return res.status(422).json({
      error: "You need to enter an email, password, and date of birth",
    });

  const userData = {
    email,
    birthday,
  };

  const newUser = new User(userData);

  bcrypt.genSalt((err, salt) => {
    if (err) {
      console.log("error is", err);
    }

    bcrypt.hash(password, salt, async (error, hashedPassword) => {
      if (error) {
        console.log("error is", error);
      }
      newUser.password = hashedPassword;

      let savedUser;

      try {
        savedUser = await newUser.save();
      } catch (e) {
        return res.status(400).json(formatErrors(e));
      }

      const user = savedUser.toJSON();
      delete user.password;
      jwt.sign(user, secret, (err, token) => {
        if (token) {
          res.status(201).json({
            token: `Bearer ${token}`,
          });
        } else {
          res.status(500).json(err);
        }
      });
    });
  });
});

router.put(
  "/name",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currUser = req.user;
    const { name } = req.body;

    if (!name || !name.trim().length) {
      res.status(422).json({ name: "Please enter your name to continue" });
    }

    try {
      currUser.name = name;
      const savedUser = await currUser.save();
      const user = savedUser.toJSON();
      delete user.password;
      jwt.sign(user, secret, (err, token) => {
        if (token) {
          res.status(200).json({
            token: `Bearer ${token}`,
          });
        } else {
          res.status(500).json(err);
        }
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
);

module.exports = router;
