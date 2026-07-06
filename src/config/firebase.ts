import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDemoKey123456789',
  authDomain: 'nexus-social-demo.firebaseapp.com',
  projectId: 'nexus-social-demo',
  storageBucket: 'nexus-social-demo.appspot.com',
  messagingSenderId: '123456789123',
  appId: '1:123456789123:web:abcdef123456789',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;
