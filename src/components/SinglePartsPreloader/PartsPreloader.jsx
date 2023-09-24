import React from "react";
import "./partsPreloader.css"



const PartsPreloader = () => {
  return (
    <div className="parts_preloader">
      <div className="box">
        <div className="skeleton">
          <div className="skeleton-left flex1">
            <div className="square" />
          </div>
          <div className="skeleton-right flex2">
            <div className="line h17 w40 m10" />
            <div className="line" />
            <div className="line h8 w50" />
            <div className="line  w75" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsPreloader;
