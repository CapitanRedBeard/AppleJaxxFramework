import React, { Component } from 'react';
import { Button } from 'native-base';
import { connect } from 'react-redux'

import { textColor } from '../../themes/base-theme'
import { fireEvent, handleOnPress } from '../../util/events'
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
    navigation: React.PropTypes.object,
    style: React.PropTypes.object,
    textColor: React.PropTypes.object,
    event: React.PropTypes.object,
    theme: React.PropTypes.object
  }
  constructor(props) {
    super(props);
    this.handleButtonEval = this.handleButtonEval.bind(this);
  }

  handleButtonEval(events, navigation, pages, bindings) {
    if(events) {
      let { eventType, params} = events
      fireEvent(eventType, params, navigation, pages, bindings);
    }
  }

  prepareRootProps() {
    const {events, navigation, pages, bindings} = this.props
    const {buttonText, button} = this.props.style;
    const overrideButtonStyles = [styles.button, button];
    const overrideButtonTextStyles = [styles.text, buttonText];
    let attributes = {};
    let onPressCallback = {};
    _.each(this.props.attributes, (attribute) => {
      if(ATTRIBUTES.indexOf(attribute) > -1) attributes[attribute] = true;
    });

    return {
      ...attributes,
      style: overrideButtonStyles,
      textStyles: overrideButtonTextStyles,
      onPress: handleOnPress(events, navigation, pages, bindings)
    }
  }

  render() { // eslint-disable-line class-methods-use-this
    const text = this.props.text;
    return <Button {...this.prepareRootProps()}
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
