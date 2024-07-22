import React, { PureComponent } from 'react';
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { find } from 'lodash';
import { Spin, Typography, Row, Col, Button } from 'antd';
import moment from 'moment';
import { deepCopy } from '@/utils';
const { Text } = Typography;
class ServerTable extends PureComponent {
  static defaultProps = {
    autoColumnWidth: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      frameworkComponents: {
        spin: () => (
          <div style={{ margin: 5 }}>
            <Spin size="small" /> <Text disabled> loading...</Text>
          </div>
        ),
      },
      rowSelection: 'multiple',
      rowModelType: 'serverSide',
      //列设置
      defaultColDef: {
        enableValue: true,
        enableRowGroup: false,
        enablePivot: false,
        sortable: true,
        resizable: true,
        filter: false,
        sortingOrder: ['desc', 'asc'],
      },
      //侧边状态栏
      sideBar: {
        toolPanels: [
          {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressSideButtons: true,
              suppressColumnFilter: false,
              suppressColumnSelectAll: true,
              suppressColumnExpandAll: true,
            },
          },
        ],
      },
      //底部状态拦
      statusBar: {
        statusPanels: [
          { statusPanel: 'agSelectedRowCountComponent' },
          { statusPanel: 'agAggregationComponent' },
        ],
      },
      height: 400,
    };
    //设置侧边状态栏
    if (props.tbKey) {
      this.localCol = this.getLocal();
      this.state.defaultColDef.menuTabs = ['generalMenuTab', 'filterMenuTab'];
      this.state.sideBar = {
        toolPanels: [
          {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressSideButtons: true,
              suppressColumnFilter: false,
              suppressColumnSelectAll: true,
              suppressColumnExpandAll: true,
            },
          },
        ],
      };
    } else {
      this.state.sideBar = null;
      this.state.defaultColDef.menuTabs = [];
    }
    this.tableRef = React.createRef();
  }
  autoSizeColumns = () => {
    //通过参数计算是否选择撑开整个table还是自适应
    const { autoColumnWidth } = this.props;
    if (autoColumnWidth) {
      //自适应
      var allColumnIds = [];
      this.gridColumnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.colId);
      });
      this.gridColumnApi.autoSizeColumns(allColumnIds);
    } else {
      //撑满整个table，不会出现出现滚动条
      this.gridApi.sizeColumnsToFit();
    }
  };
  onModelUpdated = () => {
    if (!this.gridApi) return;
    setTimeout(() => {
      this.autoSizeColumns();
    }, 500);
  };

  getHeight = el => {
    let top = el.getBoundingClientRect().top + 52;
    let documentHeight = document.documentElement.clientHeight || window.innerHeight;
    let height = documentHeight - top;
    return (height < 400 ? 400 : height) + 'px';
  };

  componentWillUpdate() {
    this.localCol = this.getLocal();
  }

  tableWrapRef = ref => {
    if (ref) ref.style.height = this.getHeight(ref);
  };
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const { loadReady } = this.props;
    if (loadReady) {
      loadReady(params);
    }
  };
  saveLocal = () => {
    const { tbKey } = this.props;
    if (tbKey) {
      const colums = this.gridColumnApi.getAllColumns().map(row => {
        return {
          hide: !row.visible,
          field: row.colId,
          pinned: row.pinned,
        };
      });
      localStorage.setItem(tbKey, JSON.stringify(colums));
    }
  };
  getLocal = () => {
    return JSON.parse(localStorage.getItem(location.pathname) || null);
  };
  loopColum = row => {
    const local = this.localCol;
    if (row.children) {
      row.children.map(item => this.loopColum(item));
    } else {
      let col = find(local, { field: row.field });
      if (col) {
        row.hide = col.hide;
        row.pinned = col.pinned;
      }
    }
    return row;
  };
  getColumns = () => {
    const { columnCus = [] } = this.props;
    return deepCopy(columnCus).map(row => this.loopColum(row));
  };
  selectRow = (key, value) => {
    this.gridApi.forEachNode(function(node) {
      if (node.data[key] === value) {
        node.setSelected(true);
      }
    });
  };
  onBtExport() {
    this.gridApi.exportDataAsExcel({
      fileName: (this.props.fileName || '') + moment().format('YYYYMMDD'),
    });
  }
  render() {
    const { hideHeaderBar, searchBar, gridComponents } = this.props;
    const columnDefs = this.getColumns();
    return (
      <div>
        <div className="ag-theme-balham" ref={this.tableWrapRef} style={{ width: '100%' }}>
          <AgGridReact
            enableRangeSelection={true}
            onGridReady={this.onGridReady}
            defaultColDef={this.state.defaultColDef}
            statusBar={this.state.statusBar}
            sideBar={this.state.sideBar}
            loadingCellRenderer="spin"
            // rowSelection={this.state.rowSelection}
            onModelUpdated={this.onModelUpdated}
            onColumnVisible={this.saveLocal}
            onColumnPinned={this.saveLocal}
            ref={this.tableRef}
            pagination={true}
            paginationAutoPageSize={true}
            frameworkComponents={{ ...gridComponents, ...this.state.frameworkComponents }}
            rowModelType={this.state.rowModelType}
            {...this.props}
            columnDefs={columnDefs}
          />
        </div>
      </div>
    );
  }
}
export default ServerTable;
