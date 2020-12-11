import { CONSTANTS } from "../actionType";

const initialState = null;

const activeBoardReducer = (state = initialState, action) => {
  // Board by id
  switch (action.type) {
    case CONSTANTS.SET_ACTIVE_BOARD: {
      // const newState = {...state, }
      return { ...state, board: action.payload };
    }

    default:
      return state;
  }
};

export default activeBoardReducer;
