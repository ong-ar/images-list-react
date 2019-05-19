import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators as dogsActions } from "../redux/modules/dogs";

class Buttons extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.getDogs}>GET DOGS</button>
        <button onClick={this.props.clearDogs}>CLEAR DOGS</button>
      </div>
    );
  }
}

const mapActionToProps = dispatch => {
  return {
    getDogs: () => {
      dispatch(dogsActions.getDogs());
    },
    clearDogs: () => {
      dispatch(dogsActions.clearDogs());
    }
  };
};

export default connect(
  null,
  mapActionToProps
)(Buttons);
