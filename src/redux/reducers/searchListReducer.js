import { CONSTANTS } from "../actionType";

const initialState = null;

const searchListReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SEARCH_LISTS_IN_BOARD: {
            return { ...state, searchList: action.payload };
        }

        default:
            return state;
    }
};

export default searchListReducer;