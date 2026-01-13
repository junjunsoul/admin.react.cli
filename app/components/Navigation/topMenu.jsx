import {
    Link,
} from "react-router";
import RightContent from './components/RightContent';
import ThemeToggle from './components/ThemeToggle';
export default (props) => {
    const { list, onChange, level } = props;
    const onClick = (item) => {
        onChange(item.key);
    }
    return <nav className="fixed top-0 z-60 w-full h-16 px-6 box-border bg-yy-800 text-yy-50 shadow-lg border-b border-yy-700">
        <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-primary-400 hover:text-primary-300">
                React App
            </Link>
            {/* 主题切换 */}
            <div className="flex items-center gap-4">
                 {/* 导航链接 */}
                <div className="hidden md:flex gap-2">
                    {list.map(row => (
                        <span key={row.key} className={`relative cursor-pointer px-2 py-2 flex items-center gap-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-gray-500 font-medium transition-colors after:transition-all after:duration-300 ${level === row.key ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`} onClick={() => onClick(row)}>
                            {row.label}
                        </span>
                    ))}
                </div>                
                <ThemeToggle />
                <RightContent />
            </div>
        </div>
    </nav>
}