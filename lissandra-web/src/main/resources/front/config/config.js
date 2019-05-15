export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: {
                immer: true
            },
            title: {
                defaultTitle: '电子商务借卖交易平台'
            }
        }],
        ['umi-plugin-routes', {
            exclude: [
                /models/,
                /services/,
                /components/
            ]
        }]
    ],
    history: 'hash',
    proxy: {
        '/api': {
            target: 'http://localhost:8099',
            changeOrigin: true,
        },
    }
}
