import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { actionCreators as dogsActions } from '../redux/modules/dogs';

class Buttons extends PureComponent {
  render() {
    const { getDogs, clearDogs } = this.props;
    return (
      <div>
        <button type="button" onClick={getDogs}>
          GET DOGS
        </button>
        <button type="button" onClick={clearDogs}>
          CLEAR DOGS
        </button>
      </div>
    );
  }
}

// props type
Buttons.propTypes = {
  getDogs: propTypes.func.isRequired,
  clearDogs: propTypes.func.isRequired,
};

// load redux actions
const mapActionToProps = dispatch => ({
  getDogs: () => {
    dispatch(dogsActions.getDogs());
  },
  clearDogs: () => {
    dispatch(dogsActions.clearDogs());
  },
});

export default connect(
  null,
  mapActionToProps,
)(Buttons);
