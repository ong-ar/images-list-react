import React, { Component } from "react";
import { connect } from "react-redux";
import Masonry from "react-masonry-component";
import { actionCreators as dogsActions } from "../../redux/modules/dogs";
import "./index.scss";

class List extends Component {
  // 마운트 된 후 스크롤 이벤트 리스너 추가
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
  }

  // 언마운트 시 스크롤 이벤트 리스너 삭제
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      this.props.dogs.images.length
    ) {
      this.props.getDogs();
    }
  };

  render() {
    return (
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
