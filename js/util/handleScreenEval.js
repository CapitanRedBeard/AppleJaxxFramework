const EVENT_TYPES = {
  TOGGLE: "toggleDrawer",
  RESET_TO: "resetTo",
  PUSH: "push",
  POP: "pop"
}

export function handleNavEval(event, navigator, allEvents){
  if (event.type == 'NavBarButtonPress') {
    if(allEvents[event.id]) {
      let { eventType, params} = allEvents[event.id];
      _fireEvent(eventType, params, navigator);
    }
  }
};

export function handleButtonEval(event, navigator) {
    let { eventType, params} = event
    _fireEvent(eventType, params, navigator);
};

function _fireEvent(eventType, params, navigator) {
  switch(eventType) {
      case EVENT_TYPES.TOGGLE:
        navigator.toggleDrawer(params);
        break;
      case EVENT_TYPES.RESET_TO:
        navigator.resetTo(params);
        break;
      case EVENT_TYPES.PUSH:
        navigator.push(params);
        break;
      case EVENT_TYPES.POP:
        navigator.pop(params);
        break;
      default:
        console.warn("EventType, " + eventType + " doesn't exist");
        break;

  }
}
