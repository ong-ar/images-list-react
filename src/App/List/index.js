import React, { Component } from "react";
import { connect } from "react-redux";
import { actionCreators as dogsActions } from "../../redux/modules/dogs";
import "./index.scss";

class List extends Component {
  componentDidUpdate() {
    const parentElement = document.querySelector('#Container');
    console.log(parentElement);
    const childrenElements = parentElement.children;
    console.log(childrenElements);
    for(let i = 0; i < childrenElements.length; i++) {
      const element = childrenElements[i];
      
      const css = element.style;
      css['width'] = "200px";
      css['height'] = "200px";
      css['position'] = "absolute";
      if(i > 0) {
        css['left'] = childrenElements[i-1].offsetLeft + 200 + 'px';
      }
      console.log(css);
    }
    
    
  }
  render() {
    return (
      <div className="Container" id='Container'>
        {this.props.dogs.images.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} alt={index}  />
            </div>
          );
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
