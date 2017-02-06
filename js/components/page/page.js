import { connect } from 'react-redux'

import React, { Component } from 'react';
import { Text, ScrollView, View, AlertIOS, StyleSheet, Image} from 'react-native';
import BaseComponent from '../../components/baseComponent'
import _ from 'underscore'
import {Container, Content} from 'native-base';
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
    this.page = this._findPage(this.props.pages);
    // this._evaulateDataSection(this.props.data);
    this._setNavButtons(this.props);
    this.props.navigator.setOnNavigatorEvent((event) => handleNavEval(event, navigator, this.navButtonEvents));
  }

  _findPage(pages) {
      return _.find(pages, (page) => { return page.key == this.props.testID });
  }

  _setNavButtons(props) {
    const { navigator, icons }  = props
    const { navigatorButtons } = this.page;


    if(navigatorButtons && ( navigatorButtons.leftButtons || navigatorButtons.leftButtons)) {
      const leftButtons = [];
      const rightButtons = [];
      this.navButtonEvents = {};
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
  //
  // async _evaulateDataSection() {
  //   _.each(this.props.data, (data) => {
  //
  //     const {url, returnPath, binding} = data;
  //     // _getAndAddURLDataSource(this.props.dispatch, url, returnPath, binding)
  //     // getURL(url).then(response => console.log("Derp", response))
  //     getURL(url).then((res) => { return this.props.dispatchAddDataSource(res, returnPath, binding)});
  //     // console.log("Dater", data, returnPath, binding);
  //   });
  // }

  _getComponents() {
    let components = [];
    _.each(this.page.components, (component, index) => {
      components.push(<BaseComponent key={component.type + index} bindings={this.props.bindings} {...component}/>)
    });
    return components;
  }

  render() { // eslint-disable-line class-methods-use-this
    let overridedStyles = [styles.container, this.page.style];
    const backgroundImageProp = this.page.backgroundImage ? {source: {uri: this.page.backgroundImage}} : null;
    console.log("BackgroundImage: ", backgroundImageProp, this.page)

    return (
      <Container style={styles.container}>
          <Image {...backgroundImageProp} style={styles.backgroundImage}>
            <View style={overridedStyles}>
                {this._getComponents()}
            </View>
          </Image>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pages: state.frameReducers.frameState.pages,
    icons: state.iconsReducers.icons,
    bindings: state.bindingReducers.bindingState
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
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
