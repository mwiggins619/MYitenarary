import { composeWithDevTools } from "redux - devtools - extension";
const composeEnhancers = composeWithDevTools({
  // Specify custom devTools options
});
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(...middleware)
    // other store enhancers if any
  )
);
