import { useState, useRef, useEffect, forwardRef, useImperativeHandle,useCallback,memo,useMemo } from 'react'
import {
  Empty,
  Spin,
} from 'antd'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import { AG_GRID_LOCALE_CN } from './locale'
import { find } from 'lodash'
import { deepCopy } from '@/utils'
const Page = memo(forwardRef((props, ref) => {
  const { cellRendererSelector = true } = props
  const {
    theme = 'custom',
    loading = false,
    hideHeaderBar = false,
    searchBar = null,
    tbKey = '',
    columnCus = [],
    isAutoSize = true,
    autoColumnWidth = false,
    //表格参数
    onGridReady=null,
    context = {},
    rowSelection = 'single',
    enableRangeSelection = true,
    statusBar = {
      statusPanels: [
        {
          statusPanel: 'agTotalRowCountComponent',
          align: 'left',
        },
        { statusPanel: 'agFilteredRowCountComponent' },
        { statusPanel: 'agSelectedRowCountComponent' },
        { statusPanel: 'agAggregationComponent' },
      ],
    },
    defaultColDef = {
      enableValue: false,
      enableRowGroup: false,
      enablePivot: false,
      sortable: false,
      resizable: true,
      filter: false,
      // width: 130,
      sortingOrder: ['desc', 'asc'],
      suppressHeaderMenuButton: true,
      suppressHeaderFilterButton: true,
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
      menuTabs: [],
      mainMenuItems: () => (['pinSubMenu'])
    },
    sideBar = tbKey && {
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
            // suppressColumnSelectAll: true,
            // suppressColumnExpandAll: true,
          },
        },
      ],
    },
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
      const colums = api.getColumns().map(row => {
        return {
          hide: !row.visible,
          field: row.colId,
          pinned: row.pinned,
        }
      })
      localStorage.setItem(tbKey, JSON.stringify(colums))
    }
  },[])
  const loopColum = row => {
    const local = getLocal()
    if (row.children) {
      row.children.map(item => loopColum(item))
    } else {
      let col = find(local, { field: row.field })
      if (col) {
        row.hide = col.hide
        row.pinned = col.pinned
      }
    }
    return row
  }
  const getColumns = () => {
    return deepCopy(columnCus).map(row => loopColum(row))
  }
  const getContextMenuItems = useCallback((params) => {
    return [
      'copy',
      'copyWithHeaders',
      // 'export'
    ]
  },[])
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
    if (isAutoSize) {
      autoSizeColumns()
    }
  },[])
  return <Spin spinning={loading} delay={500}>
    {!hideHeaderBar && (
      <div style={{ display: 'flex', padding: '5px 0', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          {searchBar}
        </div>
      </div>
    )}
    <div ref={wrapRef} className={`ag-theme-${theme}`} style={{ height, width: '100%' }}>
      <AgGridReact
        ref={tableRef}
        localeText={AG_GRID_LOCALE_CN}
        columnDefs={getColumns()}
        defaultColDef={defaultColDef}
        sideBar={sideBar}
        rowModelType={'serverSide'}
        rowSelection={rowSelection}
        onColumnVisible={saveLocal}
        onColumnPinned={saveLocal}
        enableRangeSelection={enableRangeSelection}
        onModelUpdated={onModelUpdated}
        getContextMenuItems={getContextMenuItems}
        noRowsOverlayComponent={() => <Empty />}
        pagination={true}
        paginationAutoPageSize={true}
        columnHoverHighlight={true}
        onGridReady={onGridReady}
        context={context}
        // statusBar={statusBar}
      />
    </div>
  </Spin>
}))
export default Page