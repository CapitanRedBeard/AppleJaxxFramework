import React, { Component } from 'react';
import { Icon } from 'native-base';
import baseTheme from '../../themes/base-theme'

const DEFAULT_ATTRIBUTES = [
  "style": {},
  "name": "ios-help-empty"
];

export default class IconComponent extends Component {
  prepareRootProps() {
    const {style, name} = this.props;
    const iconName = name || DEFAULT_ATTRIBUTES.name;
    return {name: iconName, style: style, theme: baseTheme}
  }

  render() { // eslint-disable-line class-methods-use-this
    return <Icon {...this.prepareRootProps()}/>;
  }
}

const styles = {
  icon: {
  }
}
