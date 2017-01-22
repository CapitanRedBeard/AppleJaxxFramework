
import { combineReducers } from 'redux';

// import navReducers from './navReducers';
import dataSourceReducers from './dataSourceReducers';
import iconsReducers from './iconsReducers';
import frameReducers from './frameReducers';

export default combineReducers({
  dataSourceReducers,
  frameReducers,
  iconsReducers
});
