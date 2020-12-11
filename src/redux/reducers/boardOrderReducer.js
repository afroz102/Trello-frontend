import { CONSTANTS } from "../actionType";
// import uuid from 'uuidv4';

// console.log(uuid());

// const initialState = ["board-0"];
const initialState = [];

const boardOrderReducer = (state = initialState, action) => {

  switch (action.type) {
    case CONSTANTS.ADD_BOARD: {
      return [...state, `board-${action.payload.board._id}`];
    }
    default:
      return state;
  }
};

export default boardOrderReducer;
