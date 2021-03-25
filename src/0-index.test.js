import mockEarthquakeData from "../../public/mockEarthquakeData";
import mockSortedEarthquakeData from "../../public/mockSortedEarthquakeData";
import mockFilteredByAlaskaEarthquakeData from "../../public/mockFilteredByAlaskaEarthquakeData";

import { organizeEarthquakes } from "./index";

describe("organizeEarthquakes", () => {
  it("Properly sorts the earthquakes by mag and then by time", () => {
    const resultIds = organizeEarthquakes(
      "",
      mockEarthquakeData
    ).map(eq => eq.id);

    const expectedIds = mockSortedEarthquakeData
      .map(eq => eq.id)
      .slice(0, resultIds.length);

    expect(resultIds).toEqual(expectedIds);
  });

  it("filters the earthquakes by location only", () => {
    const resultIds = organizeEarthquakes(
      "Alaska",
      mockEarthquakeData
    ).map(eq => eq.id);

    expect(resultIds.length).toBeGreaterThan(
      0
    );

    const expectedIds = mockFilteredByAlaskaEarthquakeData
      .map(eq => eq.id)
      .slice(0, resultIds.length);

    expect(resultIds).toEqual(expectedIds);
  });

  it("filters without case affecting the results", () => {
    const resultIds = organizeEarthquakes(
      "aLaSkA",
      mockEarthquakeData
    ).map(eq => eq.id);

    expect(resultIds.length).toBeGreaterThan(
      0
    );

    const expectedIds = mockFilteredByAlaskaEarthquakeData
      .map(eq => eq.id)
      .slice(0, resultIds.length);

    expect(resultIds).toEqual(expectedIds);
  });

  it("Returns no more then 20 earthquakes", () => {
    const results = organizeEarthquakes(
      "",
      mockEarthquakeData
    );

    expect(
      results.length
    ).toBeLessThanOrEqual(20);
  });
});
