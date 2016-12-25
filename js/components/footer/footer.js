import React, { Component } from 'react';
import { Text } from 'react-native';
import { textColor } from '../../themes/base-theme'
// import defaultStyles from './styles';
import { Footer, FooterTab, Icon, Button } from 'native-base';
import onButtonPress from '../button/buttonActions'


export default class FooterComponent extends Component {

  static propTypes = {
    footer: React.PropTypes.object.isRequired
  }

  _renderButtons(tabs) {
    let buttons = [];
    _.each(tabs, (tab, index) => {
      // console.log("tab: ", tab, this.props)
      buttons.push(<Button key={"footerTab" + index} onPress={
                () => onButtonPress(tab.eval, this.props.navigation)
              }>
                  {tab.text}
                  <Icon name={tab.icon} />
              </Button>);
    });
    return buttons;
  }

  render() { // eslint-disable-line class-methods-use-this
    // const {style, text} = this.props;
    // const overrideStyles = [styles.text, style];
    // console.log("tabs", this.props)
    // {this._renderButtons(this.props.footer)}

    return (
      <Footer key="Footer">
        <FooterTab>
          {this._renderButtons(this.props.footer.tabs)}
        </FooterTab>
      </Footer>
    )
  }
}

const styles = {
  // tab: {
  //   tabBarTextColor: 12,
  //   tabBarActiveTextColor: "Helvetica Neue",
  //   tabActiveBgColor: textColor
  // }
}
