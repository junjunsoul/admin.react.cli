import React, { Component } from 'react';
import { Button, Icon, Row, Col } from 'antd';
import styles from './index.less';
class BlockWrap extends Component {
  static defaultProps = {
    expand: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      show: props.expand,
    };
  }
  render() {
    const { title, children } = this.props;
    const { show } = this.state;
    return (
      <div className={styles.blockWrap}>
        <h4 className={styles.title} style={{ borderBottom: show ? '1px solid #e8e8e8' : 'none' }}>
          <Row
            onClick={() => {
              this.setState({ show: !show });
            }}
          >
            <Col span={22}>{title}</Col>
            <Col span={2}>
              <Button type="link" size="small">
                {show ? <Icon type="up" /> : <Icon type="down" />}
              </Button>
            </Col>
          </Row>
        </h4>
        <div className={styles.wrap} style={{ display: show ? 'block' : 'none' }}>
          {children}
        </div>
      </div>
    );
  }
}
export default BlockWrap;
