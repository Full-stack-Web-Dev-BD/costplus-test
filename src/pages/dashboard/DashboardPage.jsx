import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { Card } from "@mui/material";
import { LineChart } from "./SparkLineChart";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./dashboard.css";
import { BASE_URL, authTokenInHeader, getUserID } from "../../utils/constant";
import axios from "axios";
import { Link } from "react-router-dom";
import PartsPreloader from "../../components/SinglePartsPreloader/PartsPreloader";
import { connect } from "react-redux";
import PreviousJobHours from "./PreviousJobHours";

const DashboardPage = ({ auth }) => {
  const [myJobs, setMyJobs] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [previousJobHours, setPreviousJobHours] = useState([]);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/job/my-jobs`, {
          headers: authTokenInHeader(),
        });
        const response1 = await axios.get(`${BASE_URL}/api/job/latest`, {
          headers: authTokenInHeader(),
        });
        setPreviousJobHours(response1.data);
        setMyJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJob();
  }, []);
  const calculatePercentage = (usedTime, totalTime) => {
    console.log("usedTime, totalTime", usedTime, totalTime)
    if (usedTime > totalTime) return 100;
    var result =
      (usedTime ? parseInt(usedTime) / totalTime : 0 / totalTime) * 100;
    var finalResult=  result.toFixed(1);
    if(finalResult < 1){
      return 0.6
    }else{
      return finalResult
    }
  };
  return (
    <div className="mt-4  p-3">
      <div className="row h-100 p-3"> 
        {Loading ? (
          <div className="col-12">
            <PartsPreloader />
          </div>
        ) : (
          <>
            <div className="col-md-4 h-220 mb-4">
              <Card className="h-100 p-3">
                <div className="row pt-3 pb-3">
                  <div className="col-md-6">
                    <div className="pie_holder">
                      <PieChart
                        spended={Math.floor(
                          calculatePercentage(
                            auth.user?.subscription?.usage.toFixed(0),
                            parseInt(auth.user?.subscription?.time)
                          )
                        )}
                      />
                      <span>
                        {Math.floor(
                          calculatePercentage(
                            auth.user?.subscription?.usage.toFixed(0),
                            parseInt(auth.user?.subscription?.time)
                          )
                        )}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 y_center">
                    <h3>Available hours this month</h3>
                    <h5>
                      {auth.user?.subscription?.usage.toFixed(0)}
                      <span className="hrs">hrs</span> /
                      <span> {auth.user?.subscription?.time} </span>
                    </h5>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-md-4 h-220 mb-4">
              <Card className="h-100 p-3">
                <div className="row pt-3 pb-3">
                  <div className="col-md-6  ">
                    <div className=" pb-1">
                      <h1>$ 18.6K</h1>
                    </div>
                    <div className="pie_holder">
                      <LineChart
                        series={[
                          [25, 16, 6, 29, 10, 48, 11],
                          [42, 7, 20, 3, 16, 36, 23, 17],
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 y_center _up">
                    <h4>Total Material Expense</h4>
                    <h6>
                      <AiOutlineArrowUp /> <span>15%</span>
                    </h6>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-md-4 h-220 mb-4">
              <Card className="h-100 p-3">
                <div className="row pt-3 pb-3">
                  <div className="col-md-6  ">
                    <div className=" pb-1">
                      <h1> {myJobs.length} Jobs</h1>
                    </div>
                    <div className="pie_holder">
                      <LineChart
                        series={[
                          [25, 16, 6, 29, 10, 48, 11],
                          [42, 7, 20, 3, 16, 36, 23, 17],
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 y_center _up">
                    <h4>Total Job Created</h4>
                    <h6>
                      <AiOutlineArrowUp /> <span>15%</span>
                    </h6>
                  </div>
                </div>
              </Card>
            </div>
            {/* <div className="col-md-4 h-220">
              <Card className="h-100 p-3">
                <div className="row pt-3 ">
                  <div className="col-md-6  ">
                    <h1> {myJobs.length} Jobs</h1>
                    <div className="pie_holder">
                      <LineChart
                        series={[
                          [7, 49, 14, 23, 8, 363, 44],
                          [29, 46, 37, 45, 41, 12, 19, 22],
                        ]}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 y_center _up">
                    <h4>Total Job Created</h4>
                    <h6>
                      <AiOutlineArrowUp /> <span>15%</span>
                    </h6>
                  </div>
                </div>
              </Card>
            </div> */}
          </>
        )}
      </div>
      <div className="p-3">
        <div className=" mt-4">
          <Card className="h-100">
            <div className="st_title">
              <h3>Current Jobs Percent Complete</h3>
              <Link to="/jobs">
                <span>See more</span>
              </Link>
            </div>
            <div className="row  p-3">
              {Loading ? (
                <div className="col-12">
                  <PartsPreloader />
                </div>
              ) : (
                <>
                  {myJobs.slice(0, 3).map((job, id) => (
                    <Link
                      to={`/job-details/${job._id}`}
                      className="col-md-4 h-220"
                      key={id}
                    >
                      <div>
                        <div className="row pt-3 pb-3">
                          <div className="col-md-6">
                            <div className="pie_holder">
                              <PieChart
                                spended={calculatePercentage(
                                  job.timeSpended,
                                  job.estimatedTimeToSpend
                                )}
                              />
                              <span>
                                {Math.floor(
                                  calculatePercentage(
                                    job.timeSpended,
                                    job.estimatedTimeToSpend
                                  )
                                )}
                                %
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6 y_center">
                            <h3> {job.jobTitle} </h3>
                            <h5>
                              {job.timeSpended > job.estimatedTimeToSpend
                                ? job.estimatedTimeToSpend
                                : job.timeSpended.toFixed(2)}
                              <span className="hrs">hrs</span> /
                              {job.estimatedTimeToSpend}
                              <span className="hrs">hrs</span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {myJobs.length < 1 && (
                    <div className="text-center p-5">
                      <h3> No Job Founded </h3>
                    </div>
                  )}
                </>
              )}
              <div></div>
            </div>
          </Card>
        </div>
      </div>
      <div>
        {Loading ? (
          <div className="mt-5 p-3">
            <PartsPreloader />
          </div>
        ) : (
          <div className="p-3">
            <PreviousJobHours previousJobHours={previousJobHours} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(DashboardPage);
