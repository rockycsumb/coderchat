import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAyjDbIzQNIoiFmHtp1E-0LIWJ56oWghEE",
  authDomain: "coderchat-c0a8c.firebaseapp.com",
  databaseURL: "https://coderchat-c0a8c.firebaseio.com",
  projectId: "coderchat-c0a8c",
  storageBucket: "coderchat-c0a8c.appspot.com",
  messagingSenderId: "397689870574",
  appId: "1:397689870574:web:d16f6de28f8ab82c187bff",
  measurementId: "G-6YD017ZJ3H"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;