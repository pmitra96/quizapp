/* eslint-disable require-jsdoc */
import UserModel from '../models/users';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class IncorrectPasswordError extends Error {}

const authenticate = async ({id, email, password}) => {
  const user = await find({id, email});
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
      expiresIn: 1 * 60 * 60,
    });
    return {token};
  } else {
    const error = new IncorrectPasswordError('incorrect password');
    throw error;
  }
};

const create = async ({email, username, password}) => {
  try {
    const newUser = {
      email,
      username,
      password: await bcrypt.hash(password, 10),
    };
    const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60,
    });
    await UserModel.create(newUser);
    return {token};
  } catch (error) {
    throw new Error(error.message);
  }
};

const find = async ({id, email}) => {
  if (id) {
    const user = await UserModel.findById(id);
    if (user) {
      return user;
    }
  }
  if (email) {
    const user = await UserModel.findOne({email: email});
    if (user) {
      return user;
    }
  }
};

module.exports = {
  authenticate,
  create,
  find,
  IncorrectPasswordError,
};
