export default {
  '/mock/pandora/userprint/list': (req, res, next) => {
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
                    "printId": 1,
                    "userId": 6338921715092898000,
                    "userName": "荣飞",
                    "deviceId": "MI6_GTForce_2080Ti",
                    "loginTime": "2018-12-18 11:04:37",
                    "appId": 2332164775485440,
                    "appName": "仓储管理系统"
                },
                {
                    "printId": 2,
                    "userId": 6338921719345922000,
                    "userName": "红保",
                    "deviceId": "iPone X Mac_DCF212FR65H",
                    "loginTime": "2018-12-21 11:05:27",
                    "appId": 2477145125310464,
                    "appName": "用户中心"
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