import React, { Component } from 'react';
import { Text } from 'react-native';
import { textColor } from '../../themes/base-theme'
// import defaultStyles from './styles';

export default class TextComponent extends Component {

  static propTypes = {
    style: React.PropTypes.object.isRequired
  }

  render() { // eslint-disable-line class-methods-use-this
    const {style, text} = this.props;
    const overrideStyles = [styles.text, style];
    return <Text style={overrideStyles}>{text}</Text>;
  }
}

const styles = {
  text: {
    fontSize: 12,
    fontFamily: "Futura-CondensedMedium",
    // color: textColor
  }
}
