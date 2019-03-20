export default {
  '/mock/pandora/appauth/list': (req, res, next) => {
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
            pageData: [
                {
                    "appAuthId": 1,
                    "appId": 2332164775485440,
                    "appName": "QQQQQQQ",
                    "userId": "11111111111111",
                    "userName": "石傻傻",
                },
                {
                    "appAuthId": 2,
                    "appId": 2332164775485440,
                    "appName": "仓储管理系统",
                    "userId": "11111111111111",
                    "userName": "石傻傻",
                },
                {
                    "appAuthId": 3,
                    "appId": 2332164775485440,
                    "appName": "仓储管理系统",
                    "userId": "11111111111111",
                    "userName": "石傻傻",
                },
                {
                    "appAuthId": 4,
                    "appId": 2477145125310464,
                    "appName": "用户中心",
                    "userId": "11111111111111",
                    "userName": "石傻傻",
                }
            ],
            pageSize:size ? Number.parseInt(size) : 10,
            totalCount: 403,
            totalPage: 88
        }
      })
    }, 100 * ((Math.random() * 10) % 10))
  }
}