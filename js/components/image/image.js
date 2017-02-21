import React, { Component } from 'react';
import { View } from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import mergeDeep from '../../util/mergeDeep';

const INDICATORS = {
  default: null,
  bar: Progress.Bar,
  circle: Progress.Circle,
  pie: Progress.Pie,
  snail: Progress.CircleSnail
};

export default class ImageComponent extends Component {

  _getIndicator(indicator) {
    let Indicator = INDICATORS[indicator.type] || null
  }


  getInitialStyle() {
      return {
          image: {
            flex: 1,
            alignSelf: 'stretch',
            width: null,
          }
      }
  }

  prepareRootProps() {
    const {style, indicator, source} = this.props;

    const defaultProps = {
      style: this.getInitialStyle().image,
      source: null
    }
    let computedProps = mergeDeep(this.props, defaultProps);

    if( computedProps.indicator) {

      computedProps.indicator = this._getIndicator(computedProps)
    }
    if( computedProps.source) {
      computedProps.source = {uri: computedProps.source}
    }
    return computedProps
  }

  render() { // eslint-disable-line class-methods-use-this
    const rootProps = this.prepareRootProps();
    return rootProps.source ? <Image {...rootProps}/> : null
  }
}
