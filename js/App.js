import React, {Component} from 'react'
import { Provider, connect } from 'react-redux'

// TODO import AsyncStorange


import {
  NavigationActions,
  addNavigationHelpers,
  StackNavigator,
  DrawerNavigator
} from 'react-navigation';

import { registerScreens } from './util/registerScreens';
import { resolveIconsFromFrame } from './util/resolveIconsFromFrame';
import configureStore from './configureStore';
// import { Navigation } from 'react-native-navigation';
import frame from './frame/frame.json';
import getValue from './util/getValue';
import { addIconSources } from './actions/icons'
import { updateFrame } from './actions/frameActions'
import { setInitialBindings } from './actions/bindingActions'
import { updateGeolocation } from './actions/geolocationActions'
import Page from './components/page/page';
import { resolvePage } from './util/resolveBindings';
import Drawer from 'react-native-drawer';

import OAuthManager from 'react-native-oauth';

const manager = new OAuthManager('firestackexample')
manager.configure({
  twitter: {
    consumer_key: '	7KtDhU4s0uHQan28niYIWpHcI',
    consumer_secret: '88eZiPNSCGo8ZWLSGYv7ZXOQOEr6T08EXGgH59JRlBLwVlOG32'
  }
});

manager.authorize('twitter', {scopes: 'profile+email'})
.then(resp => console.log('Your users ID', resp))
.catch(err => console.log('There was an error', err));
const store = configureStore();

//Initialize Frame
store.dispatch(updateFrame(frame));

//Initialize Bindings
store.dispatch(setInitialBindings(frame.bindings));

//Initialize Icons
resolveIconsFromFrame(frame).then((icons) => {
  store.dispatch(addIconSources(icons));
})

//Initialize geolocation
navigator.geolocation.getCurrentPosition(
   (position) => {
      var initialPosition = JSON.stringify(position);
      store.dispatch(updateGeolocation(position));
   },
   (error) => alert(error.message),
   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
);
//TODO ??
// frame = resolveBindings(frame);

// registerScreens(store, Provider, frame);

class AppNavigator extends Component {
  render() {
      console.log(":IUEFFRAME", this.props)
      let { frame, bindings } = this.props
      let pages = {};
      _.each(frame.pages, (page) => {
        pages[page.key] = page;
      });

      const keys = _.map(frame.pages, page => page.key);
      const navigation = getValue(frame, "navigation", {})
      const { roots, drawer, headerMode } = navigation;

      const navigationPages = {};
      _.each(keys, (key) => {
        navigationPages[key] = {screen: Page}
      })

      const AppNav = StackNavigator(
        navigationPages,
      {
        initialRouteName: pages[keys[0]].key,
        initialRouteParams: pages[keys[0]],
        headerMode
      });

      const appStack = <AppNav
                screenProps={pages[keys[0]]}/>

      if(drawer) {
        const screenProps = _.find(frame.pages, (page) => { return page.key == drawer.screen });
        // return <Drawer open={this.props.drawerState.open} {...drawer.drawerProps}
        //                content={<Page screenProps={screenProps}/>}>
        //                   {appStack}
        //         </Drawer>
        const DrawerNav = DrawerNavigator({
                  AppNav: {
                    screen: AppNav,
                  },
                  Drawer: {
                    screen: Page,
                  }
                },
                );
        return <DrawerNav
                  screenProps={pages[keys[0]]}/>
      }
      return appStack

      //
      // if(footerTabs) {
      //   let tabs = [];
      //   _.each(footerTabs, (tab) => {
      //     const page = pages[tab.screen];
      //     let node = {
      //       label: tab.label,
      //       screen: tab.screen,
      //       // icon: icons[tab.icon],
      //       navigatorStyle: page.navigatorStyle
      //     };
      //     tabs.push(node);
      //   });
      //   //Introduce animation type for navigation with animationType: 'slide-down'
      //   // Navigation.startTabBasedApp({tabs: tabs, tabStyles: getValue(frame, "footer.style"), drawer: drawer});
      // }else {
      //   // let screen = {
      //   //   screen: frame.pages[0].key,
      //   //   navigatorStyle: frame.pages[0].navigatorStyle
      //   // }
      //   // Navigation.startSingleScreenApp({screen, drawer: drawer});
      //   return StackNavigator(
      //     navigationPages,
      //   {
      //     initialRouteName: pages[keys[0]].title,
      //     initialRouteParams: { page: pages[keys[0]] }
      //   });
      //
  }
}

const AppWithNavigationState = connect(state => ({
    frameState: state.frameReducers.frameState,
    bindingState: state.bindingReducers.bindingState,
    drawerState: state.drawerReducers.drawerState
}))(({ dispatch, frameState, bindingState, drawerState }) => (
  <AppNavigator frame={frameState}
                bindings={bindingState}
                drawerState={drawerState}
                navigation={addNavigationHelpers({ dispatch })} />
));


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}


// class App extends React.Component {
//   store = configureStore()
//   //
//   // componentDidMount() {
//   //   persistStore(this.store, { storage: AsyncStorage });
//   // }
//
//   render() {
//     return (
//       <Provider store={this.store}>
//         <AppWithNavigationState />
//       </Provider>
//     );
//   }
// }

//******** DRAWER TYPE ***********
// drawer: {
//     type: "MMDrawer",
//     animationType: 'door',
//     animationType: 'parallax',  // I like this one
//     animationType: 'slide',  // Default
//     animationType: 'slide-and-scale',
//     type: "TheSideBar",
//     animationType: 'airbnb',
//     animationType: 'facebook',
//     animationType: 'luvocracy',
//     animationType: 'wunder-list',  // A more subtle parallax
//     left: {
//       screen: 'example.SideMenu',
//     }
//   }

// ******* SCREEN ****************
// label: 'Two',
// screen: 'example.SecondTabScreen',
// icon: require('../img/two.png'),
// selectedIcon: require('../img/two_selected.png'),
// title: 'Screen Two',
// navigatorStyle: {
//   tabBarBackgroundColor: '#4dbce9',
// }

// ******* PARAMS ****************
// tabs: [],
// tabsStyle: {},
// drawer: {
//            left: {
//                screen: {SCREEN}
//            },
//            right: {
//                screen: {SCREEN}
//            },
//            animationType: ["slide", "door", "parallax", "slide-and-scale"],
//            type: "MMDrawer",
//            style: {
//                 "leftDrawerWidth": 50, //percents
//                 "rightDrawerWidth": 50, //percents
//                 "contentOverlayColor": "#BBB", //color
//                 "drawerShadow": false
//            },
//            disableOpenGesture: ?
//         },
// subtitle: '',
// passProps: {}

// ******* APP Types ****************
// Navigation.startSingleScreenApp({
//   screen: {SCREEN}
// });

// Navigation.startTabBasedApp([{SCREEN}]);

// function startApp(frame) {
//   //map titles & styles to keys
//
//
// }
