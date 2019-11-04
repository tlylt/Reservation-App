import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-10 col-lg-8">
            <div className="display-4">Make Your Reservation</div>
            <p className="lead">
              {" "}
              This simple app allows people to check available tickets and
              corporate cards and make reservation. It also allows picking
              random users to award giveaways.
            </p>
            {userName ? (
              <React.Fragment>
                <Link className="btn btn-outline-dark " to="/reservation">
                  My Reservation
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="btn btn-outline-dark " to="/login">
                  Login
                </Link>
                <Link className="btn btn-outline-dark " to="/register">
                  Sign up
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
