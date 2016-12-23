import React, { Component } from 'react';
import { Button } from 'native-base';
import { navigatePush } from '../../actions/navigatePush'
import { textColor } from '../../themes/base-theme'

import {
  View
} from "react-native";
// import defaultStyles from './styles';

const ATTRIBUTES = [
  "success",
  "info",
  "warning",
  "danger",
  "disabled",

  "rounded",
  "bordered",
  "transparent",

  "small",
  "large"
];

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
    // console.log("HMMm", this.props.eval)
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
    let componentStyles = {style: overrideButtonStyles, textStyles: overrideButtonTextStyles};
    let attributes = {};

    _.each(this.props.attributes, (attribute) => {
      if(ATTRIBUTES.indexOf(attribute) > -1) attributes[attribute] = true;
    });

    let componentAttributes = _.size(attributes) ? attributes : componentStyles;
    // console.log("HMMm", this.props)

    return <Button {...componentAttributes} {...componentStyles} onPress={() => this.onButtonPress()}>{text}</Button>;

    // const component = <Button style={overrideButtonStyles} textStyle={buttonText} onPress={() => this.props.onButtonPress(this.props.eval)}> Click Me! </Button>;
    // const component = <Button rounded danger> Danger </Button>;
    // console.log("Hmm", component, attributes)

  }
}

const styles = {
  text: {
  },
  button: {
  }
}
