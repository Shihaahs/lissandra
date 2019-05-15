export default {
  '/mock/lissandra/bvo/walletManage/recharge': (req, res, next) => {
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
                    "logId": 1,
                    "appId": 2332164775485440,
                    "appName": "仓储管理系统",
                    "pageNo": "CRM_Enterp_Update_HTML",
                    "userId": 6338921715092898000,
                    "userName": "荣飞",
                    "deviceId": "MI6_GTForce_2080Ti",
                    "sourceIp": "10.112.48.2",
                    "visitTime": "2018-12-20 10:41:18",
                    "curUrl": "https://blog.csdn.net/u013628152/article/details/54909885",
                    "refUrl": "https://blog.csdn.net/u013628152/article/details/54909885",
                    "spmId": 10000
                },
                {
                    "logId": 2,
                    "appId": 2477145125310464,
                    "appName": "用户中心",
                    "pageNo": "Mini_Company_List_HTML",
                    "userId": 6338921719345922000,
                    "userName": "红保",
                    "deviceId": "iPone X Mac_DCF212FR65H",
                    "sourceIp": "192.168.27.68",
                    "visitTime": "2018-12-22 10:49:27",
                    "curUrl": "http://www.cnblogs.com/java-class/p/4727698.html",
                    "refUrl": "http://www.cnblogs.com/java-class/p/4727698.html",
                    "spmId": 20000
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