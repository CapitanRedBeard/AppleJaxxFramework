import React, { Component } from 'react';
import Button from './button/button';
import Text from './text/text';
import { View, TouchableHighlight } from 'react-native';

const components = {
  "button": Button,
  "text": Text,
  "thumbnail": Text
};


export default class BaseComponent extends Component {

  static propTypes = {
    type: React.PropTypes.string,
    onButtonPress: React.PropTypes.func
  }
    //
    // setNativeProps(props) {
    //     this._node.setNativeProps(props);
    // }
    // 
    // onPress() {
    //   console.log("Navigating to", this.props)
    //   this.props.onButtonPress("login_page");
    // }

  render() { // eslint-disable-line class-methods-use-this

    let Instance = components[this.props.type];
    return (

        <TouchableHighlight onPress={this.onPress}>
          <View style={{borderColor: "red", borderWidth: 1}}>
              <Instance onButtonPress={this.props.onButtonPress} {...this.props}/>
          </View>
        </TouchableHighlight>
    );
  }
}
