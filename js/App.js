import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger';

import reducers from './reducers/navReducers'
// import AppContainer from './containers/AppContainer'
import AppNavigator from './AppNavigator'
const middleware = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
const store = createStoreWithMiddleware(reducers)

export default class App extends Component {

  componentWillMount() {
    _updateRoutes = (action, routes) => {
      const pages = reducer(this.state.pages, action, routes)
      this.setState({
        pages
      })
    }
  }

	render() {
		return (
			<Provider store={store}>
				{/* Change the component below to flip between the NavigationTransitioner
				    and the NavigationCardStack examples: */ }
				<AppNavigator />
			</Provider>
		)
	}
}
