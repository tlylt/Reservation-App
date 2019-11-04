import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import ReservationsList from "./ReservationsList";
class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    this.setState({ [itemName]: itemValue });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addReservation(this.state.reservationName);
    this.setState({
      reservationName: ""
    });
  }
  render() {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Reservation</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="form-group" onSubmit={this.handleSubmit}>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="reservationName"
                      placeholder="Reservation name"
                      aria-describedby="buttonAdd"
                      value={this.state.reservationName}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-secondary"
                        id="buttonAdd"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-11 col-md-6 text-center">
            <div className="card border-top-0 rounded-0">
              {this.props.reservations && this.props.reservations.length ? (
                <div className="card-body py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Reservations
                  </h4>
                </div>
              ) : null}
              {this.props.reservations && (
                <div className="list-group list-group-flush">
                  <ReservationsList
                    reservations={this.props.reservations}
                    userID={this.props.userID}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Reservation;
