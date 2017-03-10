import { NativeModules } from 'react-native';
import { updateFrame } from '../actions/frameActions'
import { resolveIconsFromFrame } from '../util/resolveIconsFromFrame';
import { setInitialBindings } from '../actions/bindingActions'
import { addIconSources } from '../actions/icons'
import { store, startApp } from '../App';
const wsLocation = 'ws://localhost:9999/client';

if (__DEV__) {
  const ws = new WebSocket(wsLocation);
  ws.onopen = () => {
    console.log(`Websocket opened to ${wsLocation}`);
    ws.send(JSON.stringify({
      action: 'connect',
      data: {
        // Should include meta-data on device type/os version here too
        UUID: NativeModules.SettingsManager.settings.clientUniqueId
      }
    }));
  };

  ws.onmessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.action === 'load') {
      const frame = message.data;
      store.dispatch(updateFrame(frame));
      store.dispatch(setInitialBindings(frame.bindings));
      resolveIconsFromFrame(frame).then((icons) => {
        store.dispatch(addIconSources(icons));
      }).catch(() => {
        console.warn("Couldn't connect to websocket server");
      });
    }
  };

  ws.onerror = (e) => {
    console.error(e);
  }
}
