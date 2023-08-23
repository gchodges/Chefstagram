import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyDf7G-0m5eObKKpR1PN0THsBhSySALL0XQ",
    authDomain: "chefstagram-fa0e1.firebaseapp.com",
    projectId: "chefstagram-fa0e1",
    storageBucket: "chefstagram-fa0e1.appspot.com",
    messagingSenderId: "421393524112",
    appId: "1:421393524112:web:b4115bebfe42cfa4727f15"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

console.log('firebase', firebase)

// seedDatabase(firebase)

export { firebase, FieldValue };