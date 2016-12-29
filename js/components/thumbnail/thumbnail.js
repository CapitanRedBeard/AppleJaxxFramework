import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { textColor } from '../../themes/base-theme'

// import defaultStyles from './styles';


const emptyThumbnailSource = ""

const DEFAULT_ATTRIBUTES = [
  "source": emptyThumbnailSource,
  "square": false,
  "size": 30
];

export default class ThumbnailComponent extends Component {

  render() { // eslint-disable-line class-methods-use-this
    const {style, attributes} = this.props;

    const componentStyles = [styles.thumbanail, style];
    const componentAttributes = Object.assign(DEFAULT_ATTRIBUTES, attributes)
    return <Thumbnail {...componentAttributes} style={componentStyles}/>;
  }
}

const styles = {
  thumbnail: {
  }
}
