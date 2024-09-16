const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

router.post("/addBlog", async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    "user": user.id,
  });

  const savedBlog = await blog.save();
  response.status(204).json(savedBlog);
});

module.exports = router;
