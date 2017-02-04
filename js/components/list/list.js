
import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import mergeDeep from '../../util/mergeDeep';
import _ from 'lodash';
import { Spinner } from 'native-base'
import baseTheme from '../../themes/base-theme'
import Row from './row';
import getURL from "../../util/api"
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


export default class ListComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
         rowData: null,
         refreshing: false,
         dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      };
    }

    propTypes: {
        style : React.PropTypes.object,
        dataArray : React.PropTypes.array,
        rowTemplate : React.PropTypes.func.isRequired,
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

    getInitialStyle() {
        return {
            list: {
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

    componentWillMount() {
      this._getRowData(this.props.rowData).then((calculatedRowData) => {
        this.setState({rowData: calculatedRowData})
      });
    }

    _renderRow(data, sectionIds, rowIds, rowTemplate, rowOnClickEval, rowData) {
      return <Row data={data} sectionIds={sectionIds} rowIds={rowIds} rowTemplate={rowTemplate} rowOnClickEval={rowOnClickEval}/>
    }

    _renderSeparator(sectionId, rowId, separator) {
      if(separator)
        return <View key={rowId} style={[styles.separator, separator]} />
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

    _getRefresh(refreshProps) {
      let defaultRefreshProps = {
        tintColor: "#ff0000",
        title: "Loading...",
        titleColor: "#00ff00",
        colors: ['#ff0000', '#00ff00', '#0000ff'],
        progressBackgroundColor: "#ffff00",
      }

      return refreshProps ? <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        {...mergeDeep(refreshProps, defaultRefreshProps)}
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
        var dataSource = ds.cloneWithRows(this.state.rowData);
        return <ListView
          {...this.prepareRootProps()}
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(data, sectionIds, rowIds) => this._renderRow(data, sectionIds, rowIds, this.props.rowTemplate, this.props.rowOnClickEval)}
          renderSeparator={(sID, rID) => this._renderSeparator(sID, rID, this.props.separator)}
          refreshControl={this._getRefresh(this.props.refreshable)}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh.bind(this)}/>
          // }
          //     renderHeader={() => <Header />}
          //     renderFooter={() => <Footer />}
          //     renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
        />
      }
    }
}

const styles = {
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  }
}
