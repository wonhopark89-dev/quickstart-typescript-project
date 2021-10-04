import {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import {Connect, Query} from '../config/mysql';
import IUser from '../interfaces/user';
import IMySQLResult from '../interfaces/result';

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

    let query = `INSERT INTO users (username, password) VALUES ("${username}", "${password}")`;

    Connect()
      .then((connection) => {
        Query<IMySQLResult>(connection, query)
          .then((result) => {
            logging.info(NAMESPACE, `User with id ${result.insertId} inserted`);
            return res.status(201).json(result);
          })
          .catch((error) => {
            logging.error(NAMESPACE, (error as Error).message, error);

            return res.status(500).json({
              message: (error as Error).message,
              error
            });
          });
      })
      .catch((error) => {
        logging.error(NAMESPACE, (error as Error).message, error);

        return res.status(500).json({
          message: (error as Error).message,
          error
        });
      });
  });
};

const login = (req: Request, res: Response, nexT: NextFunction) => {
  let {username, password} = req.body;

  let query = `SELECT * FROM users WHERE username = "${username}"`;

  Connect()
    .then((connection) => {
      Query<IUser[]>(connection, query)
        .then((users) => {
          bcryptjs.compare(password, users[0].password, (error, result) => {
            if (error) {
              return res.status(401).json({
                message: error.message,
                error
              });
            } else if (result) {
              signJWT(users[0], (_error, token) => {
                if (_error) {
                  return res.status(401).json({
                    message: 'Unable to sign jwt',
                    error: _error
                  });
                } else if (token) {
                  return res.status(200).json({
                    message: 'Auth sucessful',
                    token,
                    user: users[0]
                  });
                }
              });
            }
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, (error as Error).message, error);

          return res.status(500).json({
            message: (error as Error).message,
            error
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, (error as Error).message, error);

      return res.status(500).json({
        message: (error as Error).message,
        error
      });
    });
};

const getAllusers = (req: Request, res: Response, nexT: NextFunction) => {
  let query = `SELECT _id, username FROM users`;

  Connect()
    .then((connection) => {
      Query<IUser[]>(connection, query)
        .then((users) => {
          return res.status(200).json({
            users,
            count: users.length
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, (error as Error).message, error);

          return res.status(500).json({
            message: (error as Error).message,
            error
          });
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, (error as Error).message, error);

      return res.status(500).json({
        message: (error as Error).message,
        error
      });
    });
};

export default {validateToken, register, login, getAllusers};
