import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TableHeader from "./TableHeader";

configure({ adapter: new Adapter() });
describe("component - TableHeader", () => {
  it("Renders the columns in the correct order with the correct labels", () => {
    const comp = shallow(<TableHeader />);
    const labels = comp.find("th");
    const expected = ["ID", "Time", "Location", "Magnitude", "More"];
    const recieved = Array.from(labels).map(label => label.props.children);

    expect(recieved).toEqual(expected);
  });
});
