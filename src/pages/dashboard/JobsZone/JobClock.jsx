import React, { useEffect } from "react";
import "./jobClock.css";
const JobClock = () => {
  useEffect(() => {
    var inc = 1000;

    clock();

    function clock() {
      const date = new Date();

      const hours = ((date.getHours() + 11) % 12) + 1;
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const hour = hours * 30;
      const minute = minutes * 6;
      const second = seconds * 6;

      const _hours = document.querySelector(".hour");
      if (_hours) {
        _hours.style.transform = `rotate(${hour}deg)`;
      }
      const _minutes = document.querySelector(".minute");
      if (_minutes) {
        _minutes.style.transform = `rotate(${minute}deg)`;
      }
      const _seconds = document.querySelector(".second");
      if (_seconds) {
        _seconds.style.transform = `rotate(${second}deg)`;
      }
    }

    setInterval(clock, inc);
  }, []);
  return (
    <div className="clockWrap sc_job">
      <div class="clock">
        <div class="wrap">
          <span class="hour"></span>
          <span class="minute"></span>
          <span class="second"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default JobClock;
