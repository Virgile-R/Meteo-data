import React, { useEffect, useState } from "react";

function DisplayData({ selectedStation }) {
  const [stationData, setStationData] = useState(null);

  useEffect(() => {
    const fetchData = async (selectionStation) => {
      const result = await fetch(
        `http://localhost:8000/stations/${selectionStation}`
      );
      const stationData = await result.json();
      setStationData(stationData);
    };

    fetchData(selectedStation);
  }, [selectedStation]);

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Année</th>
            <th scope="col">Température Moyenne Pour Janvier</th>
          </tr>
        </thead>
        <tbody>
          {stationData &&
            stationData.temperature.map((year) => {
              return (
                <tr key={year.year}>
                  <th scope="col">{year.year}</th>
                  <th scope="col">{year.temperature}</th>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;
