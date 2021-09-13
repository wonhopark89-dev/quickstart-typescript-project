import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import sampleRoutes, { route } from './routes/sample';

const NAMESPACE = 'Server';
const router = express();

/** Log the request */
router.use((req, res, next) => {
  /** Log the req */
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Parse the request */
// todo : @Deprecated, bodyParser will change
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // from anywhere
  res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Controll-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use('/sample', sampleRoutes);

/** Error Handling */
router.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({ message: error.message });
});

/** Create the Server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () =>
  logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.hostname}`)
);
