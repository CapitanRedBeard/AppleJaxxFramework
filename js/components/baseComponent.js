import React, { Component } from 'react';
import Button from './button/button';
import Text from './text/text';
import Thumbnail from './thumbnail/thumbnail';
import List from './list/list';
import { View } from 'react-native';
import baseTheme from '../themes/base-theme'

const components = {
  "button": Button,
  "text": Text,
  "thumbnail": Thumbnail,
  "list": List
};

export default class BaseComponent extends Component {

  static propTypes = {
    type: React.PropTypes.string,
    onButtonPress: React.PropTypes.func
  }

  render() { 
    let Instance = components[this.props.type];
    return (
          <View style={styles.instanceWrapper}>
              <Instance theme={baseTheme} {...this.props}/>
          </View>
    );
  }
}

const styles = {
  instanceWrapper: {
    justifyContent: "center",
    flexDirection:'row',
    alignItems: "center",
    alignSelf: "stretch",
    padding: 5,
    // borderColor: "red",
    // borderWidth: 2
  }
}
