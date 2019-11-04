import React, { Component } from "react";
import { FaFly } from "react-icons/fa";
import { Link } from "@reach/router";

class Navigation extends Component {
  render() {
    const { userName, logOutUser } = this.props;
    return (
      <nav className="navbar navbar-expand bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <FaFly className="mr-2" />
            Reservation App
          </Link>
          <div className="navbar-nav ml-auto">
            {userName ? (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/reservation">
                  My Reservation
                </Link>
                <Link
                  className="nav-item nav-link"
                  to="/login"
                  onClick={e => logOutUser(e)}
                >
                  Log out
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  Sign up
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
export default Navigation;
