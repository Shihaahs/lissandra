export default {
    'POST /mock/pandora/accesslog/get': (req, res, next) => {
        setTimeout(() => {
            if (Math.ceil(Math.random() * 10) % 2 === 0) {
                res.json({
                    success: false,
                    code: 500,
                    message: '服务器错误',
                    data: {}
                })
                return
            }
            res.json({
                success: true,
                code: 200,
                message: '',
                data: {
                        "logExtId": '',
                        "logId": '',
                        "userId": '',
                        "pageNo": '',
                        "pageName": '222',
                        "extFieldJson": '2222',
                    }
                })
        }, 100 * ((Math.random() * 10) % 10))
    }
}