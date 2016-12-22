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
    eval: React.PropTypes.string,
    // resources: React.PropTypes.object.isRequired,
    onButtonPress: React.PropTypes.func
  }


  onPress() {
    // console.log("Navigating to", this.props.eval)
    this.props.onButtonPress("login_page");
  }

  render() { // eslint-disable-line class-methods-use-this
    const {buttonText, button} = this.props.style;
    const overrideButtonStyles = [styles.button, button];
    const overrideButtonTextStyles = [styles.text, buttonText];
    console.log("overrideButtonStyles", overrideButtonStyles)
    console.log("overrideButtonTextStyles", overrideButtonTextStyles)
    return <Button style={overrideButtonStyles} textStyle={buttonText} onPress={() => this.props.onButtonPress(this.props.eval)}> Click Me! </Button>
  }
}

const styles = {
  text: {
    fontSize: 12,
    fontFamily: "Futura-CondensedMedium",
    // color: textColor
  },
  button: {
    backgroundColor: "blue"
    // color: textColor
  }
}
