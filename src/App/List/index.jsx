import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { actionCreators as dogsActions } from '../../redux/modules/dogs';
import './index.scss';


class List extends PureComponent {
  componentDidUpdate() {
    const parentElement = document.querySelector('#Container');
    const parentOffsetWidth = parentElement.offsetWidth;
    const childrenElements = parentElement.children;
    let firstNewlineIndex = -1;
    for (let i = 0; i < childrenElements.length; i += 1) {
      const element = childrenElements[i];

      const css = element.style;
      css.position = 'absolute';
      if (i === 0) {
        css.left = '0px';
      } else if (parentOffsetWidth <= childrenElements[i - 1].offsetLeft + childrenElements[i - 1].offsetWidth) {
        if (firstNewlineIndex === -1) {
          firstNewlineIndex = i;
        }
        if (firstNewlineIndex !== -1) {
          css.top = `${childrenElements[i - firstNewlineIndex].offsetTop
             + childrenElements[i - firstNewlineIndex].offsetHeight}px`;
          console.log(childrenElements[i - firstNewlineIndex].offsetHeight, childrenElements[i - firstNewlineIndex].offsetTop);
        } else {
          css.top = '0px';
        }
        css.left = '0px';
      } else {
        css.left = `${childrenElements[i - 1].offsetLeft + childrenElements[i - 1].offsetWidth}px`;
        if (firstNewlineIndex !== -1) {
          css.top = `${childrenElements[i - firstNewlineIndex].offsetTop
             + childrenElements[i - firstNewlineIndex].offsetHeight}px`;
        } else {
          css.top = '0px';
        }
      }
    }
  }

  render() {
    const { dogs } = this.props;
    return (
      <div
        className="Container"
        id="Container"
      >
        {dogs.images.map((image, index) => <img src={image} alt={index} key={index} />)}
      </div>
    );
  }
}


// props type
List.propTypes = {
  dogs: propTypes.shape({ images: propTypes.array.isRequired }).isRequired,
};
/*
const mapActionToProps = dispatch => ({
  getDogs: () => dispatch(dogsActions.getDogs()),
});
*/

const mapStateToProps = (state) => {
  const { dogs } = state;
  return { dogs };
};

export default connect(
  mapStateToProps,
  null,
)(List);
