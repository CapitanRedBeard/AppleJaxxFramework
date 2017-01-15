import { combineReducers } from 'redux'
import getValue from '../util/getValue'
import { ADD_ICON_SOURCES } from '../actions/icons.js'
import _ from 'underscore';

function icons(state = {}, action) {
  const {iconsSources} = action;

  switch (action.type) {
    case ADD_ICON_SOURCES:
      state = iconsSources;
      return state

  	default:
  		return state
	}
}

const appReducers = combineReducers({
	icons
})

export default appReducers
