
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './promise';
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

export default function configureStore(onCompletion:()=>void, preloadedState = {}):any {
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    devTools({
      name: 'nativestarterkit', realtime: true,
    }),
  );

  const store = createStore(reducer, preloadedState, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);

  return store;
}
//
// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
// import rootReducer from './reducers'
//
// const loggerMiddleware = createLogger()
//
// export default function configureStore(preloadedState) {
//   return createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     )
//   )
// }
