import React, { Component } from 'react';
import { Button } from 'native-base';
import { navigatePush } from '../../actions/navigatePush'

const {
  View
} = React;
// import defaultStyles from './styles';

export default class ButtonComponent extends Component {

  static propTypes = {
    eval: React.PropTypes.shape({}),
    // resources: React.PropTypes.object.isRequired,
    style: React.PropTypes.object.isRequired,
    onPress: React.PropTypes.object
  }

  onPress() {
    console.log("Yo", this.props)
    this.props.onPress(this.props.eval);
  }

  render() { // eslint-disable-line class-methods-use-this
    // const {logo, logoText} = this.props.resources;
    // const overrideStyles = this.props.style;
    return <Button onPress={() => {this.onPress()}}> Click Me! </Button>;
  }
}
