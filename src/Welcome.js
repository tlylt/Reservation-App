import React, { Component } from "react";
import { Link } from "@reach/router";

class Welcome extends Component {
  render() {
    const { userName, logOutUser } = this.props;
    return (
      <div className="text-center font-weight-bold mt-2 text-secondary">
        {userName && (
          <React.Fragment>
            <p className="">
              Welcome {userName},{" "}
              <Link
                className="text-secondary"
                to="/login"
                onClick={e => logOutUser(e)}
              >
                Log out
              </Link>
            </p>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default Welcome;
