import React, { useEffect, useState } from "react";
import MaterialTable from "./MaterialTable";
import AddNewMaterialModal from "./AddNewMaterialModal";
import { AiOutlinePlus } from "react-icons/ai";

import axios from "axios";
import { BASE_URL, authTokenInHeader } from "../../../../utils/constant";
import toast from "react-hot-toast";



const MaterialManagement = () => {
  const [materialList, setmaterialList] = useState([])
  useEffect(() => {
    fetchMaterials()
  }, []);
  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/material`, {
        headers: authTokenInHeader(),
      });
      setmaterialList(response.data)
    } catch (error) {
      console.log("error", error);
    }
  };


  
  const deleteMaterials = async (mID) => {
    console.log("deleteMaterials", mID)
    try {
      const response = await axios.delete(`${BASE_URL}/api/admin/material/${mID}`, {
        headers: authTokenInHeader(),
      });
      toast.success("Material deleted successfully")
      fetchMaterials()
    } catch (error) {
      console.log("error", error);
    }
  };

  
  return (
    <div className="container">
      <div className="mb-3">
        <AddNewMaterialModal
          title={
            <span>
              <AiOutlinePlus /> Add New Material
            </span>
          }
          reFetchMaterials={fetchMaterials}
        />
      </div>
      <MaterialTable materialList={materialList} deleteMaterial={deleteMaterials} fetchMaterial={fetchMaterials}/>
    </div>
  );
};

export default MaterialManagement;
