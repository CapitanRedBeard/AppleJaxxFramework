import React, { Component } from 'react';
import { Button } from 'native-base';
import { textColor } from '../../themes/base-theme'
import { handleButtonEval } from '../../util/handleScreenEval'
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
    navigator: React.PropTypes.object,
    style: React.PropTypes.object,
    textColor: React.PropTypes.object,
    event: React.PropTypes.object,
    theme: React.PropTypes.object
  }

  prepareRootProps() {
    const {buttonText, button} = this.props.style;
    const overrideButtonStyles = [styles.button, button];
    const overrideButtonTextStyles = [styles.text, buttonText];
    let attributes = {};

    _.each(this.props.attributes, (attribute) => {
      if(ATTRIBUTES.indexOf(attribute) > -1) attributes[attribute] = true;
    });
    return {...attributes, style: overrideButtonStyles, textStyles: overrideButtonTextStyles}
  }

  render() { // eslint-disable-line class-methods-use-this
    const text = this.props.text;
    return <Button {...this.prepareRootProps()}
              onPress={ () => handleButtonEval(this.props.event, this.props.navigator, this.props.bindings) }>
              {text}
          </Button>;
  }
}

const styles = {
  text: {
  },
  button: {
  }
}
