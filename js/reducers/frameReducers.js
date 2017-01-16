import { combineReducers } from 'redux'
import { UPDATE_FRAME } from '../actions/frameActions'

import _ from 'underscore';

function frameState(state = {}, action) {

  switch (action.type) {
    case UPDATE_FRAME:
      state = action.frame
      return state

  	default:
  		return state
	}
}

export default combineReducers({
	frameState
})
