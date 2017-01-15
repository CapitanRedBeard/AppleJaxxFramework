import React, {Component} from 'react'
import { Provider } from 'react-redux'

import { registerScreens } from './util/registerScreens';
import { resolveIconsFromFrame } from './util/resolveIconsFromFrame';
import configureStore from './configureStore';
import { Navigation } from 'react-native-navigation';
import frame from './frame/frame.json';
import getValue from './util/getValue';
import { addIconSources } from './actions/icons'
import { updateFrame } from './actions/frameActions'
let store = configureStore();
registerScreens(store, Provider, frame);

store.dispatch(updateFrame(frame));

resolveIconsFromFrame(frame).then((icons) => {
  startApp(frame, icons);
}).catch((error) => {
  console.error("Couldn't load all icons", error);
});

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

function startApp(frame, icons) {
  //map titles & styles to keys
  store.dispatch(addIconSources(icons));

  let pages = {};
  _.each(frame.pages, (page) => {
    pages[page.key] = page;
  });

  const keys = _.map(frame.pages, page => page.key);
  const footerTabs = getValue(frame, "footer.tabs")

  let drawer = getValue(frame, "drawer")
  drawer.left.passProps = pages[drawer.left.screen];
  drawer.right.passProps = pages[drawer.right.screen];

  console.log("#####DRAER", drawer, icons)
  if(footerTabs) {
    let tabs = [];
    _.each(footerTabs, (tab) => {
      const page = pages[tab.screen];
      let node = {
        label: tab.label,
        screen: tab.screen,
        icon: icons[tab.icon],
        title: page.title,
        subtitle: page.subtitle,
        navigatorStyle: page.navigatorStyle,
        passProps: page
      };
      tabs.push(node);
    });
    console.log("#####DRAER", drawer)
    Navigation.startTabBasedApp({tabs: tabs, tabStyles: getValue(frame, "footer.style"), drawer: drawer});
  }else {
    let screen = {
      title: titles[0],
      screen: frame.pages[0].key
    }
    Navigation.startSingleScreenApp({screen, drawer: drawer});
  }
}
