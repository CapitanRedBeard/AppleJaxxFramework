import React, {Component} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BaseComponent from '../baseComponent'
import _ from 'underscore'
const AVAILABLE_LIST_COMPONENTS = [
  "thumbnail",
  "text"
]

export default class Row extends Component {

  getComponents(components) {
    let constructedComponents = [];
    _.each(components, (component, index) => {

      if(_.contains(AVAILABLE_LIST_COMPONENTS, component.type)) {
        constructedComponents.push(
          <BaseComponent key={component.type + index} {...component} />
        )
      }
    });

    return constructedComponents;
  }

  render() {
    console.log("Row props", this.props)

    return <View style={[styles.container, this.props.style]}>
      {this.getComponents(this.props.components)}
    </View>
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
