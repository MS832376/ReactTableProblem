import React from "react";

import "./TableHeader.scss";

export default function TableHeader() {
  return (
    <thead className="TableHeader" id="header">
      <tr id="head">
        <th id="hid">ID</th>
        <th id="htime">Time</th>
        <th id="hloca">Location</th>
        <th id="hmag">Magnitude</th>
        <th id="hmore">More</th>
      </tr>
    </thead>
  );
}
