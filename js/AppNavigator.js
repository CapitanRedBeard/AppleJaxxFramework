'use strict'

import React, {PropTypes} from 'react'
import {NavigationExperimental, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import Page from './pages/page';
import { navigatePop } from './actions/navActions'

const {
	CardStack: NavigationCardStack,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental


class AppNavigator extends React.Component {
	render() {
    console.log("props", this.props)
		let { navigationState, backAction } = this.props

		return (
			// Redux is handling the reduction of our state for us. We grab the navigationState
			// we have in our Redux store and pass it directly to the <NavigationCardStack />.
			<NavigationCardStack
				navigationState={navigationState}
				onNavigateBack={backAction}
				style={styles.container}
				direction={navigationState.routes[navigationState.index].key === 'Modal' ?
					'vertical' : 'horizontal'
				}
				renderHeader={props => (
					<NavigationHeader
						{...props}
						onNavigateBack={backAction}
						renderTitleComponent={props => {
							const title = props.scene.route.key
							return <NavigationHeader.Title>{title}</NavigationHeader.Title>
						}}
						// When dealing with modals you may also want to override renderLeftComponent...
					/>
				)}
				renderScene={this._renderScene}
			/>
		)
	}


	_renderScene({scene}) {
		const { route } = scene
    console.log("Rendering the scene: ", scene);
    return <Page key={route.key} {...route}/>;

	}
}

//   _renderScene(props) { // eslint-disable-line class-methods-use-this
//     console.log("_renderScene", props.scene.route.type)
//     console.log("nav", props)
//     console.log("this.props", this.props)
//     return <Page {...props.scene.route}/>;
//   }
//

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
//
// import React, { Component } from 'react';
// import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
// import { connect } from 'react-redux';
// import { actions } from 'react-native-navigation-redux-helpers';
// import Page from './pages/page';
// import _ from 'underscore';
//
// const {
//   popRoute,
//   pushRoute
// } = actions;
//
// const {
//   CardStack: NavigationCardStack,
// } = NavigationExperimental;
//
// class AppNavigator extends Component {
//
//   static propTypes = {
//     popRoute: React.PropTypes.func,
//     navigation: React.PropTypes.shape({
//       key: React.PropTypes.string,
//       routes: React.PropTypes.array,
//     })
//   }
//
//   componentDidMount() {
//     BackAndroid.addEventListener('hardwareBackPress', () => {
//       const routes = this.props.navigation.routes;
//       this.props.popRoute(this.props.navigation.key);
//       return true;
//     });
//   }
//
//   popRoute() {
//     this.props.popRoute();
//   }
//
//   _renderScene(props) { // eslint-disable-line class-methods-use-this
//     console.log("_renderScene", props.scene.route.type)
//     console.log("nav", props)
//     console.log("this.props", this.props)
//     return <Page {...props.scene.route}/>;
//   }
//
//   render() {
//     return (
//         <NavigationCardStack
//           navigationState={this.props.navigation}
//           renderOverlay={this._renderOverlay}
//           renderScene={this._renderScene}
//         />
//           );
//   }
// }
//
// function bindAction(dispatch) {
//   return {
//     popRoute: key => dispatch(popRoute(key)),
//     pushRoute: key => dispatch(pushRoute(key))
//   };
// }
//
// const mapStateToProps = state => ({
//   navigation: state.cardNavigation
// });
//
// export default connect(mapStateToProps, bindAction)(AppNavigator);
