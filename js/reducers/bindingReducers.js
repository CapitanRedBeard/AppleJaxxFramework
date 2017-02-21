import { combineReducers } from 'redux'
import { UPDATE_BINDING, SET_INITIAL_BINDINGS } from '../actions/bindingActions'

import _ from 'underscore';

function bindingState(state = {}, action) {
  const newBindingState = _.clone(state);

  switch (action.type) {
    case SET_INITIAL_BINDINGS:
      const {bindings} = action;
      _.each(bindings, (val, key) => {
        newBindingState[key] = val ? val : "";
      })
      return newBindingState

    case UPDATE_BINDING:
      const {binding, value} = action;
      newBindingState[binding] = value;
      return newBindingState;

  	default:
  		return state
	}
}

export default combineReducers({
	bindingState
})
