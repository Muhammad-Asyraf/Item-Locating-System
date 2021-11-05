import firebase from 'firebase';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;