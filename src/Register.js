import React, { Component } from "react";
import FormError from "./FormError";
import firebase from "./Firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      repeatPassword: "",
      errorMessage: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const tempName = e.target.name;
    const tempValue = e.target.value;
    this.setState(
      {
        [tempName]: tempValue
      },
      () => {
        if (this.state.password !== this.state.repeatPassword) {
          this.setState({ errorMessage: "Passwords do not match" });
        } else {
          this.setState({ errorMessage: null });
        }
      }
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    var registrationInfo = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    //after gathering the userinfo, create user in the firebase,
    //pass the user name into method declared in main app,
    //catch any error and update the state error message.

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(registrationInfo.userName);
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
                  <h3 className="mb-3">Sign up</h3>
                  <div className="form-row">
                    {/*if there is errorMessage, show it */}
                    {this.state.errorMessage && (
                      <FormError errorMessage={this.state.errorMessage} />
                    )}
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="userName"
                      >
                        User Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="userName"
                        placeholder="User Name"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleChange}
                        required
                      />
                    </section>
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
                    <section className="col-sm-6 form-group">
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
                    <section className="col-sm-6 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="repeatPassword"
                      >
                        Repeat Password
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        id="displayName"
                        placeholder="Repeat Password"
                        name="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={this.handleChange}
                        required
                      />
                    </section>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-outline-secondary"
                      >
                        Register
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
export default Register;
