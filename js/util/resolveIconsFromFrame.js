/* eslint-disable import/prefer-default-export */
const Icon = require('react-native-vector-icons/Ionicons');
const RSVP = require('rsvp');

function resolveIconsFromFrame(frame) {
  const tabIconPromises = {};
  iconNames = _findIcons(frame);
  _.each(iconNames, (name) => {
    tabIconPromises[name] = Icon.getImageSource(name, 30)
  });

  return new Promise(function (resolve, reject) {
    RSVP.hash(tabIconPromises).then(function(results) {
      console.log(results.users)
      resolve(results);
    });
  });
}

function _findIcons(frame){
	return _findIconsHelper(frame, []);
}

function _findIconsHelper(frame, list) {
  if (!frame) return list;
  if (frame instanceof Array) {
    for (var i in frame) {
        list = list.concat(_findIconsHelper(frame[i], []));
    }
    return list;
  }
  if (frame["icon"]) list.push(frame["icon"]);

  if ((typeof frame == "object") && (frame !== null) ){
	  var children = Object.keys(frame);
	  if (children.length > 0){
	  	for (i = 0; i < children.length; i++ ){
	        list = list.concat(_findIconsHelper(frame[children[i]], []));
	  	}
	  }
  }
  return list;
}

export {
  resolveIconsFromFrame
}
