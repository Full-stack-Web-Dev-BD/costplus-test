import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider , GithubAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDLyLNbzzaTLfb0_LCnaj6BYHPl3ViNg_w",
  authDomain: "fe-development-72a4a.firebaseapp.com",
  projectId: "fe-development-72a4a",
  storageBucket: "fe-development-72a4a.appspot.com",
  messagingSenderId: "598128564068",
  appId: "1:598128564068:web:31fe6b73da42491cd48c71",
  measurementId: "G-C502BZPQPQ",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuthprovider = new GoogleAuthProvider();
const githubAuthprovider = new GithubAuthProvider();
export { auth, googleAuthprovider , githubAuthprovider };
