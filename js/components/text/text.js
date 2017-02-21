import React, { Component } from 'react';
import { Text } from 'native-base';
import { textColor } from '../../themes/base-theme'
// import defaultStyles from './styles';
import baseTheme from '../../themes/base-theme'

export default class TextComponent extends Component {

  static propTypes = {
    style: React.PropTypes.object,
    text: React.PropTypes.string
  }

  render() { // eslint-disable-line class-methods-use-this
    const {style, text, dataVal} = this.props;
    const textValue = dataVal ? dataVal : text;
    return <Text theme={baseTheme} style={style}>{textValue}</Text>;
  }
}
