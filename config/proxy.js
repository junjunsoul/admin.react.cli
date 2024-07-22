const { NODE_ENV } = process.env;
function targetUrl() {
    if (NODE_ENV == 'development') {
        let url = ''
        try {
            const { target } = require('./setting.js')
            url = target
        } catch { }
        return url
    }
    return ''
}
export default {
    dev: {
        '/v1': {
            target: targetUrl(),
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            }
        },
    }
};
