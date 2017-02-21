import React, { Component } from 'react';
import { Thumbnail } from 'native-base';
import { textColor } from '../../themes/base-theme'
import baseTheme from '../../themes/base-theme'
import { getImage } from '../../util/api'
import {Image} from 'react-native';
const emptyThumbnailSource = "";

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

  constructor(props) {
    super(props)
    this.state = {
      imageSource: null
    }
  }

  componentWillMount() {
    getImage(this.props.source).then((val) => {
      if(val) {
        this.setState({"imageSource": val});
      }
    });
  }

  prepareRootProps() {
    const {style, attributes} = this.props;
    const componentStyle = [styles.thumbanail, style];
    const componentAttributes = _.merge(attributes, {source: {uri: this.state.imageSource}});

    return {...componentAttributes, style: componentStyle, theme: baseTheme}
  }

  render() { // eslint-disable-line class-methods-use-this
    return this.state.imageSource ? <Thumbnail {...this.prepareRootProps()}/> : null;
  }
}

const styles = {
  thumbnail: {
  }
}
