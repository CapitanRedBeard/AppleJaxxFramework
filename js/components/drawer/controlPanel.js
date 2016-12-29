import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { Component, PropTypes } from 'react'

export default class ControlPanel extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };

  render() {
    let {closeDrawer} = this.props

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.controlText}>Control Panel</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#515151',
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  }
})
