import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import { actionCreators as dogsActions } from '../../redux/modules/dogs';
import './index.scss';


class List extends PureComponent {
  render() {
    const { dogs } = this.props;
    return (
      <div
        className="Container"
        enableResizableChildren={false}
      >
        {dogs.images.map((image, index) => <img src={image} alt={index} key={image} />)}
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
