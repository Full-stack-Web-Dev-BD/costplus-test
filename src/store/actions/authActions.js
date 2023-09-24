import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/constant";
import jwtDecode from "jwt-decode";




export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth`, {
      email,
      password,
    });
    window.localStorage.setItem("token", response.data.token);
    const decodedToken = jwtDecode(response.data.token);
    window.location.href='/#/dashboard/overview'
    dispatch({ type: "LOGIN_SUCCESS", payload: decodedToken.user });
  } catch (error) {
    console.log("login error", error);
    var errorsResponse;
    errorsResponse = error?.response?.data?.errors;
    if (errorsResponse.length > 0) {
      errorsResponse.map((el) => {
        toast.error(el.msg, { position: "top-right" });
      });
    }
    // dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.errors });
  }
};
export const logout = () => (dispatch) => {
  window.localStorage.removeItem("token")
  dispatch({ type: "LOGOUT" });
  window.location.href="/#/sign-in"
  window.location.reload()
};

export const signup =
  (firstname, lastname, company, country, phone, email, password) =>
  async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users`, {
        firstname,
        lastname,
        company,
        country,
        phone,
        email,
        password,
      });
      console.log("response", response.data);
      // dispatch({ type: 'LOGIN_SUCCESS', payload: {firstname, lastname, company, country, phone, email, password} });
      toast.success("Successfully Registered.");
      setTimeout(() => {
        window.location.href = "/#/sign-in";
      }, 1400);
    } catch (error) {
      // dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      console.log("error", error);
      var errorsResponse;
      errorsResponse = error.response.data.errors;
      if (errorsResponse.length > 0) {
        errorsResponse.map((el) => {
          toast.error(el.msg);
        });
      }
    }
  };
