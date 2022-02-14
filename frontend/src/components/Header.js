import React from "react";
import NavLink from "react-bootstrap/Nav";

import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ProfileModal from "./ProfileModal";
import Navbar from "react-bootstrap/Navbar";
function Header({
  handleShowRegister,
  handleCloseRegister,
  showRegisterModal,
  handleShowSignIn,
  handleCloseSignIn,
  showSignInModal,
  handleShowProfile,
  handleCloseProfile,
  showProfileModal,
  userInfo,
  loggedInUser,
  setLoggedInUser,
  stationList,
  setShowLogInToast,
  logOut,
  setShowAccountCreatedToast,
  setShowAccountCreationFailedToast,
  setShowEmailAlreadyExists,
}) {
  return (
    <Navbar bg="light" expand>
      <RegisterModal
        handleShowRegisterModal={handleShowRegister}
        handleCloseRegister={handleCloseRegister}
        stationList={stationList}
        showRegisterModal={showRegisterModal}
        setShowAccountCreatedToast={setShowAccountCreatedToast}
        setShowAccountCreationFailedToast={setShowAccountCreationFailedToast}
        setShowEmailAlreadyExists={setShowEmailAlreadyExists}
      />
      <LoginModal
        handleShowSignIn={handleShowSignIn}
        handleCloseSignIn={handleCloseSignIn}
        showSignInModal={showSignInModal}
        stationList={stationList}
        setLoggedInUser={setLoggedInUser}
        setShowLogInToast={setShowLogInToast}
      />
      {userInfo !== null && (
        <ProfileModal
          handleShowProfile={handleShowProfile}
          handleCloseProfile={handleCloseProfile}
          showProfileModal={showProfileModal}
          stationList={stationList}
          userInfo={userInfo}
        />
      )}

      <NavLink className="navbar-brand" to="/#">
        Méteo Data
      </NavLink>

      <div className="collapse navbar-collapse text-center" id="navbarText">
        {!loggedInUser ? (
          <>
            <NavLink
              className="btn btn-outline-info my-2 my-sm-0 ms-auto"
              onClick={handleShowSignIn}
            >
              Login
            </NavLink>
            <NavLink
              className="btn btn-outline-info my-2 my-sm-0 ml-3"
              onClick={handleShowRegister}
            >
              Register
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="btn btn-outline-info my-2 my-sm-0 ms-auto"
              onClick={handleShowProfile}
            >
              Profile
            </NavLink>
            <NavLink
              className="btn btn-outline-info my-2 my-sm-0 ms-auto"
              onClick={logOut}
            >
              Logout
            </NavLink>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default Header;
