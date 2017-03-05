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

import Button from "../button/button"

// Important to note that we resolve all bindings on this.page
// then pass down immutable objects
function getCurrentParams (state) {
    if (state.routes) {
        return getCurrentParams(state.routes[state.index]);
    }
    return state.params || {};
}


getHeaderButtons = (buttons) => {
  const buttonComponents = _.map(buttons, (button, index) => {
      if(button.type == Button.TYPE) {
        return <Button key={button.type + index} {...button} />
      }
  });
  return buttons ? <View>{buttonComponents}</View> : null;
}

class Page extends Component {

  static navigationOptions = {
      header: ({ state, setParams}) => {
        const header = getValue(state, "params.header");
        if(header) {
            const { title, style, titleStyle, tintColor, right, visible } = header;

            return {
              title: title, //String or React Element used by the header. Defaults to scene title
              // visible: visible, //Boolean toggle of header visibility. Only works when headerMode is screen.
              // backTitle: backTitle, //Title string used by the back button on iOS or null to disable label. Defaults to scene title
              right: getHeaderButtons(right), //React Element to display on the right side of the header
              // left: null, //React Element to display on the left side of the header
              style: style, //Style object for the header
              titleStyle: titleStyle, //Style object for the title component
              tintColor: tintColor, //Tint color for the header
            }
          }
        }
      }



  static propTypes = {
    navigation: React.PropTypes.shape({}),
  }

  constructor(props) {
    super(props);
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

  componentDidMount () {
    this.props.navigation.setParams(this._getCurrentPage());
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
                          bindingData={page.bindingData}
                          {...component}
                          pages={this.props.pages}
                          navigation={this.props.navigation}
                          updateBinding={this.props.updateBinding}/>)
    });
    return components;
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
