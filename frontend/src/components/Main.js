import React, { useState, useEffect } from "react";
import AuthFunctions from "../Auth/auth-functions";
import Header from "./Header";
import SearchForm from "./SearchForm";
import DisplayData from "./DisplayData";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
function Main({ stationList, selectedStation, handleChange }) {
  const [showRegisterModal, setRegistershowModal] = useState(false);
  const [showSignInModal, setSignInshowModal] = useState(false);
  const [showProfileModal, setProfileshowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    AuthFunctions.get_current_user()
  );
  const [userInfo, setUserInfo] = useState(null);
  const [showLogInToast, setShowLogInToast] = useState(false);
  const [showTimeOutToast, setShowTimeOutToast] = useState(false);
  const [showAccountCreatedToast, setShowAccountCreatedToast] = useState(false);
  const [showAccountCreationFailedToast, setShowAccountCreationFailedToast] =
    useState(false);

  const handleCloseRegister = () => setRegistershowModal(false);
  const handleShowRegister = () => setRegistershowModal(true);
  const handleCloseSignIn = () => setSignInshowModal(false);
  const handleShowSignIn = () => setSignInshowModal(true);
  const handleCloseProfile = () => setProfileshowModal(false);
  const handleShowProfile = () => setProfileshowModal(true);
  const [showEmailAlreadyExists, setShowEmailAlreadyExists] = useState(false);
  const logOut = () => {
    AuthFunctions.logout();
    setLoggedInUser(null);
    setUserInfo(null);
  };
  useEffect(() => {
    if (loggedInUser) {
      fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: "Get",
        headers: { Authorization: "Bearer " + loggedInUser.access_token },
      })
        .catch((err) => console.error(err))
        .then((res) => {
          if (res.status === 401) {
            console.log("There was an error");
            setShowTimeOutToast(true);
            logOut();
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setUserInfo(data);
        });
    }
  }, [loggedInUser]);

  return (
    <div className="wrapper">
      <div>
        <ToastContainer position="middle-center">
          <Toast
            delay={3000}
            show={showEmailAlreadyExists}
            autohide
            onClose={() => setShowEmailAlreadyExists(false)}
            bg="warning"
          >
            <Toast.Header>
              {" "}
              <strong className="me-auto">
                {" "}
                Email déjà associé à un compte
              </strong>
            </Toast.Header>
            <Toast.Body>Veuillez choisir un autre email</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="middle-center">
          <Toast
            delay={3000}
            show={showTimeOutToast}
            autohide
            onClose={() => setShowTimeOutToast(false)}
            bg="warning"
          >
            <Toast.Header>
              {" "}
              <strong className="me-auto"> Session expirée</strong>
            </Toast.Header>
            <Toast.Body>Veuillez vous reconnecter</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="middle-center">
          <Toast
            delay={3000}
            show={showLogInToast}
            autohide
            onClose={() => setShowLogInToast(false)}
          >
            <Toast.Header>
              {" "}
              <strong className="me-auto"> Bienvenue</strong>
            </Toast.Header>
            <Toast.Body>Heureux de vous revoir!</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="middle-center">
          <Toast
            delay={3000}
            show={showAccountCreatedToast}
            autohide
            onClose={() => setShowAccountCreatedToast(false)}
          >
            <Toast.Header>
              {" "}
              <strong className="me-auto"> Compte créé</strong>
            </Toast.Header>
            <Toast.Body>Identifiez vous pour continuer.</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="middle-center">
          <Toast
            delay={3000}
            show={showAccountCreationFailedToast}
            autohide
            onClose={() => setShowAccountCreationFailedToast(false)}
            bg="warning"
          >
            <Toast.Header>
              {" "}
              <strong className="me-auto">
                {" "}
                Problème lors de la création du compte
              </strong>
            </Toast.Header>
            <Toast.Body>Veuillez réssayer plus tard</Toast.Body>
          </Toast>
        </ToastContainer>

        <Header
          handleShowRegister={handleShowRegister}
          handleCloseRegister={handleCloseRegister}
          handleShowSignIn={handleShowSignIn}
          handleCloseSignIn={handleCloseSignIn}
          handleShowProfile={handleShowProfile}
          handleCloseProfile={handleCloseProfile}
          showProfileModal={showProfileModal}
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          stationList={stationList}
          showRegisterModal={showRegisterModal}
          showSignInModal={showSignInModal}
          userInfo={userInfo}
          setShowLogInToast={setShowLogInToast}
          logOut={logOut}
          setShowAccountCreatedToast={setShowAccountCreatedToast}
          setShowAccountCreationFailedToast={setShowAccountCreationFailedToast}
          setShowEmailAlreadyExists={setShowEmailAlreadyExists}
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
