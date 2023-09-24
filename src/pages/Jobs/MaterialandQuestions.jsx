import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { AiOutlineMinus, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL, authTokenInHeader } from "../../utils/constant";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import PartsPreloader from "../../components/SinglePartsPreloader/PartsPreloader";
import "./materialquestion.css";

const MaterialandQuestions = () => {
  // parts Details form database
  const [partsDetails, setpartsDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { partsID } = useParams();

  // form data
  const [materialCount, setmaterialCount] = useState(10);
  const [Resolution, setResolution] = useState("");
  const [Finish, setFinish] = useState("");
  const [Orientation, setOrientation] = useState("");
  const [Material, setMaterial] = useState("");
  const [materialList, setmaterialList] = useState([]);

  const decreaseMaterialCount = () => {
    if (materialCount > 0) {
      setmaterialCount(materialCount - 1);
    }
  };
  useEffect(() => {
    fetchMaterials();
    fetchPartsDetails();
  }, []);
  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/material`, {
        headers: authTokenInHeader(),
      });
      setmaterialList(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchPartsDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/parts/find/${partsID}`,
        { headers: authTokenInHeader() }
      );
      setpartsDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const requestForQuots = async () => {
    const data = {
      materialType: Material,
      resolution: Resolution,
      finish: Finish,
      orientation: Orientation,
      materialQTY: materialCount,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/parts/update/${partsID}`,
        data,
        { headers: authTokenInHeader() }
      );
      toast.success("Request Submitted successfully !!!");
      fetchPartsDetails();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container mt-4">
      {loading ? (
        <div>
          <PartsPreloader />
        </div>
      ) : (
        <Card className="p-4">
          <div className="d-flex" style={{ gap: "20px" }}>
            <div className="material_box parts_image">
              <img
                src={`${BASE_URL}/uploads/${partsDetails.materialFile}.png`}
              />
            </div>
            <div style={{ width: "100%" }}>
              <h2 className="p_s_name"> {partsDetails.serviceName} </h2>
              <div
                className="d-flex"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span className="p_mFile">{partsDetails.materialFile}</span>
                <div
                  style={{ display: "flex", gap: "20px", alignItems: "center" }}
                >
                  <span className="p_qty">
                    Quantity : <b>{materialCount}</b>
                  </span>
                  <button className="btn border-btn">
                    <AiFillDelete /> Remove Parts
                  </button>
                </div>
              </div>
              <hr className="m-0" />
              <p>
                <span className="dir_count mr-3">
                  X: {partsDetails.dimention[0]}mm
                </span>
                <span className="dir_count mr-3">
                  Y: {partsDetails.dimention[1]}mm
                </span>
                <span className="dir_count mr-3">
                  Z: {partsDetails.dimention[2]}mm
                </span>
              </p>
            </div>
          </div>
        </Card>
      )}
      {!loading && !partsDetails.resolution ? (
        <div className="mt-4">
          <Card className="p-5">
            <h2 className="text-gray">1. Material and Finish</h2>
            <div class="form-group row " style={{ marginBottom: "2rem" }}>
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Material
              </label>
              <div class="col-sm-10">
                <select
                  required
                  onChange={(e) => setMaterial(e.target.value)}
                  className="form-control "
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">Select Material Option</option>
                  {/* optoin_header , add this classname to make  title */}
                  {materialList.map((material, id) => (
                    <option value={material._id} style={{textTransform:'capitalize'}} className="" key={id}>
                      {material.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div class="form-group row " style={{ marginBottom: "2rem" }}>
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Resolution
              </label>
              <div class="col-sm-10">
                <select
                  required
                  onChange={(e) => setResolution(e.target.value)}
                  className="form-control "
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">Select Resolution Option</option>
                  <option value={"High Res"}>High Res</option>
                  <option value={"Micro Res"}>Micro Res</option>
                  <option value={"Normal Res"}>Normal Res</option>
                </select>
              </div>
            </div>

            <div class="form-group row " style={{ marginBottom: "2rem" }}>
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Finish
              </label>
              <div class="col-sm-10">
                <select
                  required
                  onChange={(e) => setFinish(e.target.value)}
                  className="form-control "
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">Select Finish Option</option>
                  <option value={"Standard 1"}> Standard 1</option>
                  <option value={" Custom"}>Custom</option>
                  <option value={" Black Dyed Prototyping"}>
                    Black Dyed Prototyping
                  </option>
                  <option value={" Natural"}>Natural</option>
                  <option
                    value={" Production Dye Black (max. 390 x 390 x 360 mm)"}
                  >
                    Production Dye Black (max. 390 x 390 x 360 mm)
                  </option>
                  <option value={" Standard"}>Standard</option>
                  <option value={" Unfinished"}>Unfinished</option>
                  <option value={" Vapor Smooth"}>Vapor Smooth</option>
                  <option value={" Vapor Smooth Dye Black"}>
                    Vapor Smooth Dye Black
                  </option>
                </select>
              </div>
            </div>

            <div class="form-group row " style={{ marginBottom: "2rem" }}>
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Orientation
              </label>
              <div class="col-sm-10">
                <select
                  required
                  onChange={(e) => setOrientation(e.target.value)}
                  className="form-control "
                  style={{ borderRadius: "0px" }}
                >
                  <option value="">Select Orientation Option</option>
                  <option value={"Custom"}>Custom</option>
                  <option value={"Let Us Decide"}>Let Us Decide</option>
                </select>
              </div>
            </div>

            <div class="form-group row " style={{ marginBottom: "2rem" }}>
              <label for="inputPassword" class="col-sm-2 col-form-label">
                Material
              </label>
              <div class="col-sm-2">
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="text-center col-md-4">
                    <button
                      className="btn"
                      onClick={(e) => {
                        decreaseMaterialCount();
                      }}
                    >
                      <AiOutlineMinus className="cp" />
                    </button>
                  </div>
                  <div className=" col-md-4">
                    <input
                      value={materialCount}
                      className="form-control"
                      style={{ borderRadius: "0px", textAlign: "center" }}
                    />
                  </div>
                  <div className="text-center col-md-4">
                    <button
                      className="btn"
                      onClick={(e) => setmaterialCount(materialCount + 1)}
                    >
                      <AiOutlinePlus className="cp" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-gray"> 2.More Options</h2>
            <div className="text-right">
              <button
                onClick={(e) => requestForQuots()}
                className="btn btn_cont"
              >
                Request for Quote
              </button>
            </div>
          </Card>
        </div>
      ) : (
        <>
          {!loading && (
            <div className="mt-4">
              <Card className="p-5 m_conf">
                <h2 className="text-gray"> Material Configuration</h2>
                <div class="form-group row " style={{ marginBottom: "2rem" }}>
                  <label for="inputPassword" class="col-sm-2 col-form-label">
                    Material
                  </label>
                  <div class="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      value={partsDetails.materialType}
                    />
                  </div>
                </div>

                <div class="form-group row " style={{ marginBottom: "2rem" }}>
                  <label for="inputPassword" class="col-sm-2 col-form-label">
                    Resolution
                  </label>
                  <div class="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      value={partsDetails.resolution}
                    />
                  </div>
                </div>
                <div class="form-group row " style={{ marginBottom: "2rem" }}>
                  <label for="inputPassword" class="col-sm-2 col-form-label">
                    Finish
                  </label>
                  <div class="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      value={partsDetails.finish}
                    />
                  </div>
                </div>
                <div class="form-group row " style={{ marginBottom: "2rem" }}>
                  <label for="inputPassword" class="col-sm-2 col-form-label">
                    Orientation
                  </label>
                  <div class="col-sm-10">
                    <input
                      className="form-control"
                      type="text"
                      disabled
                      value={partsDetails.resolution}
                    />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MaterialandQuestions;
