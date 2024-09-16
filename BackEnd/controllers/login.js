const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect = user === null
    ? false
    : await argon2.verify(user.passwordHash, password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 });

  response.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60,
    sameSite: "Strict",
  });

  response
    .status(200)
    .send({ username: user.username, name: user.name, id: user._id });
});

loginRouter.post("/out", async (request, response) => {
  response.cookie("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    sameSite: "Strict",
  });

  response.status(202).end();
});

module.exports = loginRouter;
