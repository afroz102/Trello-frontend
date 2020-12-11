import { CONSTANTS } from "../actionType";

const initialState = {
  // "board-0": {
  //   id: "board-0",
  //   lists: ["list-0"],
  //   title: "my-board"
  // }
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {

    // no need. as we do not need to store this data in redux store
    // case CONSTANTS.ADD_BOARD: {
    //   return { ...state, boardcreated: action.payload };
    // }

    case CONSTANTS.GET_ALL_BOARDS: {
      // console.log('action.payload: ', action.payload);
      return { ...state, board: action.payload }
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;
    }

    default:
      return state;
  }
};

export default boardsReducer;