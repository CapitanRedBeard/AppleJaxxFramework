import { connect } from 'react-redux'

import React, { Component } from 'react';
import { Text, ScrollView, View} from 'react-native';
import BaseComponent from '../../components/baseComponent'
import _ from 'underscore'
import {Container, Content} from 'native-base';
import { navigateJumpToKey, navigatePop, navigatePush, navigateReset } from '../../actions/navActions'
import Footer from '../../components/footer/footer'
// import Drawer from 'react-native-drawer'
import ControlPanel from 'react-native-drawer'
class Page extends Component {

  static propTypes = {
    // navigator: React.PropTypes.shape({}),
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
      <Container>
        <View style={{flex: 1}}>
          <ScrollView style={overridedStyles} containerStyleProps={{
          justifyContent: "center",
          alignItems: "center"}}>
              {this.getComponents()}
          </ScrollView>
          {this.props.footer && <Footer footer={this.props.footer} navigation={this.props.navigation} />}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigation: {
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
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC",
    marginTop: 50,
    borderColor: "red",
    borderWidth: 2
  },
  content: {
    flex: 1,
    justifyContent: "flex-end"
  },
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 3},
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
