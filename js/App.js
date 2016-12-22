import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducers from './reducers/navReducers'
// import AppContainer from './containers/AppContainer'
import AppNavigator from './AppNavigator'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
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
// import React, { Component } from 'react';
// import AppNavigator from './AppNavigator';
// import _ from 'underscore';
// class App extends Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   componentWillMount() {
//     _updateRoutes = (action, routes) => {
//       const pages = reducer(this.state.pages, action, routes)
//       this.setState({
//         pages
//       })
//     }
//   }
//
//   render() {
//     return <AppNavigator routes={this.routes}/>;
//   }
// }
//
// export default App;
