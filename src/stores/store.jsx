import { createStore } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "./reducers/authReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import storage from "redux-persist/lib/storage";
import staffReducer from "./reducers/staffReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  staff: staffReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());

const persistor = persistStore(store);

export { store, persistor };
