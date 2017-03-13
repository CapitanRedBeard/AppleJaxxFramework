import OAuthManager from 'react-native-oauth';
import { combineReducers } from 'redux'
import getValue from '../util/getValue'
import { AUTHORIZE, INIT_OAUTH } from '../actions/dataSourceActions'
import _ from 'underscore';

const initialDataState = {
  oAuthManager: null
}

function dataSource(state = initialDataState, action) {
  let newDataState = _.clone(state);

  switch (action.type) {
    case INIT_OAUTH:
      const { config } = action;
      const oAuthManager = new OAuthManager('firestackexample')
      const configurations = {}
      _.each(config, (configOpt) => {
        const { provider, options } = configOpt;
        configurations[provider] = options;
      });
      newDataState.oAuthManager = oAuthManager;
      oAuthManager.configure(configurations);

      _.each(config, (configOpt) => {
        const { provider, scope } = configOpt;

        newDataState.oAuthManager.authorize(provider, {
          "scope": "email+profile"
        })
        .then((resp) => {
          newDataState.oAuthKeys = newDataState.oAuthKeys ? newDataState.oAuthKeys : {};
          newDataState.oAuthKeys[provider] = resp.response.credentials;
          console.log('INIT Updating: ', newDataState, resp)
          return newDataState;

        }).catch((err) => {
          console.log(`INIT There was an error with provider [${provider}], and options: `, options)
          console.log(err)
        });
      });

      // return newDataState;

    case AUTHORIZE:
      const { provider, options } = action;
      //
      // state.oAuthManager.authorize(provider, options)
      // .then((resp) => {
      //   newDataState.oAuthKeys = newDataState.oAuthKeys ? newDataState.oAuthKeys : {};
      //   newDataState.oAuthKeys[provider] = resp.response.credentials;
      //   console.log('Updating: ', newDataState, resp)
      // }).catch((err) => {
      //   console.log(`There was an error with provider [${provider}], and options: `, options)
      //   console.log(err)
      // });
      return newDataState;

  	default:
  		return newDataState
	}
}

const appReducers = combineReducers({
	dataSource
})

export default appReducers
