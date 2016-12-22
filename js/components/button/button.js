import React, { Component } from 'react';
import { Button } from 'native-base';
import { navigatePush } from '../../actions/navigatePush'

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
    // const {logo, logoText} = this.props.resources;
    // const overrideStyles = this.props.style;
    return <Button onPress={() => this.props.onButtonPress(this.props.eval)}> Click Me! </Button>
  }
}
