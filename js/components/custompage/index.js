import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class CustomPage extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

  componentWillMount() {
    const navigator = this.props.navigator;
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <View style={styles.container}>
        <Text style={styles.text}>custom page</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  }
}