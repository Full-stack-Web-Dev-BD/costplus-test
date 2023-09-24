import { Card } from "@mui/material";
import React from "react";

const FIlterBar = () => {
  return (
    <Card className="mt-4 p-4">
      <h4>Filter Here </h4>
      <div className="row">
        <div className="col-md-3">
          <select className="form-control">
            <option> All orders</option>
            <option> 3D printing orders</option>
            <option> CNC machining orders</option>
            <option> Injection molding orders</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-control">
            <option> All time</option>
            <option> Ordered in the last 30 days</option>
            <option> Ordered in the last 90 days</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Search here..."
            type="text"
          />
        </div>
      </div>
    </Card>
  );
};

export default FIlterBar;
