import React, { Component } from 'react';
import { Button } from 'native-base';
import { navigatePush } from '../../actions/navigatePush'
import { textColor } from '../../themes/base-theme'

import {
  View
} from "react-native";
// import defaultStyles from './styles';

export default class ButtonComponent extends Component {

  static propTypes = {
    eval: React.PropTypes.object,
    // resources: React.PropTypes.object.isRequired,
    push: React.PropTypes.func,
    pop: React.PropTypes.func,
    jump: React.PropTypes.func,
    reset: React.PropTypes.func,
  }

  onButtonPress() {
    var {type, index, key} = this.props.eval;
    switch(type){
      case "push":
        this.props.push(key);
        break;
      case "pop":
        this.props.pop();
        break;
      case "jump":
        this.props.jump(key);
        break;
      case "reset":
        this.props.reset(index);
        break;
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    const {buttonText, button} = this.props.style;
    const text = this.props.text;
    const overrideButtonStyles = [styles.button, button];
    const overrideButtonTextStyles = [styles.text, buttonText];
    let component;
    let attributes = {};
    _.each(this.props.attributes, (attribute) => {
      attributes[attribute] = true;
    });


    if(_.size(attributes)){
      component = <Button {...attributes} textStyle={buttonText} onPress={() => this.onButtonPress()}>{text}</Button>;
    }else {
      component = <Button style={overrideButtonStyles} textStyle={buttonText} onPress={() => this.onButtonPress()}>{text}</Button>;
    }
    // const component = <Button style={overrideButtonStyles} textStyle={buttonText} onPress={() => this.props.onButtonPress(this.props.eval)}> Click Me! </Button>;
    // const component = <Button rounded danger> Danger </Button>;
    // console.log("Hmm", component, attributes)

    return component;
  }
}

const styles = {
  text: {
  },
  button: {
  }
}
