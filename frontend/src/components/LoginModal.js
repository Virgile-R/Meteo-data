import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SignInForm from "./SignInForm";

function LoginModal({
  showSignInModal,
  handleShowSignIn,
  handleCloseSignIn,
  stationList,
  setLoggedInUser,
  setShowLogInToast,
  setShowInvalidUsernameOrPassword,
}) {
  return (
    <Modal
      show={showSignInModal}
      onHide={handleCloseSignIn}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignInForm
          handleCloseSignIn={handleCloseSignIn}
          stationList={stationList}
          setLoggedInUser={setLoggedInUser}
          setShowLogInToast={setShowLogInToast}
          setShowInvalidUsernameOrPassword={setShowInvalidUsernameOrPassword}
        ></SignInForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSignIn}>
          Close
        </Button>
        <Button as="input" type="submit" value="Submit" form="signInForm" />
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
