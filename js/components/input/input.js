'use strict';

import React, {Component } from 'react';
import { View, TextInput, Platform } from 'react-native';
import Icon from './../icon/icon';
import mergeDeep from '../../util/mergeDeep';
import getValue from '../../util/getValue';

export default class Input extends Component {

  propTypes: {
    //External
    binding: React.PropTypes.string,
    success: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    error: React.PropTypes.bool,
    borderType: React.PropTypes.string,
    borderColor: React.PropTypes.string,
    borderWidth: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    inputProps: {
      style: React.PropTypes.object,
      placeholderTextColor: React.PropTypes.string,
      underlineColorAndroid: React.PropTypes.string
    },
    iconProps: {
      iconRight: true,
      name: React.PropTypes.string,
      style: React.PropTypes.object
    },
    //Internal
    theme: React.PropTypes.object,
    toolbar: React.PropTypes.bool,
    androidToolbar: React.PropTypes.bool
  }

  getInitialStyle() {
    let theme = this.props.theme;

    return {
      input: {
        height: this.props.toolbar ? 30 : theme.inputHeightBase,
        color: theme.inputColor,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: theme.inputFontSize,
        lineHeight: theme.inputLineHeight,
        marginTop: (this.props.inlineLabel) ? ((Platform.OS === 'ios') ? undefined : 5) : undefined
      },
      textInput: {
        backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "transparent",
        flexDirection: 'row',
        borderColor: this.props.borderColor ? this.props.borderColor : theme.inputBorderColor,
        borderWidth: this.props.borderWidth ? this.props.borderWidth : theme.borderWidth,
        paddingRight: 5,
        alignItems: 'center',
        margin: 10
      },
      outerBorder: {
        position:'relative',
        borderColor: 'white',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
      },
      darkborder: {
        borderColor: '#000'
      },
      lightborder: {
        borderColor: '#fff'
      },
      underline: {
        position:'relative',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0
      },
      bordered: {
        position:'relative',
      },
      rounded: {
        position:'relative',
        borderRadius: 30
      }
    }
  }

  prepareRootProps() {
    var type = {
      paddingLeft:  (this.props.borderType === 'rounded' && ! _.get(this.props.children, 'type', null) == Icon) ? 15 :
      ( _.get(this.props.children, 'type', null) == Icon ) ? theme.inputPaddingLeftIcon : 5
    }

    var defaultStyle = (this.props.borderType === 'regular') ? this.getInitialStyle().bordered : (this.props.borderType === 'rounded') ? this.getInitialStyle().rounded : this.getInitialStyle().underline;

    type = _.merge(type, defaultStyle);

    var addedProps = _.merge(this.getInitialStyle().textInput, type);

    var defaultProps = {
      style: addedProps,
      key: 'inpGroup'
    }

    return mergeDeep(this.props, defaultProps);
  }

  getTextInputProps() {
      var defaultProps = {
          style: this.getInitialStyle().input,
          placeholderTextColor: this.props.placeholderTextColor ? this.props.placeholderTextColor : this.props.theme.inputColorPlaceholder,
          underlineColorAndroid: 'rgba(0,0,0,0)'
      }
      var inputProps = getValue(this.props, "inputProps", {});

      return mergeDeep(inputProps, defaultProps);
  }

  getIconProps(icon) {
    var defaultStyle = {
      fontSize: (this.props.toolbar || this.props.androidToolbar) ? theme.toolbarIconSize : 27,
      alignSelf: 'center',
      lineHeight: (this.props.toolbar || this.props.androidToolbar) ? 20 : undefined,
      paddingRight: 5,
      marginLeft: (this.props.toolbar || this.props.androidToolbar) ? 5 : undefined,
      marginTop: (this.props.toolbar || this.props.androidToolbar) ? 2 : undefined
    }

    var defaultProps = {
      style: defaultStyle,
      key: 'icon'
    }

    var iconProps = getValue(this.props, "iconProps", {});
    console.log("mergeDeep", mergeDeep(iconProps, defaultProps));
    return mergeDeep(iconProps, defaultProps);
  }

  renderChildren() {
    let children = [];

    var icon = this.props.iconProps ? <View key="icon" style={{ flex: 0 }}>
        <Icon {...this.getIconProps()} />
    </View> : null;

    let input = <View key="textInput" style={{ flex: 1}}>
        <TextInput {...this.getTextInputProps()} />
    </View>
    if(this.props.iconLeft) {
      children.push(icon);
      children.push(input);
    } else {
      children.push(input);
      children.push(icon);
    }

    return children;
  }

  render() {
    return (
      <View ref={c => this._root = c} {...this.prepareRootProps()} >
        {this.renderChildren()}
      </View>
    );
  }
}
