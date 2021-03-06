import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import Blog from '../models/blog';

const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Attempting to register blog');

  let { author, title, content, headline, picture } = req.body;

  const blog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    author,
    title,
    content,
    headline,
    picture
  });

  return blog
    .save()
    .then((newBlog) => {
      logging.info(`New blog created ...`);
      return res.status(200).json({ blog: newBlog });
    })
    .catch((error) => {
      if (error instanceof Error) {
        logging.error(error.message, error);
      }
      return res.status(500).json({
        error
      });
    });
};

const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`Incoming read for ${_id} ...`);

  /**
   * author in client, need populate because that,
   * ( author={(blog.author as IUser).name} )
   */
  return Blog.findById(_id)
    .populate('author')
    .then((blog) => {
      if (blog) {
        return res.status(200).json({ blog });
      } else {
        return res.status(400).json({ message: 'Not found' });
      }
    })
    .catch((error) => {
      if (error instanceof Error) {
        logging.error(error.message, error);
      }
      return res.status(500).json({
        error
      });
    });
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Incoming read all ...`);

  return Blog.find()
    .populate('author')
    .exec()
    .then((blogs) => {
      return res.status(200).json({ count: blogs.length, blogs });
    })
    .catch((error) => {
      if (error instanceof Error) {
        logging.error(error.message, error);
      }
      return res.status(500).json({
        error
      });
    });
};

const query = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Incoming query ...`);

  return Blog.find(req.body)
    .populate('author')
    .exec()
    .then((blogs) => {
      return res.status(200).json({ count: blogs.length, blogs });
    })
    .catch((error) => {
      if (error instanceof Error) {
        logging.error(error.message, error);
      }
      return res.status(500).json({
        error
      });
    });
};

const update = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`Incoming update for ${_id} ...`);

  return Blog.findById(_id)
    .exec()
    .then((blog) => {
      if (blog) {
        blog.set(req.body);
        blog
          .save()
          .then((newBlog) => {
            logging.info(`Blog updated ...`);
            return res.status(200).json({ blog: newBlog });
          })
          .catch((error) => {
            if (error instanceof Error) {
              logging.error(error.message, error);
            }
            return res.status(500).json({
              error
            });
          });
      } else {
        return res.status(400).json({ message: 'Not found' });
      }
    })
    .catch((error) => {
      if (error instanceof Error) {
        logging.error(error.message, error);
      }
      return res.status(500).json({
        error
      });
    });
};

const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.blogID;
  logging.info(`Incoming delete for ${_id} ...`);

  try {
    await Blog.findByIdAndDelete(_id);
    return res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    if (error instanceof Error) {
      logging.error(error.message, error);
    }
    return res.status(500).json({
      error
    });
  }
};

export default {
  create,
  read,
  readAll,
  update,
  query,
  deleteBlog
};
