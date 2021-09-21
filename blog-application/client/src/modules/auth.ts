import { AuthProvider, UserCredential, signInWithPopup } from '@firebase/auth';
import { auth } from '../config/firebase';

export const SignInWithSocialMedia = (provider: AuthProvider) =>
  new Promise<UserCredential>((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
