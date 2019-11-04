import React, { Component } from "react";
import { GoTrashcan, GoListUnordered } from "react-icons/go";
import firebase from "./Firebase";
import { FaLink } from "react-icons/fa";
import { navigate } from "@reach/router";

class ReservationsList extends Component {
  constructor(props) {
    super(props);
    this.deleteReservation = this.deleteReservation.bind(this);
  }
  deleteReservation = (e, whichReservation) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`reservations/${this.props.userID}/${whichReservation}`);
    ref.remove();
  };

  render() {
    const { reservations } = this.props;
    const myReservations = reservations.map(item => {
      return (
        <div className="list-group-item d-flex" key={item.reservationID}>
          <section className="btn-group align-self-center" role="group">
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendees List"
              onClick={() =>
                navigate(
                  `/attendees/${this.props.userID}/${item.reservationID}`
                )
              }
            >
              <GoListUnordered />
            </button>

            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check in"
              onClick={() =>
                navigate(`/checkin/${this.props.userID}/${item.reservationID}`)
              }
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete Reservation"
              onClick={e => this.deleteReservation(e, item.reservationID)}
            >
              <GoTrashcan />
            </button>
          </section>
          <section className="pl-3 text-left align-self-center">
            {item.reservationName}
          </section>
        </div>
      );
    });

    return <div>{myReservations}</div>;
  }
}
export default ReservationsList;
