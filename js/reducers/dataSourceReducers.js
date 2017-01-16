import { combineReducers } from 'redux'
import getValue from '../util/getValue'
import { DATA_ADD } from '../actions/dataSource'
import _ from 'underscore';

const initialDataState = {
  feeds: {}
}

async function dataSource(state = initialDataState, action) {
  const {data, binding} = action;

  switch (action.type) {
    case DATA_ADD:
      state.feeds[binding] = getValue(data, returnPath);
      return state

  	default:
  		return state
	}
}

const appReducers = combineReducers({
	dataSource
})

export default appReducers
