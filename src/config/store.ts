import { applyMiddleware, compose, createStore, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../store/index";
import rootEpics from '../epics/index';

export const dependencies = { ajax } as const;

const persistConfig = {
  key: "root",
  storage,
};

const epicMiddleware = createEpicMiddleware({
  dependencies,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [epicMiddleware];
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store: Store<any> = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
export const persistor = persistStore(store);

epicMiddleware.run(rootEpics);
