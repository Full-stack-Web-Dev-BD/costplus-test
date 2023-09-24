import React, { useState } from "react";
import "./sceduleJob.css";
import toast from "react-hot-toast";
import { BASE_URL, authTokenInHeader, getUserID } from "../../utils/constant";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { LOGIN_SUCCESS, SET_USER } from "../../store/actions/actionTypes";
import { useDispatch } from "react-redux";

const SceduleJobs = () => {
  const [title, settitle] = useState("");
  const [err, setErr] = useState("");
  const history = useHistory();
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
  const initApp = async () => {
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
  const createJob = async () => {
      if (!title) {
        toast.error("Title Required");
        return;
      }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/job`,
        {
          jobTitle: title,
          userID: getUserID(),
        },
        { headers: authTokenInHeader() }
      );
      if (response.status === 200) {
        toast.success("Job created successfully");
        initApp();
        history.push("/jobs");
      } else {
        toast.error("Failed to create job");
      }
    } catch (error) {
      console.log( "new",  error);
      if (error.response) {
        setErr(error.response?.data.message);
        // toast.error(error.response.data.errors[0].msg);
      } else {
        toast.error("An error occurred while creating the job");
      }
    }
  };
  return (
    <div className="container">
      <div className="scedule_jobs">
        <h3>Schedule your job</h3>
        <span>
          <input
            placeholder="Enter Job Title"
            onChange={(e) => {
              settitle(e.target.value);
              window.localStorage.setItem("jobTitle", e.target.value);
            }}
            className="form-control job_input"
          />
        </span>
        {err ? <p className="text-center mt-4 text-danger"> <b>{err}</b>  </p> : ""}

        {title ? (
          <button onClick={(e) => createJob()} className="btn">
            Create Job
          </button>
        ) : (
          <button
            className="btn "
            onClick={(e) => toast.error("Title Required")}
            title="Title Requried"
          >
            Create Job
          </button>
        )}
      </div>
    </div>
  );
};

export default SceduleJobs;
