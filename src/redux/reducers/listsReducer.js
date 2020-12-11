import { CONSTANTS } from "../actionType";

const initialState = {
  // "list-0": {
  //   id: "list-0",
  //   cards: ["card-0"],
  //   title: "Todo Lists",
  //   board: "board-0"
  // }
};

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[droppableIdEnd];

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        };
      }
      return state;

    default:
      return state;

    /*
    // no need. as we do not need to store this data in redux store
    case CONSTANTS.ADD_LIST: {
      // const { title, id } = action.payload;
      // const newList = {
      //   title: title,
      //   id: `list-${id}`,
      //   cards: []
      // };

      // const newState = { ...state, [`list-${id}`]: newList };
    
      const newState = { ...state, newList: action.payload };
      return newState;
    }
    */
    /*
    // no need. as we do not need to store this data in redux store
      case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;

      const list = state[listID];
      const newCards = list.cards.filter(cardID => cardID !== id);

      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    case CONSTANTS.EDIT_LIST_TITLE: {

      // console.log('action.payload: ', action.payload);
      return { ...state, updatedList: action.payload };
    }

    case CONSTANTS.DELETE_LIST: {
      // const { listID } = action.payload;
      // const newState = state;
      // delete newState[listID];
      return { ...state, deleted: action.payload };
    }
    */
  }
};

export default listsReducer;
