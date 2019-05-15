export default {
    '/mock/pandora/appauth/add': (req, res, next) => {
        setTimeout(() => {
            if (Math.ceil(Math.random() * 10) % 10 === 4) {
                res.json({
                    success: false,
                    code: 500,
                    message: '服务器错误',
                    data: {}
                });
                return
            }
            const {current, size} = req.query;
            res.json({
                success: true,
                code: 200,
                message: '',
                data: {
                    pageCurrent: current ? Number.parseInt(current) : 1,
                    pageData: [{
                        "appId": 281453627489587200,
                        "appName": "统一埋点平台x"
                    }, {
                        "appId": 2222222222222222,
                        "appName": "x统一aa平台x"
                    }

                    ],
                    pageSize: size ? Number.parseInt(size) : 10,
                    totalCount: 403,
                    totalPage: 88
                }
            })
        }, 100 * ((Math.random() * 10) % 10))
    }
}