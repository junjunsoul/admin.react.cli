import React, { Component } from 'react';
import { Empty, Card, Row, Col } from 'antd';
import styles from './index.less';
class SelectCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVlaue: { value: '' },
    };
  }
  static defaultProps = {
    rowSpan: [15, 9],
  };
  onSelect = item => {
    const { onSelect } = this.props;
    this.setState({
      selectVlaue: item,
    });
    onSelect(item);
  };

  renderItem = item => {
    const { selectVlaue } = this.state;
    const { rowSpan } = this.props;
    return (
      <div onClick={() => this.onSelect(item)} key={item.value}>
        <Row className={`${styles['selectItem']} ${item.value === selectVlaue.value ? styles['active'] : null}`}>
          <Col span={rowSpan[0]}>{item.label}</Col>
          <Col span={rowSpan[1]} className={styles.extra}>
            {item.extra}
          </Col>
        </Row>
      </div>
    );
  };
  render() {
    const { bodyStyle, title, list } = this.props;
    return (
      <Card title={title} bodyStyle={{ ...bodyStyle, padding: '5px 0' }} size="small">
        {list.length > 0 ? (
          list.map(item => this.renderItem(item))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
    );
  }
}

export default SelectCart;
