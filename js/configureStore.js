
import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from './reducers';
import promise from './util/promise';
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger()

export default function configureStore():any {
  const enhancer = compose(
    applyMiddleware(thunk, promise),
    devTools({
      name: 'nativestarterkit', realtime: true,
    }),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage });

  return store;
}
