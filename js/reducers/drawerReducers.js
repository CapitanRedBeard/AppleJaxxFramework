import { combineReducers } from 'redux'
import { DRAWER_TOGGLE, DRAWER_OPEN, DRAWER_CLOSE } from '../actions/drawerActions'

import _ from 'underscore';
const initialState = {
  open: false
}

function drawerState(state = initialState, action) {
  const newDrawerState = _.clone(state);

  switch (action.type) {

    case DRAWER_TOGGLE:
      newDrawerState.open = !newDrawerState.open
      return newDrawerState;

    case DRAWER_OPEN:
      newDrawerState.open = true
      return newDrawerState;

    case DRAWER_CLOSE:
      newDrawerState.open = false
      return newDrawerState;

  	default:
  		return state
	}
}

export default combineReducers({
	drawerState
})
