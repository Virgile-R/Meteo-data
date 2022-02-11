import React from "react";
import NavLink from "react-bootstrap/Nav";
import AuthFunctions from "../Auth/auth-functions";
function Header({
  handleShowRegister,
  handleShowSignIn,
  handleShowProfile,
  loggedInUser,
  setLoggedInUser,
}) {
  function logOut() {
    AuthFunctions.logout();
    setLoggedInUser(null);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/#">
        Méteo Data
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
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
    </nav>
  );
}

export default Header;
