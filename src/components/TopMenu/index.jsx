import { Link } from '@umijs/max';
import { chunk } from 'lodash'
import { createFromIconfontCN } from '@ant-design/icons';
import styles from './index.less';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_777628_zvzd824mgyr.js', // 在 iconfont.cn 上生成
});
function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}
function TopMenu(props) {
  const { pathname, menuData } = props
  const selectedKey = urlToList(pathname);
  const getNavMenuItems = (menusData, level = 1) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.label)
      .map(item => getSubMenuOrItem(item, level))
      .filter(item => item);
  };
  const getChunkMenuItem = (item, level) => {
    let res = getNavMenuItems(item.children, level);
    //取没有children
    let noChildArr = [];
    let hasChildArr = [];
    //取有children
    res.forEach(row => {
      if (row.type == 'dd') {
        noChildArr.push(row);
      } else if (row.type == 'div') {
        hasChildArr.push(row);
      }
    });
    let arr = [];
    if (noChildArr.length) {
      arr.push([...noChildArr, ...hasChildArr.splice(0, 1)]);
    }
    arr.push(...chunk(hasChildArr, 2));
    return arr.map((row, index) => (
      <div key={index} className={styles.chunkItem}>
        {row}
      </div>
    ));
  };
  //最多显示三级菜单
  const getSubMenuOrItem = (item, level) => {
    const { label } = item;
    let node = null;
    if (item.children && item.children.some(child => child.label)) {
      switch (level) {
        case 1:
          item.children.sort((a, b) => {
            const d1 = a.children ? 1 : 0;
            const d2 = b.children ? 1 : 0;
            return d1 - d2;
          });
          node = (
            <li
              key={item.label + '_1'}
              className={selectedKey.indexOf(item.path) > -1 ? styles['active'] : null}
            >
              <a>{label}</a>
              <div className={styles['nav-dropdown']} style={item.children.length > 4 ? { marginLeft: item.left } : {}}>
                <div className={styles['tool-panel']}>
                  <div className={styles['level1']}>{getChunkMenuItem(item, 2)}</div>
                </div>
              </div>
            </li>
          );
          break;
        case 2:
          node = (
            <div className={styles['tool-list']} key={item.label + '_2'}>
              <div className={styles['tool-title']}>{label}</div>
              <ul>{getNavMenuItems(item.children, 3)}</ul>
            </div>
          );
          break;
      }
      return node;
    }
    //获取路由节点
    switch (level) {
      case 1:
        node = (
          <li
            key={item.label + '_1'}
            className={selectedKey.indexOf(item.path) > -1 ? styles['active'] : null}
          >
            {getMenuItemPath(item)}
          </li>
        );
        break;
      case 2:
        node = (
          <dd
            key={item.label + '_2'}
            className={selectedKey.indexOf(item.path) > -1 ? styles['active'] : null}
          >
            {getMenuItemPath(item)}
            {getInPagePath(item)}
          </dd>
        );
        break;
      default:
        node = (
          <li
            key={item.path + Math.random()}
            className={selectedKey.indexOf(item.path) > -1 ? styles['active'] : null}
          >
            {getMenuItemPath(item)}
            {getInPagePath(item)}
          </li>
        );
        break;
    }
    return node;
  };

  const getMenuItemPath = item => {
    const { label } = item;
    const itemPath = conversionPath(item.path);
    const { target } = item;

    return (
      <Link to={itemPath} target={target || '_self'} replace={itemPath === pathname}>
        <span>{label} </span>
      </Link>
    );
  };

  const getInPagePath = item => {
    const itemPath = conversionPath(item.path);
    return (
      <Link
        to={itemPath}
        className={styles.inPage}
        target="_blank"
        title="打开新页面"
        replace={itemPath === pathname}
      >
        <IconFont type="icon-iosbrowsersoutline" theme="outlined" />
      </Link>
    );
  };

  const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };
  return <div className={styles['nav-left']}>
    <ul>{getNavMenuItems(menuData)}</ul>
  </div>
}
export default TopMenu
