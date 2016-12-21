import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BaseComponent from '../../components'
import _ from 'underscore'
export default class Page extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

  componentWillMount() {
    const navigator = this.props.navigator;
    console.log("Nav", this.props);
  }

  getComponents() {
    let components = []
    _.each(this.props.components, (component) => {
      components.push(<BaseComponent {...component}/>)
    });
    return components;
  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <View style={styles.container}>
          {this.getComponents()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey"
  }
}
