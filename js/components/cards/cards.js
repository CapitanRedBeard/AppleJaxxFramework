
import React, { Component } from 'react';
import { View, ListView, RefreshControl, StyleSheet } from 'react-native';
import mergeDeep from '../../util/mergeDeep';
import _ from 'lodash';
import { Spinner } from 'native-base'
import CardSection from './cardSection';
import hocListWrapper from '../hocList/hocList';

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
//   "rows": [
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

class CardsComponent extends Component {


    propTypes: {
        style : React.PropTypes.object,
        dataArray : React.PropTypes.array,
        transparent: React.PropTypes.boolean,
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
      let theme = this.props.theme;
      return {
        cardList: {
        }
      }
    }

    prepareRootProps() {
      let {enableEmptySections, dataSource, refreshControl} = this.props;
        var defaultProps = {
          style: this.getInitialStyle().cardList,
          enableEmptySections: enableEmptySections,
          dataSource: dataSource,
          refreshControl: refreshControl
        };
        let props = mergeDeep(this.props, defaultProps);
        return props;
    }

    _renderRow(data, sectionIds, rowIds) {
      const renderRowProps = {
        rowTemplate: this.props.rowTemplate,
        theme: this.props.theme,
        transparent: this.props.transparent
      }
      return <CardSection data={data} sectionIds={sectionIds} rowIds={rowIds} {...renderRowProps}/>
    }

    render() {

      return <ListView
          {...this.prepareRootProps()}
          renderRow={this._renderRow.bind(this)}
        />
    }
}


export default hocListWrapper(CardsComponent);
