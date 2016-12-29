import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
  },
  text: {
    fontSize: 13,
  },
});

export default  SectionHeader = (props) => (
  <View style={styles.container}>
    <Text style={styles.text}>{props.character}</Text>
  </View>
);
