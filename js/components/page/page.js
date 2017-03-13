import { connect } from 'react-redux'
import React, { Component } from 'react';
import { Text, ScrollView, View, AlertIOS, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import BaseComponent from '../../components/baseComponent'
import _ from 'underscore'
import {Container, Content} from 'native-base';

import { oAuthAuthorize } from '../../actions/dataSourceActions'
import { toggleDrawer, openDrawer, closeDrawer } from '../../actions/drawerActions'
import { updateBinding } from '../../actions/bindingActions';
import Icon from '../icon/icon'
import { fireEvent, handleOnPress } from '../../util/events'
import getValue from '../../util/getValue';
import baseTheme from '../../themes/base-theme'
import { resolvePage } from '../../util/resolveBindings';


import {
  NavigationActions
} from 'react-navigation';


// Important to note that we resolve all bindings on this.page
// then pass down immutable objects
function getCurrentParams (state) {
    if (state.routes) {
        return getCurrentParams(state.routes[state.index]);
    }
    return state.params || {};
}


class Page extends Component {

  static navigationOptions = {
      drawer: ({state}) => {
        // console.log("Drawer State: ", state)
        return {
          label: "Home"
        }
      },

      header: ({ state, setParams}) => {
        const header = getValue(state, "params.header");
        const initialParams = getValue(state, "params.initialParams");
        if(header && initialParams) {
            const { title, style, titleStyle, tintColor, right, left, visible } = header;
            // console.log("HEADP", headerProps.right)
            // console.log("LEFT", left)

            return {
              title, //String or React Element used by the header. Defaults to scene title
              visible: false, //Boolean toggle of header visibility. Only works when headerMode is screen.
              // backTitle: backTitle, //Title string used by the back button on iOS or null to disable label. Defaults to scene title
              right, //React Element to display on the right side of the header
              // left: left, //React Element to display on the left side of the header
              style, //Style object for the header
              // titleStyle: titleStyle, //Style object for the title component
              tintColor, //Tint color for the header
            }
          }
        }
      }



  static propTypes = {
    dispatch: React.PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
    this.handleNavEvent = this.handleNavEvent.bind(this);
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
      },
      drawer: {
        marginLeft: 10,
        marginRight: 10
      }
    }
  }

  handleNavEvent(events){
    const { navigation, pages, bindings, updateBinding, drawerActions, authorize} = this.props;
    const eventDispatchers = {
      updateBinding,
      navigation,
      drawerActions,
      authorize
    }
    handleOnPress(events, eventDispatchers, pages, bindings)();
  }


  //{
  //   header: {
  //     tintColor: 'white'
  //     right: [
  //       {
  //         icon: "icon-name",
  //         iconStyle: {},
  //         text: "Menu",
  //         events: {}
  //       }
  //     ]
  //   }
  // }


  componentDidMount () {
    let page = _.clone(this._getCurrentPage());
    if(page.header) {
      page.header.right = this._setNavButtons(page.header.right, page.header.tintColor)
      page.header.left = this._setNavButtons(page.header.left, page.header.tintColor)

      this.props.navigation.setParams(_.defaults(page, {initialParams: true}));
    }
  }

  _setNavButtons(buttons, tintColor) {
    const buttonComponents = _.map(buttons, (button) => {
      const tintColorProp = {color: tintColor};
      const icon = button.icon ? <Icon key="navIcon" name={button.icon} style={tintColorProp}/> : null
      const text = button.text ? <Text key="navText" style={tintColorProp}>button.text</Text> : null
      return (<TouchableOpacity onPress={() => this.handleNavEvent(button.events)}>
                {icon}
                {text}
              </TouchableOpacity>)
    });
    return buttonComponents ? (<View style={this.getInitialStyle().drawer}>
              {buttonComponents}
            </View>) : undefined;

  }

  _getComponents(components, bindingData) {
    const { updateBinding, navigation, pages, drawerActions, authorize, oAuth } = this.props;
    const eventDispatchers = {
      updateBinding,
      navigation,
      drawerActions,
      authorize
    }
    return _.map(components, (component, index) => {
      return (<BaseComponent
                          key={component.type + index}
                          bindingData={bindingData}
                          {...component}
                          pages={pages}
                          oAuth={oAuth}
                          dispatch={eventDispatchers}/>);
    });
  }

  _getCurrentPage() {
    const {bindings, navigation, screenProps} = this.props;
    return resolvePage(getValue(navigation, "state.params", screenProps), bindings);
  }

  render() { // eslint-disable-line class-methods-use-this
    const page = this._getCurrentPage();

    console.log("Page props", this.props, page)

    let overridedStyles = [this.getInitialStyle().container, page.style];
    const backgroundImageProp = page.backgroundImage ? {source: {uri: page.backgroundImage}} : null;

    // this._evaulateDataSection(data);
    // this._setNavButtons(this.props, page);
    // navigator.setOnNavigatorEvent(this.handleNavEvent);
    // navigator.setTitle(page);

    return (
      <Container style={this.getInitialStyle().container}>
          <Image {...backgroundImageProp} style={this.getInitialStyle().backgroundImage}>
              <View style={overridedStyles}>
                  {this._getComponents(page.components, page.bindingData)}
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
    bindings: state.bindingReducers.bindingState,
    oAuth: state.dataSourceReducers.dataSource
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authorize: (provider, options) => {
      dispatch(oAuthAuthorize(provider, options))
    },
    updateBinding: (binding, value) => {
      dispatch(updateBinding(binding, value))
    },
    drawerActions: {
      toggleDrawer: () => {
        dispatch(toggleDrawer())
      },
      closeDrawer: () => {
        dispatch(closeDrawer())
      },
      openDrawer: () => {
        dispatch(openDrawer())
      }
    }
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
