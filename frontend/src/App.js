import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";

function App() {
  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStation, setSelectedStation] = useState(7005);

  function handleChange(e) {
    setSelectedStation(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/stations`);
      const stationArray = await result.json();
      setStations(stationArray);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (stations.length > 0) {
      setIsLoading(false);
    }
  }, [stations]);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Main
        stationList={stations}
        selectedStation={selectedStation}
        handleChange={handleChange}
      />
    );
  }
}

export default App;
