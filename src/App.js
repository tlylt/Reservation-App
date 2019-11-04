import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

import Navigation from "./Navigation";
import Welcome from "./Welcome";
import Home from "./Home";
import Login from "./Login";
import Reservation from "./Reservation";
import Register from "./Register";
import Checkin from "./Checkin";
import Attendees from "./Attendees";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      userName: null,
      userID: null,
      reservations: null,
      howManyReservations: null
    };
  }
  //Whenever application loads, check the database
  //Receives the info from the database
  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBuser => {
      if (FBuser) {
        this.setState({
          user: FBuser,
          userName: FBuser.displayName,
          userID: FBuser.uid
        });
        const reservationRef = firebase
          .database()
          .ref("reservations/" + FBuser.uid);
        reservationRef.on("value", snapshot => {
          let reservations = snapshot.val();
          let reservationsList = [];
          for (let item in reservations) {
            reservationsList.push({
              reservationID: item,
              reservationName: reservations[item].reservationName
            });
          }
          this.setState({
            reservations: reservationsList,
            howManyReservations: reservationsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }
  //Whenever something changes about the registration,
  //the event onAuthStateChanged is generated and tracked,
  //firebase method updateProfile has a displayname that can be
  //updated with the userName we have and navigate to reservation page
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBuser => {
      FBuser.updateProfile({
        displayName: userName
      }).then(() => {
        //updates the local state
        this.setState({
          user: FBuser,
          userName: FBuser.displayName,
          userID: FBuser.uid
        });
        navigate("/reservation");
      });
    });
  };
  logOutUser = e => {
    e.preventDefault();
    this.setState({
      userName: null,
      userID: null,
      user: null
    });
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };
  addReservation = reservationName => {
    const ref = firebase.database().ref(`reservations/${this.state.user.uid}`);
    ref.push({ reservationName: reservationName });
  };
  render() {
    return (
      <div className="container">
        <Navigation
          userName={this.state.userName}
          logOutUser={this.logOutUser}
        />
        <Welcome userName={this.state.userName} logOutUser={this.logOutUser} />
        <Router>
          <Home path="/" userName={this.state.userName} />
          <Login path="/login" />
          <Reservation
            path="/reservation"
            addReservation={this.addReservation}
            reservations={this.state.reservations}
            userID={this.state.userID}
          />

          <Attendees
            // use following to pass props
            path="/attendees/:userID/:reservationID"
            adminUser={this.state.userID}
          />
          <Checkin path="/checkin/:userID/:reservationID" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;

// //Whenever application loads, check the database
// componentDidMount() {
//   //referring to the user variable in database
//   const ref = firebase.database().ref("user");

//   //whenever we have a event of new value for the variable, grab the snapshot
//   ref.on("value", snapshot => {
//     let FBuser = snapshot.val();
//     this.setState({ user: FBuser });
//   });
// }
