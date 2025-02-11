import { useModel } from '@umijs/max';
import logo from '../assets/home.png';
function Page(props) {
    const { documentTitle } = useModel('global')
    return <div className="min-page">
        <div className="desc">
            <div className="title">欢迎使用…</div>
            <div className="subtitle">{documentTitle}</div>
        </div>
        <img className="pic" width={350} src={logo} />
    </div>
}
export default Page