import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import mySaga from "../saga";
import { movieReducer } from "../reducers";

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  // ...options
});

export default createStore(
  movieReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(mySaga);
