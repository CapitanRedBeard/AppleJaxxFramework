'use strict'

import React, {PropTypes} from 'react'
import {NavigationExperimental, StyleSheet, View} from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon } from 'native-base';
import Drawer from 'react-native-drawer'
import ControlPanel from './components/drawer/controlPanel.js';
import Page from './pages/page';
import { navigatePop } from './actions/navActions'
import Animated from 'Animated';

import Easing from 'Easing';



const {
  Transitioner: NavigationTransitioner,
	CardStack: NavigationCardStack,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental

const navTransitionSpec = {
  duration: 0,
  easing: Easing.inOut(Easing.ease),
  timing: Animated.timing,
}

class AppNavigator extends React.Component {

  closeControlPanel = () => {
    this._drawer.close()
  };

  openControlPanel = () => {
    this._drawer.open()
  };

	render() {
    // console.log("props", this.props);
    console.log("props", this.props)

		return (
			// Redux is handling the reduction of our state for us. We grab the navigationState
			// we have in our Redux store and pass it directly to the <NavigationCardStack />.
			this.getNavigationTransitioner()
      // this.getNavigationTransitioner()
		)
	}

  getNavigationTransitioner() {
    let { navigationState, backAction } = this.props
    const drawerAttributes = navigationState.drawer ? navigationState.drawer.attributes : {};

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel closeDrawer={this.closeControlPanel}/>}
        {...drawerAttributes}
        tweenHandler={Drawer.tweenPresets.parallax}
        >
          <NavigationTransitioner
            navigationState={navigationState}
            style={styles.container}
            configureTransition={this._configureTransition}
            render={props => (
              // This mimics the same type of work done in a NavigationCardStack component
              <View style={styles.container}>
                <NavigationCard
                  // <NavigationTransitioner>'s render method passes `navigationState` as a
                  // prop to here, so we expand it plus other props out in <NavigationCard>.
                  {...props}
                  // Transition animations are determined by the StyleInterpolators. Here we manually
                  // override the default horizontal style interpolator that gets applied inside of
                  // NavigationCard for a vertical direction animation if we are showing a modal.
                  // (Passing undefined causes the default interpolator to be used in NavigationCard.)
                  style={props.scene.route.key === 'Modal' ?
                        NavigationCard.CardStackStyleInterpolator.forVertical(props) :
                        undefined
                  }
                  onNavigateBack={backAction}
                  // By default a user can swipe back to pop from the stack. Disable this for modals.
                  // Just like for style interpolators, returning undefined lets NavigationCard override it.
                  panHandlers={props.scene.route.key === 'Modal' ? null : undefined }
                  renderScene={(param) => this._renderScene(param, navigationState.footer)}
                  key={props.scene.route.key}
                />
                <NavigationHeader
                  {...props}
                  // onNavigateBack={backAction}
                  {...this.getNavigationHeaderProps(props)}
                  // renderLeftComponent={props => null}
                  // When dealing with modals you may also want to override renderLeftComponent...
                />
              </View>
            )}
          />
      </Drawer>
    );

  }

  wrapContentInDrawer(drawer, content) {


  }

  _configureTransition() {
    return navTransitionSpec;
  }

  _renderMenu(props) {
    return <Button transparent onPress={this.openControlPanel}>
      <Icon name='ios-menu' />
    </Button>
  }

  getNavigationHeaderProps(props) {
    let headerProps = {};
    headerProps.renderTitleComponent = props => {
      const title = props.scene.route.key
      return <NavigationHeader.Title>{title}</NavigationHeader.Title>
    }

    if(!_.isEmpty(props.navigationState.drawer))
      headerProps.renderRightComponent = props => this._renderMenu(props);
    return headerProps;
  }

  getNavigationCardStack() {
    let { navigationState, backAction } = this.props
    console.log("AN1", this.props)

    return <NavigationCardStack
      configureTransition
      navigationState={navigationState}
      onNavigateBack={backAction}
      style={styles.container}
      direction={navigationState.routes[navigationState.index].key === 'Modal' ?
        'vertical' : 'horizontal'
      }
      renderHeader={props => (
        <NavigationHeader
          {...props}
          // style={}
          {...this.getNavigationHeaderProps(props, navigationState.drawer)}
          onNavigateBack={backAction}
          // When dealing with modals you may also want to override renderLeftComponent...
        />
      )}
      renderScene={(param) => this._renderScene(param, navigationState.footer)}
    />
  }

	_renderScene({scene}, footer) {
		const { route } = scene
    console.log("AN2", {scene})
    return <Page key={route.key} {...route} footer={footer}/>;
	}
}

AppNavigator.propTypes = {
	navigationState: PropTypes.object,
	backAction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default connect(
	state => ({
		navigationState: state.navigationState
	}),
	dispatch => ({
		backAction: () => {
			dispatch(navigatePop())
		}
	})
)(AppNavigator)
