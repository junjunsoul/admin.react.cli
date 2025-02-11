// 用于存放全局状态，比如主题、菜单折叠、文档标题等
import { useState } from 'react';
export default function Page(){
  const [documentTitle, setDocumentTitle] = useState('Ant Design Pro');
  const [theme, setTheme] = useState('LEFT');
  const [collapsed, setCollapsed] = useState(false);
  return {
    documentTitle,
    setDocumentTitle,
    theme,
    setTheme,
    collapsed,
    setCollapsed,
  }
};
