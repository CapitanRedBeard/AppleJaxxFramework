
import { combineReducers } from 'redux';

// import navReducers from './navReducers';
import dataSourceReducers from './dataSourceReducers';
import iconsReducers from './iconsReducers';
import frameReducers from './frameReducers';
import geolocationReducers from './geolocationReducers';
import bindingReducers from './bindingReducers';
import drawerReducers from './drawerReducers';

export default combineReducers({
  dataSourceReducers,
  geolocationReducers,
  frameReducers,
  iconsReducers,
  bindingReducers,
  drawerReducers
});
