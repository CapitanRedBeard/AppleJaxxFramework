import React, {Component} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { fireEvent, handleOnPress } from '../../util/events'

import BaseComponent from '../baseComponent'
import getValue from '../../util/getValue'
import _ from 'underscore'

// import { ListItem, Icon, Thumbnail, Badge} from 'native-base';

const AVAILABLE_LIST_COMPONENTS = [
  "thumbnail",
  "text",
  "icon",
  "badge"
]

export default class Row extends Component {

  _getComponents(components, data) {
    let constructedComponents = [];
    _.each(components, (component, index) => {
      if(_.contains(AVAILABLE_LIST_COMPONENTS, component.type)) {
        if(component.binding) {
          component.dataVal = getValue(data, component.binding);
        }
        constructedComponents.push(
          <BaseComponent key={component.type + index} {...component} bindingData={data} />
        )
      }
    });

    return constructedComponents;
  }

  _getSection(key, rowTemplate) {
    let section, sectionStyle
    switch(key) {
      case "left":
        section = rowTemplate.leftSection;
        sectionStyle = styles.leftSection;
        break;
      case "center":
        section = rowTemplate.centerSection;
        sectionStyle = styles.centerSection;
        break;
      case "right":
        section = rowTemplate.rightSection;
        sectionStyle = styles.rightSection;
        break;
    }
    if(section) {
      return (
        <View key={key} style={[styles.section, sectionStyle]}>
          {this._getComponents(section, this.props.data)}
        </View>
      )
    }
  }

  _wrapOnClickHandler(children, events) {
    const {navigator, pages, data} = this.props
    return  (<TouchableOpacity onPress={handleOnPress(events, navigator, pages, data)} style={{flex: 1}}>
              {children}
            </TouchableOpacity>)
  }

  render() {
    const {style, rowTemplate, data, events} = this.props;
    const sections = [];

    sections.push(this._getSection("left", rowTemplate));
    sections.push(this._getSection("center", rowTemplate));
    sections.push(this._getSection("right", rowTemplate));
    const rowComponents = (
              <View style={[styles.container, this.props.style]}>
                {sections}
              </View> )

    return events ? this._wrapOnClickHandler(rowComponents, events) : rowComponents
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
  section: {
    // borderColor: "orange",
    // borderWidth: 1,
    flexDirection: 'column',
  },
  leftSection: {
    flex: 0
  },
  rightSection: {
    flex: 0
  },
  centerSection: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});
