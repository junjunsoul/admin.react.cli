import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, memo } from 'react'
import {
  Empty,
  Input,
  Button,
  Spin,
  Space
} from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  LocaleModule,
  themeQuartz,
  ColumnApiModule,
  RowApiModule,
  ValidationModule,
  RowSelectionModule,
  CellStyleModule,
  ClientSideRowModelApiModule,
  ColumnAutoSizeModule,
  TooltipModule,
  QuickFilterModule,
  colorSchemeLightCold,
  colorSchemeDarkBlue,
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
  ExcelExportModule,
} from "ag-grid-enterprise";
import { useThemeStore } from '@/store/themeStore'
import { AG_GRID_LOCALE_CN } from "./locale";
import dayjs from 'dayjs'
import { find, debounce, isEmpty } from 'lodash'
import { randomWord, totalHandle } from '@/utils'

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
  ClientSideRowModelApiModule,
  ColumnAutoSizeModule,
  TooltipModule,
  QuickFilterModule,
  ExcelExportModule,
]);
const Search = Input.Search
const Page = memo(forwardRef((props, ref) => {
  const {
    cellRendererSelector = true,
    name = '',
    loading = false,
    hideHeaderBar = false,
    isSearch = true,
    isDownLoad = true,
    searchBar = null,
    tbKey = '',
    columnCus = [],
    autoColumnWidth = false,
    formatCus = [],
    //表格参数
    rowData = [],
    context = {},
    totalNextTick = null
  } = props
  const { isDark } = useThemeStore()
  const [randomKey, setRandomKey] = useState('')
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

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        {
          statusPanel: "agTotalRowCountComponent",
          align: "right",
        },
        { statusPanel: "agFilteredRowCountComponent" },
        { statusPanel: "agSelectedRowCountComponent" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
  }, []);

  const cellSelection = useMemo(() => {
    return { handle: { mode: "range" } };
  }, []);

  const localeText = useMemo(() => {
    return AG_GRID_LOCALE_CN;
  }, []);
  //暴露ref
  useImperativeHandle(ref, () => ({
    tableApi: tableRef?.current?.api,
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
  //查询
  const quickFilter = value => {
    let api = tableRef?.current?.api
    api.setGridOption('quickFilterText', value.trim())
    setVal()
  }
  //导出
  const onBtExport = () => {
    let api = tableRef?.current?.api
    api.exportDataAsExcel({
      fileName: (name || '') + dayjs().format('YYYYMMDD'),
      processCellCallback: params => {
        if (formatCus && formatCus[params.column.colId]) {
          return formatCus[params.column.colId](params)
        } else {
          return params.value
        }
      }
    })
  }
  //复制
  const onProcessCellForClipboard = useCallback(params => {
    if (formatCus && formatCus[params.column.colId]) {
      return formatCus[params.column.colId](params)
    } else {
      return params.value
    }
  }, [])
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
  //汇总
  const setVal = debounce(() => {
    setRandomKey(randomWord(4))
  }, 500)
  const pinnedTopRowData = useMemo(() => {
    let api = tableRef?.current?.api
    if (!api) return []
    let columnCus = api.getColumnDefs()
    let dataList = [];
    api.forEachNodeAfterFilter(node => {
      dataList.push(node.data);
    });
    let total = totalHandle(dataList, columnCus);
    if (isEmpty(total) || dataList.length == 0) {
      return [];
    }
    if (totalNextTick) {
      return [totalNextTick(total, dataList)]
    } else {
      return [total]
    }
  }, [randomKey, rowData])
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
    if (params.newData) {
      setVal()
    }
  }, [])
  const theme = useMemo(() => {
    return themeQuartz
    .withPart(isDark?colorSchemeDarkBlue:colorSchemeLightCold)
  }, [isDark])
  return <Spin spinning={loading} delay={500}>
    {!hideHeaderBar && (
      <div style={{ display: 'flex', padding: '5px 0', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          {searchBar}
        </div>
        <Space>
          {isSearch &&
            <Search
              placeholder="在表格中搜索..."
              allowClear
              onChange={e => quickFilter(e.target.value)}
            />}
          {isDownLoad &&
            <Button
              type="dashed"
              onClick={onBtExport}
              icon={<CloudDownloadOutlined />}
            />}
        </Space>
      </div>
    )}
    <div ref={wrapRef} style={{ height, width: '100%' }}>
      <AgGridReact
        ref={tableRef}
        theme={theme}
        localeText={localeText}
        rowData={rowData}
        columnDefs={getColumns}
        defaultColDef={defaultColDef}
        autoGroupColumnDef={autoGroupColumnDef}
        columnHoverHighlight={true}
        cellSelection={cellSelection}
        getContextMenuItems={getContextMenuItems}
        onModelUpdated={onModelUpdated}
        onColumnMoved={saveLocal}
        onColumnVisible={saveLocal}
        onColumnPinned={saveLocal}
        pinnedTopRowData={pinnedTopRowData}
        sideBar={sideBar}
        statusBar={statusBar}
        processCellForClipboard={onProcessCellForClipboard}
        tooltipShowDelay={500}
        tooltipInteraction={true}
        noRowsOverlayComponent={() => <Empty />}
        context={context}
      />
    </div>
  </Spin>
}))
export default Page