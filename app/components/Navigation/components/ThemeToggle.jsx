import { Popover } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/store/themeStore";
import Icon from "@/components/Icon";
export default function ThemeToggle({ }) {
  const theme = useThemeStore();
  return <div onClick={() => theme.toggleTheme()} className="theme-toggle-hover p-2 cursor-pointer flex items-center justify-center text-xl relative overflow-hidden">
    {theme.theme === "light" ? <SunOutlined /> : <MoonOutlined />}
  </div>
}
