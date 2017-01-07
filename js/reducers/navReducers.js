import { combineReducers } from 'redux'
import * as NavigationStateUtils from 'NavigationStateUtils'
import demoFrame from '../../frames/demoFrame.json';
import {getFrameState, checkAndGetExistingRoute} from '../util/frameUtils.js';

import { NAV_PUSH, NAV_POP, NAV_JUMP_TO_KEY, NAV_JUMP_TO_INDEX, NAV_RESET } from '../actions/navActions'
import _ from 'underscore';

function navigationState(state = getFrameState(demoFrame), action) {
  switch (action.type) {
    // case NAV_JUMP_TO_KEY:
    case NAV_PUSH:
  		if (state.routes[state.index].key === (action.state && action.state.key)){
        return state
      }
      if(checkAndGetExistingRoute(state.routes, action.key)){
        // return NavigationStateUtils.jumpTo(state, action.key)
        return state
      }
      else {
        const route = checkAndGetExistingRoute(getFrameState(demoFrame).routes, action.key);

        return NavigationStateUtils.push(state, route)
      }

  	case NAV_POP:
  		if (state.index === 0 || state.routes.length === 1) return state
  		return NavigationStateUtils.pop(state)

  	case NAV_JUMP_TO_KEY:
      return checkAndGetExistingRoute(state.routes, action.key) ? NavigationStateUtils.jumpTo(state, action.key) : state;

  	case NAV_JUMP_TO_INDEX:
  		return NavigationStateUtils.jumpToIndex(state, action.index)

  	case NAV_RESET:

  		return {
  			...state,
  			index: action.index,
  			routes: getFrameState(demoFrame).routes
  		}

  	default:
  		return state
	}
}



const appReducers = combineReducers({
	navigationState
})

export default appReducers
