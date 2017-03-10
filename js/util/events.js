import { urlPost } from "./api"
import { resolveBody } from './resolveBindings'
import { NavigationActions } from 'react-navigation'
import { getSpecificScreen } from './navigation'
import { updateBinding } from '../actions/bindingActions'
const EVENT_TYPES = {
  TOGGLE_DRAWER: "toggleDrawer",
  OPEN_DRAWER: "openDrawer",
  CLOSE_DRAWER: "closeDrawer",
  URL_POST: "urlPost",
  RESET_TO: "resetTo",
  PUSH: "push",
  POP: "pop",
  SETBINDING: "setBinding",
  BACK: "back"
}

function fireEvent(eventType, params, dispatch, pages, bindings) {

  switch(eventType) {
    case EVENT_TYPES.TOGGLE_DRAWER:
      console.log("dispatch", dispatch)
      dispatch.drawerActions.toggleDrawer();
      break;
    case EVENT_TYPES.OPEN_DRAWER:
      dispatch.drawerActions.openDrawer();
      break;
    case EVENT_TYPES.OPEN_DRAWER:
      dispatch.drawerActions.closeDrawer();
      break;
    case EVENT_TYPES.URL_POST:
      let resolvedParams = _.clone(params);
      resolvedParams.body = resolveBody(params.body, bindings);
      urlPost(resolvedParams);
      break;
    case EVENT_TYPES.RESET_TO:
      // navigation.resetTo(Navigation.getRegisteredScreen(params));
      break;
    case EVENT_TYPES.BACK:

      break;
    case EVENT_TYPES.PUSH:
    // NavigationActions.navigate(params, getSpecificScreen(pages, params, bindings));
      dispatch.navigation.navigate(params, getSpecificScreen(pages, params, bindings));
      console.log("Navigating?", NavigationActions, dispatch)

      break;
    case EVENT_TYPES.POP:
      // navigation.pop(Navigation.getRegisteredScreen(params));
      break;
    case EVENT_TYPES.SETBINDING:
      const {binding, bindingValue} = params
      dispatch.updateBinding(binding, bindings[bindingValue]);
      break;
    default:
      console.warn("EventType, " + eventType + " doesn't exist");
      break;
  }
}

function handleOnPress(events, dispatch, pages, bindings) {
  const onPress = getValue(events, "onPress");
  // console.log(`handleOnPress`, arguments);

  if(onPress) {
    const { eventType, params} = onPress
    return () => fireEvent(eventType, params, dispatch, pages, bindings);
  }
  return null;
}


export {
  fireEvent,
  handleOnPress
}
