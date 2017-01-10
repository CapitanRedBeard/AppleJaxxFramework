import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { textColor } from '../../themes/base-theme'
import baseTheme from '../../themes/base-theme'

// import defaultStyles from './styles';


const emptyThumbnailSource = ""

const DEFAULT_ATTRIBUTES = [
  "source": emptyThumbnailSource,
  "square": false,
  "size": 30
];
// {
//   "type": "thumbnail",
//   "style": {
//     "borderColor": "white",
//     "borderWidth": 2
//   },
//   "attributes": {
//     "source": "picture.thumbnail",
//     "size": 50
//   }
// },
export default class ThumbnailComponent extends Component {

  render() { // eslint-disable-line class-methods-use-this
    const {style, attributes} = this.props;

    const componentStyles = [styles.thumbanail, style];
    const componentAttributes = Object.assign(DEFAULT_ATTRIBUTES, attributes)
    return <Thumbnail theme={baseTheme} {...componentAttributes} style={componentStyles}/>;
  }
}

const styles = {
  thumbnail: {
  }
}
