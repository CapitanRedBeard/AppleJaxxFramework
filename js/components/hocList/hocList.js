
import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import mergeDeep from '../../util/mergeDeep';
import _ from 'lodash';
import { Spinner } from 'native-base'
import baseTheme from '../../themes/base-theme'
import getURL from "../../util/api"

//========= LIST =========
// "type": "list",
// "style": {
//   "backgroundColor": "white"
// },
// "rowData": {
//   "type": ["url", "raw"]
//   "params": {
//     "data": [] // only for raw
//     "url": "" //only for url
//   }
// },
// "rowTemplate": {},
// "separator": {},
// "header": {},
// "footer": {},
// "sectionHeader": {}
// "refreshable": {
//     "tintColor": "#4e8ef7",
//     "title": "Loading...",
//     "titleColor": "#4e8ef7"
// },

//========= CARD =========
// "type": "cards",
// "style": {
//   "backgroundColor": "white"
// },
// "rowData": {
//   "type": ["url", "raw"]
//   "params": {
//     "data": [] // only for raw
//     "url": "" //only for url
//   }
// },
// "rowTemplate": {
//   "cardStyle": {}
//   "rowSections": [
//      {
//        style: {},
//        components: {}
//      }
//   ]
// },
// "refreshable": {
//     "tintColor": "#4e8ef7",
//     "title": "Loading...",
//     "titleColor": "#4e8ef7"
// },

export default function hocListWrapper(WrappedComponent) {
  return class ListComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
           rowData: null,
           refreshing: false,
           dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
        this._getRefresh = this._getRefresh.bind(this)

      }

      propTypes: {
          style : React.PropTypes.object,
          dataArray : React.PropTypes.array,
          rowTemplate : React.PropTypes.object.isRequired,
          rowData : {
            type: React.PropTypes.string,
            params: React.PropTypes.object
          },
          refreshable: {
            tintColor: React.PropTypes.string,
            title: React.PropTypes.string,
            titleColor: React.PropTypes.string
          }
      }

      componentWillMount() {
        this._getRowData(this.props.rowData).then((calculatedRowData) => {
          this.setState({rowData: calculatedRowData})
        });
      }

      async _getRowData(rowData) {
        const rowDataTypes = ["raw", "url"];
        const {type, params} = rowData;
        let calculatedRowData = [];

        switch(type) {
          case rowDataTypes[0]:
            calculatedRowData = params.data
            break;
          case rowDataTypes[1]:
            calculatedRowData = await getURL(params.url);
            break;
        }
        return calculatedRowData;

      }

      _getRefresh() {
        let defaultRefreshProps = {
          tintColor: "#ff0000",
          title: "Loading...",
          titleColor: "#00ff00",
          colors: ['#ff0000', '#00ff00', '#0000ff'],
          progressBackgroundColor: "#ffff00",
        }

        return this.props.refreshable ? <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          {...mergeDeep(this.props.refreshable, defaultRefreshProps)}
        /> : null
      }

      _onRefresh() {
        this.setState({refreshing: true});
        this._getRowData(this.props.rowData).then((calculatedRowData) => {
          this.setState({refreshing: false, rowData: calculatedRowData});
        });
      }

      render() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(!this.state.rowData) {
          return <Spinner theme={baseTheme}/>;
        } else {
          let dataSource = ds.cloneWithRows(this.state.rowData);
          const generalProps = {
            enableEmptySections: true,
            dataSource: dataSource,
            refreshControl: this._getRefresh()
          }

          return <WrappedComponent {...generalProps} {...this.props} />
        }
      }
  }
}
