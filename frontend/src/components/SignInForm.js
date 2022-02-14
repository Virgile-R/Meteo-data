import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import AuthFunctions from "../Auth/auth-functions";

function SignInForm({
  handleCloseSignIn,
  setLoggedInUser,
  setShowLogInToast,
  setShowInvalidUsernameOrPassword,
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
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData();
      for (const name in inputs) {
        formData.append(name, inputs[name]);
      }

      const requestOptions = {
        method: "POST",
        body: formData,
      };

      fetch(`${process.env.REACT_APP_API_URL}/token`, requestOptions).then(
        (response) => {
          response.json().then((response) => {
            if (response.detail === "Incorrect username or password") {
              setShowInvalidUsernameOrPassword(true);
            } else {
              localStorage.setItem("user", JSON.stringify(response));
              setShowLogInToast(true);
              setLoggedInUser(AuthFunctions.get_current_user());
            }
          });
        }
      );
      handleCloseSignIn();
    }
    setValidated(true);
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
        <Form.Control.Feedback type="invalid">
          Entrez votre nom d'utilisateur.
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
    </Form>
  );
}

export default SignInForm;
