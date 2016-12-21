import React, { Component } from 'react';
import { Text } from 'native-base';
// import defaultStyles from './styles';

export default class TextComponent extends Component {

  static propTypes = {
    // navigator: React.PropTypes.shape({}),
    // resources: React.PropTypes.object.isRequired,
    // style: React.PropTypes.object.isRequired
  }

  render() { // eslint-disable-line class-methods-use-this
    // const {logo, logoText} = this.props.resources;
    // const overrideStyles = this.props.style;
    return <Text> Click Me! </Text>;
  }
}
