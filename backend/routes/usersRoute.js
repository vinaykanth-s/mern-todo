const express = require("express");
const User = require("../models/User");
const { isEmail } = require("validator");
const router = express.Router();
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const createAuthResObject = require("../scripts/createAuthResObject");

router.post("/register", async (req, res) => {
  try {
    if (!isEmail(req.body.email)) throw new Error("Please enter a valid email");

    //test email is unique
    //query db if there is a user with this email
    //if there is a user with this email then this email is not unique
    count = await User.count({ email: req.body.email });
    if (count) throw new Error("Email is not unique");
    // console.log({ count });

    const user = new User(req.body);
    if (user.password.length < 5) throw new Error("Password is too short");
    //encrypt the password and then save
    user.password = hashSync(
      user.password,
      genSaltSync(+process.env.SALT_ROUNDS)
    );
    await user.save();
    res.status(201).send(createAuthResObject(user));
  } catch ({ message }) {
    // console.log("some error", err.message);
    res.status(400).send({ message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //search mongodb for a user with an email of req.body.email and a password of req.body.password
    const user = await User.findOne({ email: req.body.email });
    console.log({ user });
    if (!user) throw new Error("No User Found");

    //compares plain text pwd with hashed pwd
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) throw new Error("Password is not valid");
    res.send(createAuthResObject(user));
  } catch ({ message }) {
    res.status(400).send({ message });
  }
});

module.exports = router;

//c@c.com 12345678
//z@z.com zzzzz
