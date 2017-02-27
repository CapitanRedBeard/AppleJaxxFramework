import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Text, ScrollView, View, AlertIOS, StyleSheet, Image} from 'react-native';
import BaseComponent from '../../components/baseComponent'
import _ from 'underscore'
import {Container, Content} from 'native-base';

import { addDataSource } from '../../actions/dataSource'
import { updateBinding } from '../../actions/bindingActions';

import { fireEvent, handleOnPress } from '../../util/events'
import getURL from '../../util/api';
import getValue from '../../util/getValue';
import baseTheme from '../../themes/base-theme'
import { resolvePage } from '../../util/resolveBindings';

// Important to note that we resolve all bindings on this.page
// then pass down immutable objects

class Page extends Component {

  static navigationOptions = {
      // title: ({ state }) => {
      //   console.log("navigationOptions: ", state)
      //   return state.params && state.params.total ? state.params.totalCharge : ''
      // },
      title: ({state}) => {
        console.log("navigationOptions: ", getValue(state, "params.title", ""))
        return getValue(state, "params.title", "");
      },
      // header: ({ state, setParams}) => {
      //   right: null,  //React element
      //   left: null
      // }
  }


  static propTypes = {
    navigation: React.PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    console.log("This.props", this.props)
    this.handleNavEval = this.handleNavEval.bind(this);
  }

  getInitialStyle() {
    return {
      container: {
        flex: 1,
        backgroundColor: baseTheme.backgroundColor
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
  }

  handleNavEval(event){
    const { navigator, pages, bindings} = this.props;
    if (event.type == 'NavBarButtonPress') {
        const events = this.navButtonEvents[event.id];
        handleOnPress(events, navigator, pages, bindings)();
    }
  }

  // componentWillMount() {
  //   const {pages, bindings, navigator} = this.props
  //
  //   this.page = resolvePage(this._findPage(pages), bindings);
  //   console.log("Page", this.page)
  //
  //   // this._evaulateDataSection(data);
  //   this._setNavButtons(this.props, page);
  //   navigator.setOnNavigatorEvent(this.handleNavEval);
  // }
  componentWillReceiveProps(nextProps) {
    // let params = getValue(nextProps, "navigation.state.params")
    // if (!getValue(nextProps, "navigation.state.params")) {
    //   let title = getValue(this.props, "screenProps.title")
    //   console.log("Setting props ", { title: title})
    //   this.props.navigation.setParams({ title: title});
    // }
  }

  _setNavButtons(props, page) {
    const { navigator, icons }  = props
    const { navigatorButtons } = page;


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
        this.navButtonEvents[button.id] = button.events;
      });
      _.each(navigatorButtons.rightButtons, (button) => {
        swapOutIcon(button, rightButtons)
        this.navButtonEvents[button.id] = button.events;
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

  _getComponents(page) {
    let components = [];
    _.each(page.components, (component, index) => {
      components.push(<BaseComponent
                          key={component.type + index}
                          bindingData={this.props.bindingData}
                          {...component}
                          pages={this.props.pages}
                          navigation={this.props.navigation}
                          updateBinding={this.props.updateBinding}/>)
    });
    return components;
  }

  // _findPage(pages) {
  //   const id = getValue(this.props, "navigation.state.routeName");
  //   return _.find(pages, (page) => { return page.key === id });
  // }

  render() { // eslint-disable-line class-methods-use-this
    const {pages, bindings, navigation, screenProps} = this.props
    const page = resolvePage(getValue(navigation, "state.params", screenProps), bindings);
    console.log("Page props", this.props, page)

    let overridedStyles = [this.getInitialStyle().container, page.style];
    const backgroundImageProp = page.backgroundImage ? {source: {uri: page.backgroundImage}} : null;

    // this._evaulateDataSection(data);
    // this._setNavButtons(this.props, page);
    // navigator.setOnNavigatorEvent(this.handleNavEval);
    // navigator.setTitle(page);

    return (
      <Container style={this.getInitialStyle().container}>
          <Image {...backgroundImageProp} style={this.getInitialStyle().backgroundImage}>
              <View style={overridedStyles}>
                  {this._getComponents(page)}
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
    },
    updateBinding: (binding, value) => {
      dispatch(updateBinding(binding, value))
    }
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
