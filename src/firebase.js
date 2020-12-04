// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyBGfVo59EvezTIGVbCSYD__-rNvhd30TuM",
  authDomain: "imessage-clone-react-redux.firebaseapp.com",
  projectId: "imessage-clone-react-redux",
  storageBucket: "imessage-clone-react-redux.appspot.com",
  messagingSenderId: "905126780779",
  appId: "1:905126780779:web:6a696c194015e0dd1cf62e",
  measurementId: "G-BV0H9Z7EW0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};

export default db;