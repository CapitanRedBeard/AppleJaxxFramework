import React, { Component } from 'react';
import Button from './button/button';
import Text from './text/text';
import Thumbnail from './thumbnail/thumbnail';
import List from './list/list';
import Icon from './icon/icon';
import Badge from './badge/badge';
import Input from './input/input';
import Image from './image/image';
import Cards from './cards/cards';


import { View } from 'react-native';
import baseTheme from '../themes/base-theme'
import resolveBindings from '../util/resolveBindings'

const components = {
  "button": Button,
  "text": Text,
  "thumbnail": Thumbnail,
  "list": List,
  "icon": Icon,
  "badge": Badge,
  "input": Input,
  "image": Image,
  "cards": Cards
};


export default class BaseComponent extends Component {
  propTypes: {
      type: React.PropTypes.string,
      bindingData: React.PropTypes.array
  }

  prepareRootProps() {
      return this.props.bindingData ? resolveBindings(this.props): this.props;
  }

  render() {
    let Instance = components[this.props.type];

    return (
      // <View style={styles.instanceWrapper}>
        <Instance theme={baseTheme} {...this.prepareRootProps()}/>
      // </View>
    );
  }
}

const styles = {
  instanceWrapper: {
    // justifyContent: "center",
    // flexDirection:'row',
    // alignItems: "center",
    // alignSelf: "stretch",
    // padding: 5,
    // borderColor: "green",
    // borderWidth: 1
  }
}
