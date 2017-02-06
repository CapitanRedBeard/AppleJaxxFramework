import React, {Component} from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BaseComponent from '../baseComponent'
import getValue from '../../util/getValue'
import _ from 'underscore'
import mergeDeep from '../../util/mergeDeep';

// import { ListItem, Icon, Thumbnail, Badge} from 'native-base';

const AVAILABLE_LIST_COMPONENTS = [
  "thumbnail",
  "text",
  "icon",
  "badge",
  "image"
]

export default class CardSection extends Component {

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

  getInitialStyle() {
    const { theme, transparent } = this.props
    return {
      section: {
        flex: 1,
        flexDirection: "row"
      },
      card: {
        marginVertical: 5,
        flex: 1,
        borderWidth: theme.borderWidth,
        borderRadius: 3,
        borderColor: theme.listBorderColor,
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        backgroundColor: transparent ? 'transparent' : theme.cardDefaultBg,
        shadowColor: transparent ? undefined : '#000',
        shadowOffset: transparent ? undefined : {width: 0, height: 2},
        shadowOpacity: transparent ? undefined : 0.1,
        shadowRadius: transparent ? undefined : 1.5,
        elevation: transparent ? undefined : 2
      }
    }
  }

  _getSections(rowSections) {
    const sections = _.map(rowSections, (row, index) => {
      const {style, components} = row;
      return (
        <View key={`cardSection${index}`} style={[this.getInitialStyle().section, style]}>
          {this._getComponents(components, this.props.data)}
        </View>
      )
    })
    return sections
  }

  prepareRootProps() {

    var defaultProps = {
      style: this.getInitialStyle().card
    };

    return mergeDeep({style: getValue(this.props.rowTemplate, "cardStyle")}, defaultProps);
  }

  render() {
    const rows = getValue(this.props.rowTemplate, "rowSections");
    return <View {...this.prepareRootProps()}>
              {this._getSections(rows)}
            </View>
  }
};
