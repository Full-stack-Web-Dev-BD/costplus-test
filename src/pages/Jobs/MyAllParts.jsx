import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import axios from "axios";
import { BASE_URL, authTokenInHeader }from "../../utils/constant";
import PartsPreloader from "../../components/SinglePartsPreloader/PartsPreloader";
import { Link } from "react-router-dom";

const MyAllParts = () => {
  const [myAllParts, setmyAllParts] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetchAllParts();
  }, []);
  const fetchAllParts = async () => {
    const response = await axios.get(`${BASE_URL}/api/parts`, {
      headers: authTokenInHeader(),
    });
    setmyAllParts(response.data);
    setloading(false);
  };

  return (
    <div className="container mt-4">
      {myAllParts.length < 1 && !loading && (
        <p className="text-center"> No Parts Available ! </p>
      )}
      {loading ? (
        <>
          {[1, 2].map((el, id) => (
            <div className="mb-4" key={id}>
              <PartsPreloader />
            </div>
          ))}
        </>
      ) : (
        <>
          {myAllParts.map((parts, i) => (
            <Link
              className="p-4 mb-4"
              to={`/material-and-questions/${parts._id}`}
            >
              <Card key={i}>
                <div className="d-flex" style={{ gap: "20px", padding:'20px' }}>
                  <div className="material_box">
                    <img src={`${BASE_URL}/uploads/${parts.materialFile}.png`} />
                  </div>
                  <div style={{ width: "100%" }} className="single_parts">
                    <h2> {parts.serviceName ? parts.serviceName:'Parts  Service'} </h2>
                    <p className="m-0">Pump Manifold v3.step</p>
                    <div
                      className="d-flex"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>1174-4226-001</span>
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                        }}
                      >
                        <span>Quantity 1</span>
                        <button className="btn border-btn">
                          Configure Parts
                        </button>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <p>
                      <span className="mr-3"> X: 4.500in</span>
                      <span className="mr-3"> Y: 4.484in</span>
                      <span className="mr-3"> Z: 3.274in</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default MyAllParts;
