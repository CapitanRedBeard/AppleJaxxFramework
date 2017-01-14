import { combineReducers } from 'redux'
import * as NavigationStateUtils from 'NavigationStateUtils'
import demoFrame from '../frame/frame.json';

import { NAV_PUSH, NAV_POP, NAV_JUMP_TO_KEY, NAV_JUMP_TO_INDEX, NAV_RESET } from '../actions/navActions'
import _ from 'underscore';

let initialState = {
  key: 'global',
  index: 0,
  routes: []
};

function extractNavigationStateFromFrame(frame) {
  this.routes = [];
  initialState.routes = frame.pages ?
  _.each(frame.pages, (page, index) => {
    this.routes.push( {index: index, ...page})
  }) : initialState.routes;
  if(frame.footer) initialState.footer = frame.footer;
  if(frame.drawer) initialState.drawer = frame.drawer;

  return initialState;
}

// Checks if the key in the routes array matches a certain key.
// if so returns the route, else returns false
function checkAndGetExistingRoute(routes, key) {
  let exists = false;
  _.each(routes, (route) => {
    if(route.key == key) exists = route;
  });
  return exists;
}

function navigationState(state = extractNavigationStateFromFrame(demoFrame), action) {
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
        const route = checkAndGetExistingRoute(extractNavigationStateFromFrame(demoFrame).routes, action.key);

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
  			routes: extractNavigationStateFromFrame(demoFrame).routes
  		}

  	default:
  		return state
	}
}



const appReducers = combineReducers({
	navigationState
})

export default appReducers
