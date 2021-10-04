import e, {Request, Response, NextFunction} from 'express';
import logging from '../config/logging';
import {Connect, Query} from '../config/mysql';

const NAMESPACE = 'Books';

const sampleHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Sample health check route called');
  return res.status(200).json({
    message: 'pong'
  });
};

const createBook = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Createing book.');
  let {author, title} = req.body;
  let query = `INSERT INTO books (author, title) VALUES ("${author}", "${title}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          return res.status(200).json({result});
        })
        .catch((error) => {
          logging.error(NAMESPACE, (error as Error).message, error);
          return res.status(500).json({
            message: (error as Error).message,
            error
          });
        })
        .finally(() => {
          connection.end();
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

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Getting all books');
  let query = 'SELECT * FROM books';

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          return res.status(200).json({results});
        })
        .catch((error) => {
          logging.error(NAMESPACE, (error as Error).message, error);
          return res.status(500).json({
            message: (error as Error).message,
            error
          });
        })
        .finally(() => {
          connection.end();
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

export default {getAllBooks, createBook};
