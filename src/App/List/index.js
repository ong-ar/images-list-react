import React, { Component } from "react";
import { connect } from "react-redux";
import Masonry from "react-masonry-component";
import { actionCreators as dogsActions } from "../../redux/modules/dogs";
import BottomScrollListener from "react-bottom-scroll-listener";
import "./index.scss";

class List extends Component {
  onBottom = () => {
    if (this.props.dogs.images.length > 0) {
      this.props.getDogs();
    }
  };
  render() {
    return (
      <BottomScrollListener onBottom={this.onBottom}>
        <Masonry
          className="Container"
          options={{
            horizontalOrder: true, // 왼쪽 -> 오른쪽으로 정렬
            transitionDuration: 0 // 애니메이션 없도록
          }}
          enableResizableChildren={false}
        >
          {this.props.dogs.images.map((image, index) => {
            return <img src={image} alt={index} key={index} />;
          })}
        </Masonry>
      </BottomScrollListener>
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
