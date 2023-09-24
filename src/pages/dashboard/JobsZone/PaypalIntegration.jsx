import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL, authTokenInHeader } from "../../../utils/constant";
import jwtDecode from "jwt-decode";
import { LOGIN_SUCCESS, SET_USER } from "../../../store/actions/actionTypes";
import { useDispatch } from "react-redux";

const paymentAmount = {
  basic: 99.99,
  premium: 199.99,
};
const PaypalIntegration = ({ plan }) => {
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const [paymentTitle, setPaymentTitle] = useState("Select a payment mothod :");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchUser = async (userID) => {
    if (!userID) {
      return {};
    }
    const response = await axios.get(`${BASE_URL}/api/users/${userID}`, {
      headers: authTokenInHeader(),
    });
    return response.data;
  };
  const reInitApp = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      dispatch({ type: LOGIN_SUCCESS, payload: decodedToken.user });
      if (decodedToken?.user?.id) {
        const userDetails = await fetchUser(decodedToken?.user?.id);
        dispatch({ type: SET_USER, payload: userDetails });
      }
    }
  };
  const upgradePlan = async (plan) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/plan`,
        { newPlan: plan },
        { headers: authTokenInHeader() }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleTransactionComplete = (details, data) => {
    console.log(details);
    upgradePlan(plan);
    reInitApp();
    setPaymentTitle("Payment Completed ");
    toast.success("Transaction completed by " + details.payer.name.given_name);
    setTransactionCompleted(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div>
      <h5> {paymentTitle} </h5>
      <hr />
      {!transactionCompleted &&  (
        <PayPalButton
          onButtonReady={(e) => setIsLoading(false)}
          amount={paymentAmount[`${plan}`]}
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={handleTransactionComplete}
          options={{
            clientId:
              "AYgjvjgq65ZQm6sWGpdo9TB-5YJ8AcMUXZSxipGht5UwWOSlEZP3GKErQSuVQAJpgcLZ7byg5ySJVFiw",
          }}
        />
      )}
      {transactionCompleted && (
        <div>
          <h3 style={{ color: "black !important" }}>
            Transaction completed successfully!
          </h3>
          {/* <div className="alert alert-info "> */}
          {/* <pre>{paymentDetails}</pre> */}
          {/* </div> */}
        </div>
      )}
      {isLoading && (
        <h3 style={{ textAlign: "center", color: "black !important" }}>
          Loading
        </h3>
      )}
    </div>
  );
};

export default PaypalIntegration;
