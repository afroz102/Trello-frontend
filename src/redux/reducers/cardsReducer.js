/*
// no need. as we do not need to store this data in redux store
import { CONSTANTS } from "../actionType";

const initialState = {};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const newState = { ...state, newCard: action.payload };
      return newState;
    }

    case CONSTANTS.EDIT_CARD: {
      // console.log('action.payload Edit card: ', action.payload);
      return { ...state, updatedCard: action.payload };
    }

    case CONSTANTS.DELETE_CARD: {
      const newState = { ...state, deletedCard: action.payload };
      return newState;
    }

    default:
      return state;
  }
};

export default cardsReducer;
*/