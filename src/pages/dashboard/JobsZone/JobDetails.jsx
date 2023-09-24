import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, authTokenInHeader } from "../../../utils/constant";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment-timezone";
import JobPreloader from "../../../components/JobPreloader/JobPreloader";
import { Card } from "@mui/material";
import "./jobDetails.css";
import toast from "react-hot-toast";
import PartsPreloader from "../../../components/SinglePartsPreloader/PartsPreloader";

const JobDetails = () => {
  const [allParts, setallParts] = useState([]);
  const [loading, setloading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const { jobId } = useParams();

  useEffect(() => {
    if (jobId) {
      fetchJobDetails(jobId);
    }
  }, [jobId]);

  const fetchJobDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/parts/job/${id}`, {
        headers: authTokenInHeader(),
      });
      setallParts(response.data);

      const response1 = await axios.get(`${BASE_URL}/api/job/${id}`, {
        headers: authTokenInHeader(),
      });
      console.log(response1.data);
      setJobDetails(response1.data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobTime = async (status) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/job/toggle-status/${jobId}`,
        { headers: authTokenInHeader() }
      );
      console.log(response.data);
      toast.success("Job Status Updated");
      setJobDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row mt-5">
        {loading ? (
          <div className="mb-4">
            <PartsPreloader />
          </div>
        ) : (
          <div className="col-md-12 mb-4">
            <Card className="job_details">
              <div
                className="row"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className=" col-md-4 p-3 ">
                  <div className="_clock ml-2">
                    <AiOutlineClockCircle />
                  </div>
                </div>
                <div className=" col-md-8 p-3 ">
                  <div className="mr-2">
                    {jobDetails.timeSpended >=
                    jobDetails.estimatedTimeToSpend ? (
                      <h4> This is Job Marked as Completed </h4>
                    ) : (
                      <div>
                        {jobDetails.status ? (
                          <h4> This is Job On Progress </h4>
                        ) : (
                          <h4> Start this job by clicking button below ! </h4>
                        )}
                        <h4>
                          Time Used : {jobDetails.timeSpended.toFixed(2)}h /
                          {jobDetails.estimatedTimeToSpend}h
                        </h4>
                      </div>
                    )}
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Hic possimus corrupti repudiandae odit corporis modi
                      voluptate necessitatibus rerum vero nemo eos quod
                      consequatur ex, nulla itaque sequi, aperiam debitis
                      nesciunt?
                    </p>
                    <div className="job_action">
                      {jobDetails.timeSpended >=
                      jobDetails.estimatedTimeToSpend ? (
                        <button className="btn btn_common" disabled>
                          Completed
                        </button>
                      ) : (
                        <button
                          onClick={handleJobTime}
                          className="btn btn_common"
                        >
                          {jobDetails.status ? "Stop" : "Start"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
        <div className="col-md-4 mb-4 cp">
          <div className="sc_job">
            <Link to={`/choose-service/${jobId}`}>
              <div className="sc_jobs_content tex-center">
                <AiOutlinePlus />
                <br />
                <span>Upload A Part</span>
              </div>
            </Link>
          </div>
        </div>
        {loading ? (
          <>
            {[1, 2].map((el, id) => (
              <div id={id} className="col-md-4 mb-4">
                <JobPreloader />
              </div>
            ))}
          </>
        ) : (
          <>
            {allParts.map((parts, id) => (
              <Link
                to={`/material-and-questions/${parts._id}`}
                id={id}
                className="col-md-4 mb-4"
              >
                <div className="sc_job">
                  <div className="sc_jobs_content  sc_my_job tex-center">
                    <span> {parts.serviceName} </span>
                    <span className="parts_image">
                      <img
                        src={`${BASE_URL}/uploads/${parts.materialFile}.png`}
                      />
                    </span>
                    <span> {moment(parts.createdAt).fromNow()} </span>
                    {/* <button className="btn status_btn in_progress">
                  In Progress
                </button> */}
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
        {/* my uploaded parts */}
        {/* <div className="col-md-4 mb-4">
          <div className="sc_job">
            <div className="sc_jobs_content  sc_my_job tex-center">
              <span>My Part</span>
              <img src={require("./job.png")} />
              <span>2/3 hours ago</span>
              <button className="btn status_btn in_progress">
                In Progress
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="sc_job">
            <div className="sc_jobs_content  sc_my_job tex-center">
              <span>My Part 2</span>
              <img src={require("./job.png")} />
              <span>2/3 hours ago</span>
              <button className="btn status_btn in_progress">
                In Progress
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="sc_job">
            <div className="sc_jobs_content  sc_my_job tex-center">
              <span>My Part 3</span>
              <img src={require("./job.png")} />
              <span>2/3 hours ago</span>
              <button className="btn status_btn in_stop">Stopped</button>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="sc_job">
            <div className="sc_jobs_content  sc_my_job tex-center">
              <span>My Part 4</span>
              <img src={require("./job.png")} />
              <span>2/3 hours ago</span>
              <button className="btn status_btn in_completed">Done</button>
            </div>
          </div>
        </div> */}
      </div>
      {!loading && allParts.length < 1 && (
        <h4 className="text-center dl_text my-4"> No Parts Created yet </h4>
      )}
    </div>
  );
};

export default JobDetails;
