import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ProfileModal({
  showProfileModal,
  handleCloseProfile,
  userInfo,
  stationList,
}) {
  return (
    <Modal
      show={showProfileModal}
      onHide={handleCloseProfile}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Username: {userInfo.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Email : {userInfo.email}</p>
        <p>
          Station Favorite:{" "}
          {
            stationList.find(
              (station) => station.id === userInfo.favorite_station
            ).name
          }
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProfile}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileModal;
