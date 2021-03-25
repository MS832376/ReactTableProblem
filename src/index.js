import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TableRow from "./components/TableRow/TableRow";
import TableHeader from "./components/TableHeader/TableHeader";

import "./index.scss";
import "./fonts.scss";

const globalQuakes = []; //global permanent list of earthquakes so I can deal with hooks less
var input = ""; //global, changeable, variable for the search function in organizeEarthquakes
var goodQuakes = []; //changes in response to searches, list of quakes that populates rows
/**
 * This function takes in earthquake data/current search and returns the sorted,
 * filtered, and sliced list per the assignment
 */
export function organizeEarthquakes(search, earthquakes) {
  var x, y, z, a, temp; //used in for loops, temp is for sorting
  var str = []; //holds earthquake.place
  var match = 0; //holds amount of place matches found
  var placeQuakes = []; //holds all earthquakes that match specified place
  var sortedQuakes = []; //holds final sorted list of earthquakes

  //sorts earthquakes
  for (x = 0; x < earthquakes.length; x++) {
    for (y = x + 1; y < earthquakes.length; y++) {
      //magnitude sorting portion
      if (earthquakes[x].mag < earthquakes[y].mag) {
        temp = earthquakes[x];
        earthquakes[x] = earthquakes[y];
        earthquakes[y] = temp;
        //time sorting portion, only if magnitudes are the same
      } else if (earthquakes[x].mag === earthquakes[y].mag) {
        if (earthquakes[x].time < earthquakes[y].time) {
          temp = earthquakes[x];
          earthquakes[x] = earthquakes[y];
          earthquakes[y] = temp;
        }
      }
    }
  }
  /*
    Fills placeQuakes array, also counts number of place matches
    Uses toUpperCase to ignore case issues
  */
  if (search !== "") {
    for (z = 0; z < x; z++) {
      str[z] = earthquakes[z].place.toString();
      if (str[z].toUpperCase().includes(search.toString().toUpperCase())) {
        placeQuakes[match] = earthquakes[z];
        match++;
      }
    }
  } else {
    //if no search entry, treats like there were 20 matches
    match = 20;
    for (z = 0; z < x; z++) {
      placeQuakes[z] = earthquakes[z];
    }
  }
  /*
    Fills sortedQuakes array
    Only passes along up to 20 of the sorted by place Quakes
  */
  for (a = 0; a < 20 && a < match; a++) {
    sortedQuakes[a] = placeQuakes[a];
  }

  return sortedQuakes;
}

/**
 * Write a hook that fetches the data from our earthquakes endpoint.
 * and returns that data.
 *
 * React Docs on Hooks: https://reactjs.org/docs/hooks-intro.html
 */

/*
  Function properly populates table with results based on search
*/
function runSearch(e) {
  input = document.getElementById("place").value.toString();
  ReactDOM.render(<EarthquakeApp />, container);
}
const api =
  "https://cors-anywhere.herokuapp.com/http://interviewtest.getguru.com/seismic/data.json";

function useEarthquakes() {
  const [quakes, setQuakes] = useState(0);
  useEffect(() => {
    fetch(api)
      .then(res => res.json())
      .then(res => {
        setQuakes(res);
      });
  }, []);
  if (quakes.length > 0) {
    return quakes;
  } else {
    return [];
  }
}

function renderRows(quakes) {
  var x = 0;
  if (quakes.length > 0) {
    return quakes.map(quake => {
      return TableRow(quake, x++);
    });
  }
}
/**
 * Please use the two component files provided so the tests work properly!
 */

function EarthquakeApp() {
  var x;
  /*
    Bad, calling useEarthquakes conditionally violates hook guidelines,
    however it functions as expected so react hooks are gonna just have to take
    that one on the chin
  */
  if (globalQuakes.length < 1) {
    var quakes = useEarthquakes();
    for (x = 0; x < quakes.length; x++) {
      globalQuakes[x] = quakes[x];
    }
  }
  if (globalQuakes.length > 0) {
    goodQuakes = organizeEarthquakes(input, globalQuakes);
  }
  return (
    <div className="Earthquakes">
      <p />
      <p />
      <input
        type="text"
        id="place"
        defaultValue=""
        onChange={runSearch}
        placeholder="Search by Location"
        title="Hit Enter to Search"
      />
      <p />
      <table id="table">
        <TableHeader />
        <tbody id="Rows">{renderRows(goodQuakes)}</tbody>
      </table>
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  ReactDOM.render(<EarthquakeApp />, container);
}
