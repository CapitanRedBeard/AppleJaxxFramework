import React, { Component } from 'react';
import { Text } from 'react-native';
import { textColor } from '../../themes/base-theme'
// import defaultStyles from './styles';
import { Footer, FooterTab, Icon, Badge } from 'native-base';
import Button from "../button/button"
export default class FooterComponent extends Component {

  static propTypes = {
    footer: React.PropTypes.object.isRequired
  }

  _renderButtons(tabs) {
    let buttons = [];
    _.each(tabs, (tab, index) => {
      // console.log("tab: ", tab)
      buttons.push(<Button key={"footerTab" + index} eval={tab.eval}>
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
