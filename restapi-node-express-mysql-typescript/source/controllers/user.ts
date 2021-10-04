import e, {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';

const NAMESPACE = 'Users';

const validateToken = (req: Request, res: Response, nexT: NextFunction) => {
  logging.info(NAMESPACE, 'Token validated, user authorized');
  return res.status(200).json({
    message: 'Authroized'
  });
};

const register = (req: Request, res: Response, nexT: NextFunction) => {
  let {username, password} = req.body;

  // salt : 10
  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res.status(500).json({
        message: hashError.message,
        error: hashError
      });
    }
    // todo: insert  user into DB here
  });
};

const login = (req: Request, res: Response, nexT: NextFunction) => {
  logging.info(NAMESPACE, 'Token validated, user authorized');
  return res.status(200).json({
    message: 'Authroized'
  });
};

const getAllusers = (req: Request, res: Response, nexT: NextFunction) => {
  logging.info(NAMESPACE, 'Token validated, user authorized');
  return res.status(200).json({
    message: 'Authroized'
  });
};

export default {validateToken, register, login, getAllusers};
