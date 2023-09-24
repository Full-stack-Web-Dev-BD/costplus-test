import React from "react";
import { auth, googleAuthprovider } from "./config";
import { signInWithPopup } from "firebase/auth";
import {FcGoogle} from 'react-icons/fc'

const GoogleLoginButton = () => {
  const googleSignin = () => {
    signInWithPopup(auth, googleAuthprovider)
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
      <FcGoogle/>
      </span>
  );
};

export default GoogleLoginButton;
