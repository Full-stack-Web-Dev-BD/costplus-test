import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams, useHistory } from "react-router-dom";
import { BASE_URL, authTokenInHeader } from "../../../../utils/constant";
import axios from "axios";
import "./fileupload.css"

const FileUpload = () => {
  const [uploadStatus, setUploadStatus] = useState(0);
  const [uploadedFile, setUploadedFile] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { jobId } = useParams();
  const history = useHistory();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploadStatus(1);
    try {
      const response = await axios.post(
        `${BASE_URL}/api/parts/upload-material`,
        formData,
        { headers: authTokenInHeader() }
      );
      toast("File uploaded");
      setUploadStatus(2);
      setUploadedFile(response?.data?.filename);
      window.localStorage.setItem("fileName", response?.data?.filename);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    // setIsDragging(false);
  };
  const maxFileSize = 125 * 1024 * 1024; // 125 MB in bytes
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    // Handle dropped file here
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size <= maxFileSize) {
        // setSelectedFile(droppedFile);
      } else {
        toast("Invalid file format or file size exceeds the limit.");
      }
    }
    handleFileUpload(droppedFile);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= maxFileSize) {
        handleFileUpload(file);
      } else {
        toast("Invalid file format or file size exceeds the limit.");
      }
    }
  };
  const createParts = async () => {
    const serviceName = window.localStorage.getItem("service");
    const partsJobID = jobId;
    const data = {
      serviceName: serviceName,
      materialFile: uploadedFile,
      jobID: partsJobID,
    };
    try {
      const response = await axios.post(`${BASE_URL}/api/parts`, data, {
        headers: authTokenInHeader(),
      });
      console.log(response.data)
      toast.success("Parts created successfully");
      history.push(`/material-and-questions/${response.data?._id}`);
    } catch (error) {
      toast.error("Parts creation faield");
    }
  };
  return (
    <div>
      <div id="file_upload_box">
        <input
          type="file"
          id="handle_click_CAD"
          accept=".stl,.step,.stp,.sldprt,.igs,.iges"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div className="container">
          <h3 className="text-center mt-5">Upload your CAD Files</h3>
          {uploadStatus == 0 ? (
            <div
              className={`text-center file_upload_box mt-4 mb-4 ${
                isDragging ? "dragging" : ""
              }`}
              onDragEnter={handleDragEnter}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                className={`mt-4 ${isDragging ? "dragging" : ""}`}
                onDragEnter={handleDragEnter}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <img
                  id="uploadImage"
                  src={require("./upload.png")}
                  className={`mb-4 ${isDragging ? "dragging" : ""}`}
                  style={{ cursor: "pointer" }}
                  alt="Upload"
                />
                <h4>
                  Drag-and-drop your 3D Printing files anywhere, or{" "}
                  <span
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={(e) =>
                      document.getElementById("handle_click_CAD").click()
                    }
                  >
                    browse files
                  </span>
                </h4>
                <p>
                  We accept the following CAD files for 3D printing: MESH
                  (.stl), STEP (.stp/.step), SOLIDWORKS (.sldprt), or IGES
                  (.igs/.iges).
                </p>
                <p>Maximum File Size: 125 MB</p>
              </div>
            </div>
          ) : uploadStatus == 1 ? (
            <div className="text-center pt-5 pb-5 file_upload_box mt-4 mb-4">
              <div >
                <h1 style={{ lineHeight: "400px" }}> Processing thumbnail... </h1>
              </div>
            </div>
          ) : uploadStatus == 2 ? (
            <div className="text-center pt-5 pb-5 file_upload_box mt-4 mb-4">
              <div className="text-center parts_image">
                <img style={{height:'300px'}} src={`${BASE_URL}/uploads/${uploadedFile}.png`} />
              </div>
              <button
                onClick={(e) => createParts()}
                className="btn btn-cont common_button"
              >
                Continue
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
