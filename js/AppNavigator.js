
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import BlankPage from './components/blankpage';
import SplashPage from './components/splashscreen/';
import CustomPage from './components/custompage';
import _ from 'underscore';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    })
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;
      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  popRoute() {
    this.props.popRoute();
  }

  _renderScene(props) { // eslint-disable-line class-methods-use-this
    console.log("_renderScene", props.scene.route.type)
    console.log("nav", props)

    switch (props.scene.route.type) {
      case 'splashscreen':
        return <SplashPage {...props.scene.route}/>;
      case 'custom':
        return <CustomPage {...props.scene.route}/>;
      default:
        return <BlankPage {...props.scene.route}/>;
    }
  }

  render() {
    return (
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
          );
  }
}

function bindAction(dispatch) {
  return {
    popRoute: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
