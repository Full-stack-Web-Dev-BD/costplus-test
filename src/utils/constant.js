import jwtDecode from "jwt-decode";
import dotenv from 'dotenv';

export  const BASE_URL = "https://monkfish-app-c9mkw.ondigitalocean.app"
// export  const BASE_URL = "http://localhost:5000"

export const getUserID = () => {
  var userID;
  const token = window.localStorage.getItem("token");
  var decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
    userID = decodedToken?.user?.id;
  }
  return userID;
};
 
export const authTokenInHeader= ()=>{
  return {
    'x-auth-token': window.localStorage.getItem("token")
  }
}
