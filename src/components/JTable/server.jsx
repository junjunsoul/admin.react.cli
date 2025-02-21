import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useCallback, memo, useMemo } from 'react'
import {
  Empty,
  Spin,
} from 'antd'
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  LocaleModule,
  themeQuartz,
  iconSetQuartzLight,
  ColumnApiModule,
  RowApiModule,
  ValidationModule,
  RowSelectionModule,
  CellStyleModule,
  ColumnAutoSizeModule,
  TooltipModule,
  PaginationModule,
} from "ag-grid-community";
import {
  ColumnsToolPanelModule,
  CellSelectionModule,
  ColumnHoverModule,
  ColumnMenuModule,
  ContextMenuModule,
  ClipboardModule,
  StatusBarModule,
  PinnedRowModule,
  RowGroupingModule,
  ServerSideRowModelModule,
} from "ag-grid-enterprise";
import { AG_GRID_LOCALE_CN } from "./locale";
import { find } from 'lodash'
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnHoverModule,
  CellSelectionModule,
  ColumnMenuModule,
  ContextMenuModule,
  ClipboardModule,
  StatusBarModule,
  LocaleModule,
  ColumnApiModule,
  PinnedRowModule,
  RowApiModule,
  ValidationModule,
  RowGroupingModule,
  RowSelectionModule,
  CellStyleModule,
  ServerSideRowModelModule,
  ColumnAutoSizeModule,
  TooltipModule,
  PaginationModule,
]);

const Page = memo(forwardRef((props, ref) => {
  const {
    cellRendererSelector = true,
    loading = false,
    hideHeaderBar = false,
    searchBar = null,
    tbKey = '',
    columnCus = [],
    autoColumnWidth = false,
    //表格参数
    onGridReady = null,
    context = {},
  } = props
  const [height, setHeight] = useState(400)
  const [nH, setNH] = useState(0)
  let wrapRef = useRef()
  let tableRef = useRef()
  useEffect(() => {
    //动态计算表格高度
    // setInterval(() => {
    //   if (wrapRef && wrapRef.current) {
    //     setNH(wrapRef.current.getBoundingClientRect().top)
    //   }
    // }, 2000)
    window.onresize = () => {
      onLayoutResize()
    }
  }, [])
  useEffect(() => {
    onLayoutResize()
  }, [nH])

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      enableValue: true,
      suppressHeaderMenuButton: true,
      tooltipComponent: props => {
        return <div className="custom-tooltip">{props.value}</div>
      },
      cellRendererSelector: cellRendererSelector ? (params) => {
        if (params.node.rowPinned) {
          return {
            component: props => {
              return <b>{props.value}</b>
            },
            params: {
              style: { color: '#1890ff', fontWeight: 'bold' },
            },
          }
        } else {
          return null

        }
      } : null,
      mainMenuItems: () => (['pinSubMenu'])
    };
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const sideBar = useMemo(() => {
    if (tbKey) {
      return {
        toolPanels: [
          {
            id: "columns",
            labelDefault: "Columns",
            labelKey: "columns",
            iconKey: "columns",
            toolPanel: "agColumnsToolPanel",
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
            },
          },
        ],
      };
    } else {
      return false
    }
  }, [tbKey]);

  const cellSelection = useMemo(() => {
    return { handle: { mode: "range" } };
  }, []);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_CN;
  }, []);
  //暴露ref
  useImperativeHandle(ref, () => ({
    autoSizeColumns,
  }))
  //动态高度
  const onLayoutResize = () => {
    if (wrapRef && wrapRef.current) {
      let top = wrapRef.current.getBoundingClientRect().top + 12
      let documentHeight = document.documentElement.clientHeight || window.innerHeight
      if (props.height) {
        setHeight(props.height)
      } else {
        let height = documentHeight - top
        setHeight(height < 400 ? 400 : height)
      }
    }
  }
  //缓存列
  const getLocal = () => {
    return JSON.parse(localStorage.getItem(tbKey) || null)
  }
  const saveLocal = useCallback(() => {
    let api = tableRef?.current?.api
    if (tbKey) {
      const all = api.getColumns()
      const colums = api.getColumnDefs().map(row => {
        let field = all.find(r => r.colId == row.colId)
        return {
          hide: !field?.visible,
          field: row.colId,
          pinned: row.pinned
        }
      })
      localStorage.setItem(tbKey, JSON.stringify(colums))
    }
  }, [])
  const getColumns = useMemo(() => {
    const local = getLocal()
    if (local) {
      return local.map(r => ({ ...r, ...find(columnCus, { field: r.field }) }))
    }
    return columnCus
  }, [columnCus])
  const getContextMenuItems = useCallback((params) => {
    return [
      'copy',
      'copyWithHeaders',
      // 'export'
    ]
  }, [])
  //列宽度自适应
  const autoSizeColumns = () => {
    let api = tableRef?.current?.api
    //通过参数计算是否选择撑开整个table还是自适应
    if (autoColumnWidth) {
      //自适应
      var allColumnIds = []
      api.getColumns().forEach(function (column) {
        allColumnIds.push(column.colId)
      })
      api.autoSizeColumns(allColumnIds)
    } else {
      //撑满整个table，不会出现出现滚动条
      api.sizeColumnsToFit()
    }
  }
  const onModelUpdated = useCallback((params) => {

  }, [])
  const theme = themeQuartz
    .withPart(iconSetQuartzLight)
    .withParams({
      backgroundColor: "#ffffff",
      borderColor: "#D9D5D526",
      browserColorScheme: "light",
      columnBorder: false,
      fontFamily: "Arial",
      foregroundColor: "rgb(46, 55, 66)",
      headerBackgroundColor: "#F9FAFB",
      headerFontSize: 14,
      headerFontWeight: 600,
      headerTextColor: "#919191",
      oddRowBackgroundColor: "#F9FAFB",
      rowBorder: false,
      sidePanelBorder: false,
      spacing: 8,
      wrapperBorder: true,
      wrapperBorderRadius: 0
    });
  return <Spin spinning={loading} delay={500}>
    {!hideHeaderBar && (
      <div style={{ display: 'flex', padding: '5px 0', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          {searchBar}
        </div>
      </div>
    )}
    <div ref={wrapRef} style={{ height, width: '100%' }}>
      <AgGridReact
        ref={tableRef}
        theme={theme}
        localeText={localeText}
        columnDefs={getColumns}
        onColumnMoved={saveLocal}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        sideBar={sideBar}
        rowModelType={'serverSide'}
        onColumnVisible={saveLocal}
        onColumnPinned={saveLocal}
        onModelUpdated={onModelUpdated}
        getContextMenuItems={getContextMenuItems}
        noRowsOverlayComponent={() => <Empty />}
        tooltipShowDelay={500}
        tooltipInteraction={true}
        pagination={true}
        paginationAutoPageSize={true}
        columnHoverHighlight={true}
        onGridReady={onGridReady}
        context={context}
        cellSelection={cellSelection}
      />
    </div>
  </Spin>
}))
export default Page