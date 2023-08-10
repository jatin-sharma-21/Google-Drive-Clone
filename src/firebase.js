import { initializeApp } from 'firebase/app';
// import firebase from "firebase/compat/app";
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
// import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyA-FI3jks-ToNPmlmKXNXO-8oraXAUykwU",
    authDomain: "drive-clone-yt-70a13.firebaseapp.com",
    projectId: "drive-clone-yt-70a13",
    storageBucket: "drive-clone-yt-70a13.appspot.com",
    messagingSenderId: "694205303977",
    appId: "1:694205303977:web:d7c1a1b2c141aa071dadb8",
    measurementId: "G-2RBZES4NCJ"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  // const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  export {db,storage,auth,provider};