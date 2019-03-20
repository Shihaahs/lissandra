export default {
    '/mock/lissandra/public/find/user': (req, res, next) => {
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
                        "id": 1,
                        "name": "shishasha"
                    },{
                        "id": 2,
                        "name": "shashashi"
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