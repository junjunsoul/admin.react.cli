import React, { Component } from 'react';
import { Input, Checkbox, Row, Col, Empty, Card } from 'antd';
import { chunk, debounce, uniq } from 'lodash';
const { Search } = Input;
class DataCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      otherCheckedList:[]
    };
    this.onSearch = debounce(this.onSearch, 500);
  }
  static defaultProps = {
    showCheck: true,
    showLabel: true,
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.list.length != this.props.list.length) this.onSearch();
  }
  checkedOtherList(){
    const { list, checkedList = [] } = this.props;
    let arr = []
    checkedList.filter(value => {
      let keys = list.map(row=>row.value)
      if(keys.indexOf(value)<0){
        arr.push(value)
      }
    })
    this.setState({
      otherCheckedList:arr
    })
  }
  onSearch = value => {
    const { list } = this.props;
    if (value) {
      this.setState({
        list: list.filter(
          item => item.label.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
        ),
      });
    } else {
      this.setState({
        list,
      });
    }
  };
  onCheckAll = state => {
    const { list } = this.state;
    const { onChange, checkedList } = this.props;
    let arr = list.map(item => item.value);
    if (state) {
      onChange(uniq([...checkedList, ...arr]));
    } else {
      onChange(uniq(checkedList.filter(value => arr.indexOf(value) == -1)));
    }
  };
  componentDidMount(){
    this.checkedOtherList()
  }
  onChange(checkedList){
    const { onChange } = this.props;
    const { otherCheckedList } = this.state
    const value = [...checkedList,...otherCheckedList];
    onChange(uniq(value))
  }
  render() {
    const { list } = this.state;
    const {
      checkedList,
      chunkSpan,
      bodyStyle,
      title,
      chilRender,
      showCheck,
      showLabel,
      ext = null,
    } = this.props;
    let cardTitle = showLabel
      ? `${title} - 总 ${list.length} - 已选 ${checkedList.length}`
      : `${title}`;
    return (
      <Card
        size="small"
        title={cardTitle}
        extra={[
          showCheck ? (
            <span key="checkAll" style={{ marginRight: 10 }}>
              <a
                onClick={() => {
                  this.onCheckAll(true);
                }}
              >
                全选
              </a>
              <a
                style={{ marginLeft: 10 }}
                onClick={() => {
                  this.onCheckAll(false);
                }}
              >
                全否
              </a>
            </span>
          ) : null,
          <Search
            size="small"
            placeholder="名称搜索..."
            key="search"
            onChange={e => this.onSearch(e.target.value)}
            allowClear
            style={{ width: 200 }}
          />,
        ]}
        bodyStyle={bodyStyle}
      >
        {list.length > 0 ? (
          <Checkbox.Group style={{ width: '100%' }} onChange={(values)=>this.onChange(values)} value={checkedList}>
            <>
              {ext}
              {chunk(list, chunkSpan).map((row, pindex) => {
                return (
                  <Row key={'parent_' + pindex} gutter={16}>
                    {row.map(chil => {
                      return (
                        <Col span={24 / chunkSpan} key={chil.value}>
                          {chilRender ? (
                            chilRender(chil)
                          ) : (
                            <Checkbox value={chil.value}>{chil.label}</Checkbox>
                          )}
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
            </>
          </Checkbox.Group>
        ) : (
          <Empty style={{ height: '80%' }} imageStyle={{ height: '80%' }} />
        )}
      </Card>
    );
  }
}
export default DataCart;
