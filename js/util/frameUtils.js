import _ from 'underscore';

export function getFrameState(frame) {
  let initialState = {
    key: 'global',
    index: 0,
    routes: []
  };

  this.routes = [];
  initialState.routes = frame.pages ?
  _.each(frame.pages, (page, index) => {
    this.routes.push( {index: index, ...page})
  }) : initialState.routes;
  if(frame.footer) initialState.footer = frame.footer;
  if(frame.drawer) initialState.drawer = frame.drawer;

  return initialState;
}

// Checks if the key in the routes array matches a certain key.
// if so returns the route, else returns false
export function checkAndGetExistingRoute(routes, key) {
  let exists = false;
  _.each(routes, (route) => {
    if(route.key == key) exists = route;
  });
  return exists;
}
