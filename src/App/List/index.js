import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators as dogsActions } from "../../redux/modules/dogs";
import "./index.scss";

class List extends Component {
  render() {
    return (
        <div
          className="Container"
          enableResizableChildren={false}
        >
          {this.props.dogs.images.map((image, index) => {
            return <img src={image} alt={index} key={index} />;
          })}
        </div>
    );
  }
}

const mapActionToProps = dispatch => {
  return {
    getDogs: () => dispatch(dogsActions.getDogs())
  };
};

const mapStateToProps = state => {
  const { dogs } = state;
  return { dogs };
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(List);
