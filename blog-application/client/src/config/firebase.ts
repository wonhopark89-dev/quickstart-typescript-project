import * as firebase from 'firebase/app';
// import "firebase/auth";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import 'firebase/firestore';
import config from '../config/config';

const Firebase = firebase.initializeApp(config.firebase);

export const Providers = {
  google: new GoogleAuthProvider()
};

export const auth = getAuth(Firebase);

export default Firebase;
