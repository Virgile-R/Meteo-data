import React, { useState } from "react";
import AuthFunctions from "../Auth/auth-functions";
import Header from "./Header";
import SearchForm from "./SearchForm";
import DisplayData from "./DisplayData";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function Main({ stationList, selectedStation, handleChange }) {
  const [showRegisterModal, setRegistershowModal] = useState(false);
  const [showSignInModal, setSignInshowModal] = useState(false);
  const [showProfileModal, setProfileshowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    AuthFunctions.get_current_user()
  );
  const handleCloseRegister = () => setRegistershowModal(false);
  const handleShowRegister = () => setRegistershowModal(true);
  const handleCloseSignIn = () => setSignInshowModal(false);
  const handleShowSignIn = () => setSignInshowModal(true);
  const handleCloseProfile = () => setProfileshowModal(false);
  const handleShowProfile = () => setProfileshowModal(true);

  return (
    <div className="wrapper">
      <div>
        <Modal
          show={showRegisterModal}
          onHide={handleCloseRegister}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignUpForm
              stationList={stationList}
              handleCloseRegister={handleCloseRegister}
            ></SignUpForm>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRegister}>
              Close
            </Button>
            <Button
              as="input"
              type="submit"
              value="Submit"
              form="registerForm"
            />
          </Modal.Footer>
        </Modal>

        <Modal
          show={showSignInModal}
          onHide={setProfileshowModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignInForm handleCloseSignIn={handleCloseSignIn}></SignInForm>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSignIn}>
              Close
            </Button>
            <Button as="input" type="submit" value="Submit" form="signInForm" />
          </Modal.Footer>
        </Modal>

        <Modal
          show={showProfileModal}
          onHide={handleCloseProfile}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Email</p>
            <p>Station Favorite</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProfile}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Header
          handleShowRegister={handleShowRegister}
          handleShowSignIn={handleShowSignIn}
          handleShowProfile={handleShowProfile}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
        ></Header>
        <SearchForm
          stationList={stationList}
          handleChange={handleChange}
        ></SearchForm>
        <DisplayData selectedStation={selectedStation}></DisplayData>
      </div>
    </div>
  );
}

export default Main;
