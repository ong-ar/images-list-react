// actions
const ADD_DOGS = "ADD_DOGS";
const CLEAR_DOGS = "CLEAR_DOGS";

const addDogs = images => {
  return {
    type: ADD_DOGS,
    images
  };
};

const clearDogs = () => {
  return {
    type: CLEAR_DOGS
  };
};

// initial state
const initialState = { images: [] };

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

// reducer function
const applyClearDogs = () => {
  return {
    images: []
  };
};

const applyAddDogs = (state, action) => {
  return {
    images: [...state.images, ...action.images]
  };
};

// API actions
const getDogs = () => {
  return dispatch => {
    fetch("/data.json")
      .then(response => response.json())
      .then(images => dispatch(addDogs(images)))
      .catch(err => console.log(err));
  };
};

const actionCreators = {
  getDogs,
  clearDogs
};
export { actionCreators };

export default reducer;
