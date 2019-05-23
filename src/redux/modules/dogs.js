// actions
const ADD_DOGS = 'ADD_DOGS';
const CLEAR_DOGS = 'CLEAR_DOGS';

function addDogs(images) {
  return {
    type: ADD_DOGS,
    images,
  };
}

function clearDogs() {
  return {
    type: CLEAR_DOGS,
  };
}

// initial state
const initialState = { images: [] };

// reducer function
function applyClearDogs() {
  return {
    images: [],
  };
}

function applyAddDogs(state, action) {
  return {
    images: [...state.images, ...action.images],
  };
}

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_DOGS:
      return applyClearDogs();
    case ADD_DOGS:
      return applyAddDogs(state, action);
    default:
      return state;
  }
};

// API actions
function getDogs() {
  return (dispatch) => {
    fetch('/data.json')
      .then(response => response.json())
      .then(images => dispatch(addDogs(images)))
      .catch(); // error
  };
}

const actionCreators = {
  getDogs,
  clearDogs,
};
export { actionCreators };

export default reducer;
