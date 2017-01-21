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
    navigator: React.PropTypes.object
  }

  render() { // eslint-disable-line class-methods-use-this
    // const {buttonText, button} = this.props.style;
    const text = this.props.text;
    // const overrideButtonStyles = [styles.button, button];
    // const overrideButtonTextStyles = [styles.text, buttonText];
    // let componentStyles = {style: overrideButtonStyles, textStyles: overrideButtonTextStyles};
    let attributes = {};

    _.each(this.props.attributes, (attribute) => {
      if(ATTRIBUTES.indexOf(attribute) > -1) attributes[attribute] = true;
    });

    // let componentAttributes = _.size(attributes) ? attributes : componentStyles;
    return <Button theme={baseTheme} {...attributes}
              // {...componentStyles}
              // onPress={
              // () => handleButtonEval(this.props.event, this.props.navigator)
            // }
            >
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
