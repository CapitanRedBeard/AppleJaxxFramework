/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

import Page from '../components/page/page';

export function registerScreens(store, Provider, frame) {
  _.each(frame.pages, (page)=> {
    Navigation.registerComponent(page.key, () => Page, store, Provider);
  })
}
