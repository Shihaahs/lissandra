export default {
  '/mock/pandora/burypoint/list': (req, res, next) => {
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
                    "pointId": 1,
                    "appId": 2332164775485440,
                    "appName": "QQQQQQQ",
                    "pageNo": "CRM_Enterp_Update_HTML",
                    "pageName": "钉钉",
                    "pageUrl": "https://blog.csdn.net/u013628152/article/details/54909885"
                },
                {
                    "pointId": 2,
                    "appId": 2332164775485440,
                    "appName": "仓储管理系统",
                    "pageNo": "Mini_Company_List_HTML",
                    "pageName": "请求",
                    "pageUrl": "hahahhha.net"
                },
                {
                    "pointId": 3,
                    "appId": 2332164775485440,
                    "appName": "仓储管理系统",
                    "pageNo": "Mini_Company_List_HTML",
                    "pageName": "卖好车中心",
                    "pageUrl": "maihaoche.com/center/api"
                },
                {
                    "pointId": 4,
                    "appId": 2477145125310464,
                    "appName": "用户中心",
                    "pageNo": "99999",
                    "pageName": "啊啊啊",
                    "pageUrl": "55544333"
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