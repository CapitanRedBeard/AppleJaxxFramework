import { combineReducers } from 'redux'
import { UPDATE_GEOLOCATION } from '../actions/geolocationActions'

import _ from 'underscore';

function geolocation(state = {}, action) {

  switch (action.type) {
    case UPDATE_GEOLOCATION:
      console.log("3", action)
      state = action.position
      return state

  	default:
  		return state
	}
}

export default combineReducers({
	geolocation
})
