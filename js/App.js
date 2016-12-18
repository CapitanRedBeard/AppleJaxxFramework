import React, { Component } from 'react';
import AppNavigator from './AppNavigator';
import _ from 'underscore';
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    _updateRoutes = (action, routes) => {
      const pages = reducer(this.state.pages, action, routes)
      this.setState({
        pages
      })
    }
  }

  render() {
    return <AppNavigator routes={this.routes}/>;
  }
}

export default App;
