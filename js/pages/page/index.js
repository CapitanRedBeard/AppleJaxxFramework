import { connect } from 'react-redux'

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BaseComponent from '../../components'
import _ from 'underscore'
import { navigateJumpToKey, navigatePop, navigatePush, navigateReset } from '../../actions/navActions'

class Page extends Component {

  static propTypes = {
    navigator: React.PropTypes.shape({}),
  }

  componentWillMount() {
    const navigator = this.props.navigator;
  }

  getComponents() {
    let components = [];
    _.each(this.props.components, (component, index) => {
      components.push(<BaseComponent key={component.type + index} {...this.props} {...component}/>)
    });
    return components;
  }

  render() { // eslint-disable-line class-methods-use-this
    let overridedStyles = [styles.container, this.props.style];
    return (
      <View style={overridedStyles}>
          {this.getComponents()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
		pop: (key) => {
  		dispatch(navigatePop())
    },
		push: (key) => {
			dispatch(navigatePush(key))
		},
		reset: (index) => {
  		dispatch(navigateReset(index))
    },
		jump: (key) => {
			dispatch(navigateJumpToKey(key))
		}
	}
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey"
  }
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
