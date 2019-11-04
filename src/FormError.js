import React, { Component } from "react";

class FormError extends Component {
  render() {
    const { errorMessage } = this.props;
    return <div className="col-12 alert alert-danger px-3">{errorMessage}</div>;
  }
}

export default FormError;
