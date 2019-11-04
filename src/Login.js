import React, { Component } from "react";
import firebase from "./Firebase";
import FormError from "./FormError";
import { navigate } from "@reach/router";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const tempName = e.target.name;
    const tempValue = e.target.value;
    this.setState({
      [tempName]: tempValue
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };

    //after gathering the userinfo, sign in user,
    //navigate to the myreservation page
    // catch any error and update the state error message.

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate("/reservation");
      })
      .catch(error => {
        error.message
          ? this.setState({ errorMessage: error.message })
          : this.setState({ errorMessage: null });
      });
  }

  render() {
    return (
      <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-dark text-light">
                <div className="card-body">
                  <h3 className="mb-3">Log in</h3>
                  <div className="form-row">
                    {/*if there is errorMessage, show it */}
                    {this.state.errorMessage && (
                      <FormError errorMessage={this.state.errorMessage} />
                    )}
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </section>
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="Password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                      />
                    </section>
                    <div className="form-group col">
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
