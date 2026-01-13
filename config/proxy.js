const { NODE_ENV } = process.env;
async function targetUrl() {
    if (NODE_ENV == 'development') {
        let url = ''
        try {
            const { default: { target } } = await import('./setting.js')
            url = target
        } catch { }
        return url
    }
    return ''
}
export default {
    dev: {
        '/api': {
            target:await targetUrl(),
            changeOrigin: true,
            headers: {
                Connection: 'keep-alive',
            }
        }
    }
};
