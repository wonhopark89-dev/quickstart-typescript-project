import { AuthProvider, UserCredential, signInWithPopup } from '@firebase/auth';
import { auth } from '../config/firebase';
import IUser from '../interfaces/user';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/logging';

export const SignInWithSocialMedia = (provider: AuthProvider) =>
  new Promise<UserCredential>((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });

// with server
export const Authenticate = async (
  uid: string,
  name: string,
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${config.server.url}/users/login`,
      data: {
        uid,
        name
      },
      headers: { Authorization: `Bearer ${fire_token}` }
    });

    if (response.status === 200 || response.status === 201 || response.status === 304) {
      logging.info('Successfully authenticated...');
      callback(null, response.data.user);
    } else {
      logging.warn('Unable to authenticate.');
      callback('Unable to authentiate', null);
    }
  } catch (error) {
    if (error instanceof Error) {
      logging.error(error.message);
    }
    callback('Unable to authentiate', null);
  }
};

// with server
export const Validate = async (fire_token: string, callback: (error: string | null, user: IUser | null) => void) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.server.url}/users/validate`,
      headers: { Authorization: `Bearer ${fire_token}` }
    });

    if (response.status === 200 || response.status === 304) {
      logging.info('Successfully validated...');
      callback(null, response.data.user);
    } else {
      logging.warn('Unable to validate.');
      callback('Unable to validate', null);
    }
  } catch (error) {
    if (error instanceof Error) {
      logging.error(error.message);
    }
    callback('Unable to validate', null);
  }
};
