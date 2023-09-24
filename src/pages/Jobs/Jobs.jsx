import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BASE_URL,authTokenInHeader, getUserID } from "../../utils/constant";
import moment from "moment";
import JobPreloader from "../../components/JobPreloader/JobPreloader";
const Jobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`${BASE_URL}/api/job/my-jobs`, {
        headers: authTokenInHeader(),
      });
      setMyJobs(response.data);
      setLoading(false);
    };
    fetchJob();
  }, []);
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 mb-4 cp">
          <Link to={"/scedule-job"}>
            <div className="sc_job">
              <div className="sc_jobs_content tex-center">
                <AiOutlinePlus />
                <br />
                <span>Scedule A Job</span>
              </div>
            </div>
          </Link>
        </div>
        {Loading ? (
          <>
            {[1, 2].map((el) => (
              <div className="col-md-4 mb-4">
                <JobPreloader />
              </div>
            ))}
          </>
        ) : (
          <>
            {myJobs.map((el) => (
              <div className="col-md-4 mb-4">
                <Link to={`/job-details/${el._id}`}>
                  <div className="sc_job">
                    <div className="sc_jobs_content  sc_my_job tex-center">
                      <span style={{ textTransform: "capitalize" }}>
                        {el.jobTitle}
                      </span>
                      <img src={require("./job.png")} />
                      <span> {moment(el.createdAt).fromNow()} </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
