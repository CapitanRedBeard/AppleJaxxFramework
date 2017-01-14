import React, {Component} from 'react'
import { Provider } from 'react-redux'

import { registerScreens } from './util/registerScreens';
import { populateIconsFromTabs } from './util/frameParsing';
import configureStore from './configureStore';
import { Navigation } from 'react-native-navigation';
import frame from './frame/frame.json';
import getValue from './util/getValue';

let store = configureStore();
registerScreens(store, Provider, frame);

populateIconsFromTabs(getValue(frame, "footer.tabs")).then((icons) => {
  startApp(frame, icons);
}).catch((error) => {
  console.error("Couldn't load all icons", error);
});

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
//            animationType: "slide",
//            type: "MMDrawer",
//            style: {},
//            disableOpenGesture: ?
//         },
// subtitle: '',
// passProps: {}

// ******* APP Types ****************
// Navigation.startSingleScreenApp({
//   screen: {SCREEN}
// });

// Navigation.startTabBasedApp([{SCREEN}]);

function startApp(frame, icons) {
  //map titles & styles to keys
  let titles = {};
  let navigatorStyles = {};
  _.each(frame.pages, (page) => {
    navigatorStyles[page.key] = page.navigatorStyle;
    titles[page.key] = page.title ? page.title : ''
  });

  const keys = _.map(frame.pages, page => page.key);
  const footerTabs = getValue(frame, "footer.tabs")

  if(footerTabs) {
    let tabs = [];
    _.each(footerTabs, (tab) => {
      let node = {
        label: tab.label,
        screen: tab.screen,
        icon: icons[tab.icon],
        title: titles[tab.screen],
        navigatorStyle: navigatorStyles[tab.screen]
      };
      tabs.push(node);
    });
    Navigation.startTabBasedApp({tabs: tabs, tabStyles: getValue(frame, "footer.style")});
  }else {
    let screen = {
      title: titles[0],
      screen: frame.pages[0].key
    }
    Navigation.startSingleScreenApp({screen});
  }
}
