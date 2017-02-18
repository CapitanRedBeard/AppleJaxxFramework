import { urlPost } from "./api"
import { resolveBody } from './resolveBindings'
import { Navigation } from 'react-native-navigation'
import { getSpecificScreen } from './navigation'

const EVENT_TYPES = {
  TOGGLE: "toggleDrawer",
  URL_POST: "urlPost",
  RESET_TO: "resetTo",
  PUSH: "push",
  POP: "pop"
}

function fireEvent(eventType, params, navigator, pages, bindings) {
  console.log(`params`, getSpecificScreen(pages, params));
  switch(eventType) {
    case EVENT_TYPES.TOGGLE:
      navigator.toggleDrawer(params);
      break;
    case EVENT_TYPES.URL_POST:
      let resolvedParams = _.clone(params);
      resolvedParams.body = resolveBody(params.body, bindings);
      urlPost(resolvedParams);
      break;
    case EVENT_TYPES.RESET_TO:
      navigator.resetTo(Navigation.getRegisteredScreen(params));
      break;
    case EVENT_TYPES.PUSH:
      navigator.push(getSpecificScreen(pages, params, bindings));
      break;
    case EVENT_TYPES.POP:
      navigator.pop(Navigation.getRegisteredScreen(params));
      break;
    default:
      console.warn("EventType, " + eventType + " doesn't exist");
      break;
  }
}

function handleOnPress(events, navigator, pages, bindings) {
  const onPress = getValue(events, "onPress");
  if(onPress) {
    const { eventType, params} = onPress
    return onPressCallback = () => fireEvent(eventType, params, navigator, pages, bindings);
  }
  return null;
}


export {
  fireEvent,
  handleOnPress
}
