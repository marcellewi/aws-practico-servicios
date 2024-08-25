const User = require("../models/user");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getUsers = async () => {
  return await User.findAll();
};

module.exports = { createUser, getUsers };
