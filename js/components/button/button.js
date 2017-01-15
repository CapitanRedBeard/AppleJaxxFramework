import React, { Component } from 'react';
import { Button } from 'native-base';
import { textColor } from '../../themes/base-theme'
import onButtonPress from './buttonActions'
import baseTheme from '../../themes/base-theme'

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
    console.log("Button props: ", this.props.navigator)
    return <Button theme={baseTheme} {...componentAttributes} {...componentStyles} onPress={
              () => onButtonPress(this.props.eval, this.props.navigation)
            }>
              {text}
          </Button>;

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
