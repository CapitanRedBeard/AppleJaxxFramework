
import { cardStackReducer } from 'react-native-navigation-redux-helpers';
import frame from '../../frames/sampleSchema.json';


var initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'splashscreen0',
      type: 'splashscreen',
      index: 0,
    },
    {
      key: 'blankpage0',
      type: 'blankscreen',
      index: 1,
    }
  ],
};

function getInitialState(frame){
  console.log(frame);
  this.routes = [];
  initialState.routes = frame.pages ?
  _.each(frame.pages, (page, index) => {
    this.routes.push( {index: index, ...page})
  }) : initialState.routes;

  console.log(initialState.routes);
  return initialState
}

module.exports = cardStackReducer(getInitialState(frame));
