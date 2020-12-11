import { combineReducers } from 'redux';
import boardsReducer from './reducers/boardsReducer';
// import boardOrderReducer from './reducers/boardOrderReducer';
// import searchListReducer from './reducers/searchListReducer';
import activeBoardReducer from './reducers/activeBoardReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    boards: boardsReducer,
    activeBoard: activeBoardReducer,
    user: userReducer,
});

export default rootReducer;
