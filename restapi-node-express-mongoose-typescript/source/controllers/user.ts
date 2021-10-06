import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import mongoose from 'mongoose';
import User from '../models/user';
import bcryptjs from 'bcryptjs';

const NAMESPACE = `User`;

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Token validation, user authroized');

  return res.status(200).json({
    message: 'Authroized'
  });
};
const register = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }
    // Insert user;
  });
};
const login = (req: Request, res: Response, next: NextFunction) => {};
const getAllusers = (req: Request, res: Response, next: NextFunction) => {};

export default { validateToken, register, login, getAllusers };
