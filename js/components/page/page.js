import { connect, store } from 'react-redux'

import React, { Component } from 'react';
import { Text, ScrollView, View, AlertIOS} from 'react-native';
import BaseComponent from '../../components/baseComponent'
import _ from 'underscore'
import {Container, Content} from 'native-base';
import { navigateJumpToKey, navigatePop, navigatePush, navigateReset } from '../../actions/navActions'
import { addDataSource } from '../../actions/dataSource'
import { handleNavEval } from '../../util/handleScreenEval'
import getURL from '../../util/api';
import getValue from '../../util/getValue';

class Page extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

  componentWillMount() {
    const navigator = this.props.navigator;
    this._evaulateDataSection(this.props.data);
    this._setNavButtons(this.props);
    this.props.navigator.setOnNavigatorEvent((event) => handleNavEval(event, navigator, this.navButtonEvents));
  }


  _setNavButtons(props) {
    let { navigator, icons, navigatorButtons }  = props

    this.navButtonEvents = {};

    if(navigatorButtons && ( navigatorButtons.leftButtons || navigatorButtons.leftButtons)) {
      const leftButtons = []
      const rightButtons = []

      const animated = getValue(props, "navigatorButtons.animated")

      function swapOutIcon(button, list) {
        let newButton = {};
        if(button.icon) newButton.icon = icons[button.icon];
        list.push(_.defaults(newButton, button));
      }

      _.each(navigatorButtons.leftButtons, (button) => {
        swapOutIcon(button, leftButtons)
        this.navButtonEvents[button.id] = button.event;
      });
      _.each(navigatorButtons.rightButtons, (button) => {
        swapOutIcon(button, rightButtons)
        this.navButtonEvents[button.id] = button.event;
      });

      navigator.setButtons({
        leftButtons: leftButtons,
        rightButtons: rightButtons,
        animated: animated
      });
    }


  }

  async _evaulateDataSection() {
    _.each(this.props.data, (data) => {

      const {url, returnPath, binding} = data;
      // _getAndAddURLDataSource(this.props.dispatch, url, returnPath, binding)
      // getURL(url).then(response => console.log("Derp", response))
      getURL(url).then((res) => { return this.props.dispatchAddDataSource(res, returnPath, binding)});
      // console.log("Dater", data, returnPath, binding);
    });
  }

  _getComponents() {
    let components = [];
    _.each(this.props.components, (component, index) => {
      components.push(<BaseComponent key={component.type + index} {...this.props} {...component}/>)
    });
    return components;
  }

  render() { // eslint-disable-line class-methods-use-this
    let overridedStyles = [styles.container, this.props.style];
    return (
      <Container style={styles.container}>
          <View style={{flex: 1}}>
            <ScrollView style={overridedStyles} containerStyleProps={{
            justifyContent: "center",
            alignItems: "center"}}>
                {this._getComponents()}
            </ScrollView>
          </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    frame: state.frameReducers,
    icons: state.iconsReducers.icons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchAddDataSource: (response, returnPath, binding) => {
      dispatch(addDataSource(response, returnPath, binding))
    }
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  content: {
    flex: 1,
    justifyContent: "flex-end"
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
