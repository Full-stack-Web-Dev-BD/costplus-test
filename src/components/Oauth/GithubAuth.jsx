import React from "react";
import { auth, githubAuthprovider } from "./config";
import { signInWithPopup } from "firebase/auth";
import {FaGithubAlt} from 'react-icons/fa'

const GithubLoginButton = () => {
  const googleSignin = () => {
    signInWithPopup(auth, githubAuthprovider)
      .then((res) => {
        console.log(res);
        // Register user  / Login user with this detaisdetails from  Firebase
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <span onClick={(e) => googleSignin()} className=""> 
      <FaGithubAlt/>
      </span>
  );
};

export default GithubLoginButton;
