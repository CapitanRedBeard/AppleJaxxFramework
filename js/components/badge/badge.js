import React, { Component } from 'react';
import { Badge } from 'native-base';
import baseTheme from '../../themes/base-theme'

const DEFAULT_ATTRIBUTES = [
  {
    style: {},
    textStyle: {},
    count: 0
  }
];

export default class BadgeComponent extends Component {
  prepareRootProps() {
    const {style, textStyle} = this.props;
    return {textStyle: textStyle, style: style, theme: baseTheme}
  }

  render() {
    return <Badge {...this.prepareRootProps()}>{this.props.count}</Badge>;
  }
}

const styles = {
  icon: {
  }
}
