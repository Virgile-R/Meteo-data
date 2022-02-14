import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function SignUpForm({
  stationList,
  handleCloseRegister,
  setShowAccountCreatedToast,
  setShowAccountCreationFailedToast,
  setShowEmailAlreadyExists,
}) {
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

    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      };

      fetch(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        requestOptions
      ).then((res) => {
        if (res.status !== 200) {
          res.json().then((data) => {
            console.log(data.detail);
            if (data.detail === "An account with this email already exists") {
              setShowEmailAlreadyExists(true);
            } else {
              setShowAccountCreationFailedToast(true);
            }
          });
        } else {
          setShowAccountCreatedToast(true);
        }
      });
      e.preventDefault();

      handleCloseRegister();
    }
    setValidated(true);
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
          <Form.Control.Feedback type="invalid">
            Choississez un nom d'utilisateur.
          </Form.Control.Feedback>
        </Form.Group>

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
            name="favorite_station"
            id="stations"
            onChange={handleChange}
            defaultValue=""
          >
            <option value="">Choississez une station préférée</option>
            {stationList.map((station) => {
              return (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Choississez une station préférée
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </>
  );
}

export default SignUpForm;
