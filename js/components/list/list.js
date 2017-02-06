
import React, { Component } from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import mergeDeep from '../../util/mergeDeep';
import _ from 'lodash';
import { Spinner } from 'native-base'
import baseTheme from '../../themes/base-theme'
import Row from './row';
import hocListWrapper from '../hocList/hocList';
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


class ListComponent extends Component {

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
      let {inset, enableEmptySections, dataSource, refreshControl} = this.props;
        var defaultProps = {
          style: inset ? this.getInitialStyle().insetList : this.getInitialStyle().list,
          enableEmptySections: true,
          dataSource: dataSource,
          refreshControl: refreshControl
        };

        return mergeDeep(this.props, defaultProps);
    }

    _renderRow(data, sectionIds, rowIds, rowTemplate) {
      return <Row data={data} sectionIds={sectionIds} rowIds={rowIds} rowTemplate={rowTemplate} />
    }

    _renderSeparator(sectionId, rowId, separator) {
      if(separator)
        return <View key={rowId} style={[styles.separator, separator]} />
    }

    render() {
      return <ListView
        {...this.prepareRootProps()}
        renderRow={(data, sectionIds, rowIds) => this._renderRow(data, sectionIds, rowIds, this.props.rowTemplate)}
        renderSeparator={(sID, rID) => this._renderSeparator(sID, rID, this.props.separator)}
      />
    }
}

const styles = {
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  }
}

export default hocListWrapper(ListComponent);
