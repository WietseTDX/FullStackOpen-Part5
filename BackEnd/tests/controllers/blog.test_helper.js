const argon2 = require("argon2");

const Blog = require("../../models/blog");
const User = require("../../models/user");

const testUser = {
  "username": "test",
  "name": "Hoi",
  "password": "password",
};

const multipleBlogs = [
  {
    "title": "First blog",
    "author": "Your developer",
    "url": "http://localhost:3001",
    "likes": 1,
  },
  {
    "title": "Second blog",
    "author": "Your developer",
    "url": "http://localhost:3001",
    "likes": 2,
  },
];

const getMultipleBlogs = () => {
  return [...multipleBlogs];
};

const singleBlog = {
  "title": "First blog",
  "author": "Your developer",
  "url": "http://localhost:3001",
  "likes": 1,
};

const deleteTestUser = async () => {
  await User.deleteMany({});
};

const addTestUserGetToken = async (empty=false) => {
  try {
    if (empty) {
      await User.deleteMany({});
    }

    const testUserWithHash = {
      ...testUser,
      passwordHash: await argon2.hash(testUser.password),
    };

    delete testUserWithHash.password;

    const user = new User(testUserWithHash);
    const savedUser = (await user.save()).toJSON();

    return [testUser, savedUser.id];
  } catch (err) {
    console.error("Error adding test user:", err);
    throw err;
  }
};

const getSingleBlog = () => {
  return JSON.parse(JSON.stringify(singleBlog));
};

const getAllDbData = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const addBlogToDb = async (body, USERID=null) => {
  if (USERID !== null) {
    body.user = USERID;
  }
  const blog = new Blog(body);
  return (await blog.save()).toJSON();
};

module.exports = {
  getAllDbData, getMultipleBlogs, getSingleBlog, addBlogToDb, addTestUserGetToken, deleteTestUser,
};
