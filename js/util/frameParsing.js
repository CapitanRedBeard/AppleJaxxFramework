/* eslint-disable import/prefer-default-export */
const Icon = require('react-native-vector-icons/Ionicons');
const RSVP = require('rsvp');

function populateIconsFromTabs(tabs) {
  const tabIconPromises = {};

  _.each(tabs, (tab) => {
    tabIconPromises[tab.icon] = Icon.getImageSource(tab.icon, 30)
  });

  return new Promise(function (resolve, reject) {
    RSVP.hash(tabIconPromises).then(function(results) {
      console.log(results.users)
      resolve(results);
    });
  });
}

export {
  populateIconsFromTabs
}
