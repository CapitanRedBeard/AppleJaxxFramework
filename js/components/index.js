import React, { Component } from 'react';
import Button from './button/button';
import Text from './text/text';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { View } from 'react-native';

const {
  popRoute,
  pushRoute,
} = actions;

const components = {
  "button": Button,
  "text": Text,
  "thumbnail": Text
};


class BaseComponent extends Component {

  static propTypes = {
    type: React.PropTypes.string,
    onButtonPress: React.PropTypes.func
  }

  render() { // eslint-disable-line class-methods-use-this

    console.log("components", components, this.props);

    let Instance = components[this.props.type];
    console.log("components", components);
    return (
      <View style={{borderColor: "red", borderWidth: 1}}>
          <Instance {...this.props}/>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPress: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = (state) => {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
