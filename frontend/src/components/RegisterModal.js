import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SignUpForm from "./SignUpForm";

function RegisterModal({
  handleCloseRegister,
  stationList,
  showRegisterModal,
  setShowAccountCreatedToast,
  setShowAccountCreationFailedToast,
  setShowEmailAlreadyExists,
}) {
  return (
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
          setShowAccountCreatedToast={setShowAccountCreatedToast}
          setShowAccountCreationFailedToast={setShowAccountCreationFailedToast}
          setShowEmailAlreadyExists={setShowEmailAlreadyExists}
        ></SignUpForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseRegister}>
          Close
        </Button>
        <Button as="input" type="submit" value="Submit" form="registerForm" />
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;
