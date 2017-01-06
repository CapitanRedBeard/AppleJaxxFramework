import React, {Component} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BaseComponent from '../baseComponent'
import getValue from '../../util/getValue'
import _ from 'underscore'
import { navigatePush, navigatePop, navigateJumpToKey, navigateReset } from '../../actions/navActions'
const AVAILABLE_LIST_COMPONENTS = [
  "thumbnail",
  "text"
]

export default class Row extends Component {

  getComponents(components, data) {
    let constructedComponents = [];
    _.each(components, (component, index) => {
      if(_.contains(AVAILABLE_LIST_COMPONENTS, component.type)) {
        if(component.binding) {
          component.dataVal = getValue(data, component.binding);
        }
        constructedComponents.push(
          <BaseComponent key={component.type + index} {...component} />
        )
      }
    });

    return constructedComponents;
  }

    onButtonPress(rowOnClickEval) {
      let {type, param, index, key} = rowOnClickEval;
      console.log("Need to send param", param)
      switch(type){
        case "push":
          navigatePush(key);
          break;
        case "pop":
          navigatePop();
          break;
        case "jump":
          navigateJumpToKey(key);
          break;
        case "reset":
          navigateReset(index);
          break;
      }
    }
  _wrapOnClickHandler(children, rowOnClickEval) {
    return  (<TouchableOpacity onPress={()=> this.onButtonPress(rowOnClickEval)} style={{flex: 1}}>
              {children}
            </TouchableOpacity>)
  }

  render() {
    // console.log("Props", this.props)
    const {style, components, data, rowOnClickEval} = this.props;

    const rowComponents = (
              <View style={[styles.container, this.props.style]}>
                {this.getComponents(this.props.components, this.props.data)}
              </View> )

    return rowOnClickEval ? this._wrapOnClickHandler(rowComponents, rowOnClickEval) : rowComonents
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    // borderColor: 'red',
    // borderWidth: 1
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
