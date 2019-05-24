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
        css.top = '0px';
        css.left = '0px';
      } else {
        if (parentOffsetWidth <= childrenElements[i - 1].offsetLeft
          + childrenElements[i - 1].offsetWidth && firstNewlineIndex === -1) {
          firstNewlineIndex = i;
        }

        if (firstNewlineIndex === -1) {
          css.top = '0px';
          css.left = `${childrenElements[i - 1].offsetLeft + childrenElements[i - 1].offsetWidth}px`;
        } else {
          css.top = `${childrenElements[i - firstNewlineIndex].offsetTop
            + childrenElements[i - firstNewlineIndex].offsetHeight}px`;

          css.left = `${childrenElements[i - firstNewlineIndex].offsetLeft}px`;
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
        {dogs.images.map((image, index) => <div><img src={image} alt={index} key={index} /></div>)}
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
