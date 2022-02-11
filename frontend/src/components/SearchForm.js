import React from "react";
import Form from "react-bootstrap/Form";

function SearchForm({ stationList, handleChange }) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formStations">
          <Form.Label>Choississez une station</Form.Label>
          <Form.Select id="stations" onChange={handleChange}>
            {stationList.map((station) => {
              return (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
}

export default SearchForm;
