
import { combineReducers } from 'redux';

import navReducers from './navReducers';
import dataSourceReducers from './dataSourceReducers';

export default combineReducers({
  navReducers,
  dataSourceReducers
});
