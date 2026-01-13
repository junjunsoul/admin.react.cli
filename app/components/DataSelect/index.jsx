import { useState, useCallback, useMemo, memo } from 'react';
import { Input, Checkbox, Row, Col, Empty, Card, Button } from 'antd';
import { chunk, debounce, uniq } from 'lodash';
const { Search } = Input;

export default memo((props) => {
  const {
    list = [],
    value = [],
    chunkSpan = 2,
    bodyStyle = {},
    title = '',
    chilRender,
    showCheck = true,
    showLabel = true,
    ext = null,
    onChange = () => { }
  } = props
  const [filterText, setFilterText] = useState('')

  const items = useMemo(() => {
    return filterText ? list.filter(r => r.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase().trim()) > -1) : list
  }, [filterText, list.length])

  let cardTitle = showLabel ? `${title} - 总 ${list.length} - 已选 ${value.length}` : `${title}`

  const onSearch = debounce(val => {
    setFilterText(val)
  }, 300)
  const onCheckAll = (all) => {
    let all_v = items.map(r => r.value)
    if (all) {
      onChange(uniq([...value, ...all_v]))
    } else {
      onChange(uniq([...value.filter(v => !all_v.includes(v))]))
    }
  }
  const checkChange = (id) => {
    if (value.includes(id)) {
      onChange([...value.filter(r => r != id)])
    } else {
      onChange([id, ...value])
    }
  }
  return <Card
    size="small"
    title={cardTitle}
    extra={[
      <div key="checkAll" className="flex items-center">
        {showCheck ? <>
          <Button
            type="link"
            size="small"
            onClick={() => {
              onCheckAll(true);
            }}
          >
            全选
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              onCheckAll(false);
            }}
          >
            全否
          </Button>
        </> : null}
        <Search
          size="small"
          placeholder="名称搜索..."
          key="search"
          onChange={e => onSearch(e.target.value)}
          allowClear
        />
      </div>
    ]}
    styles={{ body: bodyStyle }}
  >
    {items.length > 0 ?
      <>
        {ext}
        {chunk(items, chunkSpan).map((row, pindex) => {
          return (
            <Row key={'parent_' + pindex} gutter={16}>
              {row.map(chil => {
                return (
                  <Col span={24 / chunkSpan} key={chil.value}>
                    {chilRender ? chilRender(chil) : <Checkbox checked={value.includes(chil.value)} onChange={e => checkChange(chil.value)}>{chil.label}</Checkbox>}
                  </Col>
                );
              })}
            </Row>
          )
        })}
      </> : <div className="h-full flex justify-center items-center">
        <Empty className="h-[70%]" />
      </div>}
  </Card>
})
