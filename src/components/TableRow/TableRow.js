import React from "react";
import PropTypes from "prop-types";
import Moment from "moment";

import "./TableRow.scss";
/*
  Populates table with rows
  Stayed with the details that kept info in same cell because with this limited
  implementation I felt it looked/functioned the best
*/
export default function TableRow(quake, index) {
  function clicked() {
    //very basic version of details tab, doesn't add a row yet
    var con = document.getElementsByClassName("content")[index];
    if (con.style.display === "block") {
      con.style.display = "none";
    } else {
      con.style.display = "block";
    }

    /* attempted to put following after TableRow with <></> around both
      <tr id="detailRow" className="ExpandaRow" key={index}>
        <td id="content">
          Longitude: {quake.longitude}, Latitude: {quake.latitude}
        </td>
      </tr>
      makes new row visible, but messes up row color formatting, sometimes
      takes multiple detail clicks, does not populate entire row with data,
      also causes unique key error
    var newCon = document.getElementsByClassName("ExpandaRow")[index];
    if (newCon.style.display === "none") {
      newCon.style.display = "table-row";
    } else {
      newCon.style.display = "none";
    }*/
  }
  return (
    <tr className="TableRow" key={index}>
      <td className="rid">{quake.id}</td>
      <td className="rtime">{Moment.utc(quake.time).format("LL @ HH:mm")}</td>
      <td className="rplace">{quake.place}</td>
      <td className="rmag">{quake.mag}</td>
      <td className="rmore">
        <button type="button" className="click" onClick={clicked}>
          Details
        </button>
        <div className="content">
          Longitude: {quake.longitude}, Latitude: {quake.latitude}
        </div>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  id: PropTypes.string,
  time: PropTypes.string,
  place: PropTypes.string,
  mag: PropTypes.number,
  longitude: PropTypes.number,
  latitude: PropTypes.number
};

TableRow.defaultProps = {
  id: "",
  time: "",
  place: "",
  mag: 0,
  longitude: 0,
  latitude: 0
};
