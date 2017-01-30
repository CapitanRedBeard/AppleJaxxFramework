import { combineReducers } from 'redux'
import { UPDATE_BINDING, SET_INITIAL_BINDINGS } from '../actions/bindingActions'

import _ from 'underscore';

function bindingState(state = {}, action) {

  switch (action.type) {
    case SET_INITIAL_BINDINGS:
      const {bindings} = action;
      _.each(bindings, (val, key) => {
        state[key] = "";
      })
      return state

    case UPDATE_BINDING:
      const {binding, value} = action;
      state[binding] = value;
      return state

  	default:
  		return state
	}
}

export default combineReducers({
	bindingState
})
