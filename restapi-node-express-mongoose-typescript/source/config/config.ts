import dotenv from 'dotenv';
import { ConnectOptions } from 'mongoose';

dotenv.config();

const MONGO_OPTIONS: ConnectOptions = {
  // useUnifiedTopology: true,
  // useNewUriParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  maxPoolSize: 50,
  // poolSize: 50,
  autoIndex: false,
  retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'superuser';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'superuserpassword1';
const MONGO_HOST = process.env.MONGO_URL || 'ABCDE.123.com:4000/mongodb';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

const config = {
  mongo: MONGO,
  server: SERVER
};

export default config;
