
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import mergeDeep from '../../util/mergeDeep';
import _ from 'lodash';
import { Spinner } from 'native-base'
import baseTheme from '../../themes/base-theme'
import Row from './row';

  // "type": "list",
  // "style": {
  //   "backgroundColor": "white"
  // },
  // "rowOnClickEval": {},
  // "rowData": [],
  // "rowTemplate": {},
  // "separator": {},
  // "header": {},
  // "footer": {},
  // "sectionHeader": {}

  
export default class ListComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
         loading: true,
         dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      };
    }

    propTypes: {
        style : React.PropTypes.object,
        dataArray : React.PropTypes.array,
        rowTemplate : React.PropTypes.func.isRequired
    }

    getInitialStyle() {
        return {
            list: {
                // borderWidth: 1,
                // borderColor: "red",
                // padding: 15,
                borderBottomWidth: 0
            },
            insetList: {
                borderWidth: 1,
                borderColor: "#333",
                margin: 15,
                borderBottomWidth: 0
            },
            separator: {
              height: 1,
              backgroundColor: 'black',
            }
        }
    }

    prepareRootProps() {
        var defaultProps = {
          style: this.props.inset ? this.getInitialStyle().insetList : this.getInitialStyle().list
        };

        return mergeDeep(this.props, defaultProps);
    }

    renderChildren() {
        var childrenArray = React.Children.toArray(this.props.children);
        var keyIndex = 0;

        childrenArray = childrenArray.map((child) => {
            keyIndex++;
            return React.cloneElement(child, {...child.props, key: keyIndex});
        });

        var lastElement = _.last(childrenArray)

        return _.concat(_.slice(childrenArray, 0, childrenArray.length - 1), lastElement);
    }

    _renderRow(data, sectionIds, rowIds, rowTemplate, rowOnClickEval, rowData) {
      return <Row data={data} sectionIds={sectionIds} rowIds={rowIds} rowTemplate={rowTemplate} rowOnClickEval={rowOnClickEval}/>
    }

    _renderSeparator(sectionId, rowId, separator) {
      if(separator)
        return <View key={rowId} style={[styles.separator, separator]} />
    }

    render() {
        if(this.props.rowData && this.props.rowTemplate) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            var dataSource = ds.cloneWithRows(this.props.rowData);
            // return (
            //     <ListView
            //         enableEmptySections={true}
            //         dataSource={dataSource}
            //         refreshing={this.props.refreshing}
            //         onRefresh={this.props.onRefresh}
            //         renderRow={this.props.renderRow} />
            // );
            // console.log("List Rendered")
            return (
              // this.state.loading ?
              // <Spinner theme={baseTheme}/> :
              <ListView
                {...this.prepareRootProps()}
                enableEmptySections={true}
                dataSource={dataSource}
                renderRow={(data, sectionIds, rowIds) => this._renderRow(data, sectionIds, rowIds, this.props.rowTemplate, this.props.rowOnClickEval)}
                renderSeparator={(sID, rID) => this._renderSeparator(sID, rID, this.props.separator)}
              />
            );

            //   <ListView
            //     style={styles.container}
            //     dataSource={this.state.dataSource}
            //     renderRow={(data) => <Row {...data} />}
            //     renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
            //     renderHeader={() => <Header />}
            //     renderFooter={() => <Footer />}
            //     renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
            //   />
        }
        else {
            return (
                <View ref={c => this._root = c} {...this.prepareRootProps()} >
                {this.renderChildren()}
                </View>
            );
        }
    }
}

// import React, { Component } from 'react';
// import { ListView} from 'react-native';
// import { Spinner } from 'native-base'
// import baseTheme from '../../themes/base-theme'
// import SectionHeader from './sectionHeader';
// import demoData from '../../../dataSources/demoDataSource';
// import Row from './row';
// import API from '../../util/api';
// import {
//   View,
//   AlertIOS,
//   StyleSheet
// } from "react-native";
// // import defaultStyles from './styles';
//
// export default class ListComponent extends Component {
//   constructor(props) {
//     super(props);
//     console.log("props", props);
//
//     this.state = {
//       dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
//       loading: true
//     };
//
//   }
//
//   async _constructDataSource(url, binding) {
//     console.log("Fetching ", url);
//
//     try {
//       let response = await fetch(url);
//       let responseJson = await response.json();
//       console.log("Success", responseJson[binding]);
//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(responseJson[binding]),
//         loading: false
//       });
//     } catch(error) {
//       console.warn("Warning, couldn't find dataSource", error);
//       this.setState({loading: false})
//     }
//   }
//
//   componentWillMount() {
//     // this._constructDataSource(this.props.dataSource.url, this.props.rowDataBinding);
//   }
//
//   _renderRow(data, sectionIds, rowIds, rowTemplate, rowOnClickEval) {
//     return <Row data={data} sectionIds={sectionIds} rowIds={rowIds} components={rowTemplate} rowOnClickEval={rowOnClickEval}/>
//   }
//
//   render() {
//     console.log("List Rendered")
//     return (this.state.loading ?
//       <Spinner theme={baseTheme}/> :
//       <ListView
//         style={styles.container}
//         dataSource={this.state.dataSource}
//         renderRow={(data, sectionIds, rowIds) => this._renderRow(data, sectionIds, rowIds, this.props.rowTemplate, this.props.rowOnClickEval)}
//         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
//       />
//     );
//
//     //   <ListView
//     //     style={styles.container}
//     //     dataSource={this.state.dataSource}
//     //     renderRow={(data) => <Row {...data} />}
//     //     renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
//     //     renderHeader={() => <Header />}
//     //     renderFooter={() => <Footer />}
//     //     renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
//     //   />
//   }
// }

const styles = {
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  }
}
