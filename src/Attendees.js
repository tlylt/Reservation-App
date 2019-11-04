import React, { Component } from "react";
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";
import { FaUndo, FaRandom } from "react-icons/fa";

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      allAttendees: [],
      displayAttendees: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.chooseRandom = this.chooseRandom.bind(this);
  }
  componentDidMount() {
    const ref = firebase
      .database()
      .ref(
        `reservations/${this.props.userID}/${this.props.reservationID}/attendees`
      );
    ref.on("value", snapshot => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeID: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star
        });
      }
      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList
      });
    });
  }
  chooseRandom() {
    const randomAttendee = Math.floor(
      Math.random() * this.state.allAttendees.length
    );
    this.resetQuery();
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]]
    });
  }
  resetQuery() {
    this.setState({
      displayAttendees: this.state.allAttendees,
      searchQuery: ""
    });
  }
  handleChange(e) {
    const tempName = e.target.name;
    const tempValue = e.target.value;
    this.setState({
      [tempName]: tempValue
    });
  }

  render() {
    const dataFilter = item =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toLowerCase()) && true;
    const filteredAttendees = this.state.displayAttendees.filter(dataFilter);
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    name="searchQuery"
                    value={this.state.searchQuery}
                    placeholder="Search Attendees"
                    className="form-control"
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn- btn-sm btn-outline-secondary"
                      title="Pick a random attendee"
                      onClick={this.chooseRandom}
                    >
                      <FaRandom />
                    </button>
                  </div>
                  <div className="input-group-append">
                    <button
                      className="btn- btn-sm btn-outline-secondary"
                      title="Reset search"
                      onClick={this.resetQuery}
                    >
                      <FaUndo />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          // userID is from the URL
          userID={this.props.userID}
          reservationID={this.props.reservationID}
          //adminUser from App.js
          adminUser={this.props.adminUser}
          attendees={filteredAttendees}
        />
      </div>
    );
  }
}

export default Attendees;
