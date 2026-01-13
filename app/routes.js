import {
    route,
    layout,
    index,
} from "@react-router/dev/routes";
export default [
    layout('layout/basic.jsx', [
        index("pages/home.jsx"),
        route('/settings/user','pages/settings/user.jsx'),
        route('/settings/role','pages/settings/role.jsx'),
        route('/settings/interface','pages/settings/interface.jsx'),
        route('/about','pages/about.jsx'),
        route('/antd-demo','pages/antd-demo.jsx'),
    ]),
]

