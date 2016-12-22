import { combineReducers } from 'redux'
import * as NavigationStateUtils from 'NavigationStateUtils'
import frame from '../../frames/sampleSchema.json';

import { NAV_PUSH, NAV_POP, NAV_JUMP_TO_KEY, NAV_JUMP_TO_INDEX, NAV_RESET } from '../actions/navActions'
import _ from 'underscore';

var initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'splashscreen0',
      type: 'splashscreen',
      index: 0,
    },
    {
      key: 'blankpage0',
      type: 'blankscreen',
      index: 1,
    }
  ],
};

function getInitialState(frame){
  console.log(frame);
  this.routes = [];
  initialState.routes = frame.pages ?
  _.each(frame.pages, (page, index) => {
    this.routes.push( {index: index, ...page})
  }) : initialState.routes;

  console.log(initialState.routes);
  return initialState
}

function navigationState(state = getInitialState(frame), action) {
  console.log("Initial Frame", NAV_PUSH, action.type)
  switch (action.type) {
	case NAV_PUSH:
    console.log("NAV_PUSH")
		if (state.routes[state.index].key === (action.state && action.state.key)){
      console.log("Woot")
      return state
    }
    console.log("else")
		return NavigationStateUtils.push(state, action.state)

	case NAV_POP:
		if (state.index === 0 || state.routes.length === 1) return state
		return NavigationStateUtils.pop(state)

	case NAV_JUMP_TO_KEY:
		return NavigationStateUtils.jumpTo(state, action.key)

	case NAV_JUMP_TO_INDEX:
		return NavigationStateUtils.jumpToIndex(state, action.index)

	case NAV_RESET:
		return {
			...state,
			index: action.index,
			routes: action.routes
		}

	default:
    console.log("default")

		return state
	}
}

const appReducers = combineReducers({
	navigationState
})

export default appReducers
