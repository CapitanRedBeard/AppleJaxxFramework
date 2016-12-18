
import React, { Component } from 'react';
import { Container, Content, Thumbnail, Text } from 'native-base';
import defaultStyles from './styles';

const launchscreen = require('../../../images/shadow.png');

export default class SplashPage extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({}),
    resources: React.PropTypes.object.isRequired,
    style: React.PropTypes.object.isRequired
  }

  render() { // eslint-disable-line class-methods-use-this
    console.log("props", this.props);
    let {logo, logoText} = this.props.resources;
    let overrideStyles = this.props.style;


    return (
            <Container>
                <Content style={[defaultStyles.background, overrideStyles.background]}>
                    {logo && <Thumbnail source={"../../images/" + logo.imageSrc} style={[defaultStyles.logo, overrideStyles.logo]} />}
                    {logoText && <Text style={[defaultStyles.logoText, overrideStyles.logoText]}>{logoText.text}</Text>}
                </Content>
            </Container>
    );
  }
}
