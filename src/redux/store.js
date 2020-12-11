import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)));

export default store;

/*
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = () => {
    let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);
    return { store, persistor };
};

export default store;
*/