import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const UploadPart = () => {
  return (
    <div className="p-5">
      <div className="row mt-5">
        <div className="col-md-4 mb-4 cp">
          <div className="sc_job">
            <Link to={"/upload-file"}>
              <div className="sc_jobs_content tex-center">
                <AiOutlinePlus />
                <br />
                <span>Upload A Part</span>
              </div>
            </Link>
          </div>
        </div>

        {/* my uploaded parts */}
        <div className="col-md-4 mb-4">
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
        </div>
      </div>
    </div>
  );
};

export default UploadPart;
