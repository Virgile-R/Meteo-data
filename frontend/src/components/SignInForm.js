import React, { useState } from "react";
import Form from "react-bootstrap/Form";

function SignInForm({ handleCloseSignIn }) {
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
      const formData = new FormData();
      for (const name in inputs) {
        formData.append(name, inputs[name]);
      }
      setValidated(true);
      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch("http://localhost:8000/token", requestOptions).then((response) => {
        response
          .json()
          .then((response) =>
            localStorage.setItem("user", JSON.stringify(response))
          );
      });
      handleCloseSignIn();
    }
  }
  return (
    <Form noValidate validated={validated} id="signInForm" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          type="text"
          name="username"
          placeholder="Entrez votre username"
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
    </Form>
  );
}

export default SignInForm;
