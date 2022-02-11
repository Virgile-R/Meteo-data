import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function SignUpForm({ stationList, handleCloseRegister }) {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  function onSubmit(e) {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      };

      fetch("http://localhost:8000/user/signup", requestOptions);
      handleCloseRegister();
    }
  }
  return (
    <>
      <Form
        noValidate
        validated={validated}
        id="registerForm"
        onSubmit={onSubmit}
      >
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Entrez un email valide
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            name="username"
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Control.Feedback type="invalid">
          Choississez un nom d'utilisateur.
        </Form.Control.Feedback>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Entrez un mot de passe
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formStations">
          <Form.Label>Choississez une station préférée</Form.Label>

          <Form.Select
            required
            name="preferedStation"
            id="stations"
            onChange={handleChange}
            defaultValue="7005"
          >
            <option value="null">Pas de station préférée</option>
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

export default SignUpForm;
