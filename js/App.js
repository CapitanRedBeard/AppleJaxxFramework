import React, { Component } from 'react';
import AppNavigator from './AppNavigator';
import frame from './frame.json';
class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount

  render() {
    return <AppNavigator frame={frame}/>;
  }
}

export default App;
