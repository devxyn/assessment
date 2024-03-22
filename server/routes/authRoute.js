import { Router } from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = 'secret';

const router = new Router();

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      email,
      password: hash,
    })
      .then((user) => {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({ id: user._id, email }, jwtSecret, {
          expiresIn: maxAge, // 3hrs in sec
        });
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
          message: 'User successfully created',
          user: user._id,
        });
      })
      .catch((error) =>
        res.status(400).json({
          message: 'User not successful created',
          error: error.message,
        }),
      );
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email or Password not present',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: 'Login not successful',
        error: 'User not found',
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id, email }, jwtSecret, {
            expiresIn: maxAge, // 3hrs in sec
          });
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(200).json({
            message: 'User successfully Logged in',
            user: user._id,
          });
        } else {
          res.status(400).json({ message: 'Login not succesful' });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'An error occurred',
      error: error.message,
    });
  }
});

export default router;
