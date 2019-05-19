// actions
const ADD_DOGS = "ADD_DOGS";
const CLEAR_DOGS = "CLEAR_DOGS";

const addDogs = dogs => {
  return {
    type: ADD_DOGS,
    dogs
  };
};

const clearDogs = () => {
  return {
    type: CLEAR_DOGS
  };
};

// initial state
const initialState = { dogs: [] };

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
    dogs: []
  };
};

const applyAddDogs = (state, action) => {
  return {
    dogs: [...state.dogs, ...action.dogs]
  };
};

// API actions
const getDogs = () => {
  return dispatch => {
    fetch("/data.json")
      .then(response => response.json())
      .then(dogs => dispatch(addDogs(dogs)))
      .catch(err => console.log(err));
  };
};

const actionCreators = {
  getDogs,
  clearDogs
};
export { actionCreators };

export default reducer;
