import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default,
        "title": "没有该页面 | 统一埋点平台",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "没有该页面 | 统一埋点平台",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "title": "电子商务借卖交易平台 | 商品管理",
        "Routes": [require('../lissandra/mvo/productManage/index.js').default, require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 商品管理",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/lissandra/admin/rechargeAndWithdrawCheck",
        "exact": true,
        "component": require('../lissandra/admin/rechargeAndWithdrawCheck/index.js').default,
        "title": "电子商务借卖交易平台 | 充值/提现审核",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 充值/提现审核",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/lissandra/admin/registerCheck",
        "exact": true,
        "component": require('../lissandra/admin/registerCheck/index.js').default,
        "title": "电子商务借卖交易平台 | 注册审核",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 注册审核",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/lissandra/bvo/productSearch",
        "exact": true,
        "component": require('../lissandra/bvo/productSearch/index.js').default,
        "title": "电子商务借卖交易平台 | 商品浏览",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 商品浏览",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/lissandra/bvo/walletManage",
        "exact": true,
        "component": require('../lissandra/bvo/walletManage/index.js').default,
        "title": "电子商务借卖交易平台 | 钱包管理",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 钱包管理",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/lissandra/mvo/orderManage",
        "exact": true,
        "component": require('../lissandra/mvo/orderManage/index.js').default,
        "title": "电子商务借卖交易平台 | 订单管理",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 订单管理",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/lissandra/mvo/productManage",
        "exact": true,
        "component": require('../lissandra/mvo/productManage/index.js').default,
        "title": "电子商务借卖交易平台 | 商品管理",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "电子商务借卖交易平台 | 商品管理",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/pandora/accesslog",
        "exact": true,
        "component": require('../pandora/accesslog/index.js').default,
        "title": "统一埋点平台 | 日志明细",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "统一埋点平台 | 日志明细",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/pandora/accesslog/search",
        "exact": true,
        "component": require('../pandora/accesslog/search.js').default,
        "title": "统一埋点平台 | 日志明细",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "统一埋点平台 | 日志明细",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/pandora/appauth",
        "exact": true,
        "component": require('../pandora/appauth/index.js').default,
        "title": "统一埋点平台 | 项目管理",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "统一埋点平台 | 项目管理",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/pandora/burypoint",
        "exact": true,
        "component": require('../pandora/burypoint/index.js').default,
        "title": "统一埋点平台 | 埋点配置",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "统一埋点平台 | 埋点配置",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "path": "/pandora/userprint",
        "exact": true,
        "component": require('../pandora/userprint/index.js').default,
        "title": "统一埋点平台 | 用户登录",
        "Routes": [require('../../../node_modules/umi-plugin-react/lib/plugins/title/TitleWrapper.js').default],
        "_title": "统一埋点平台 | 用户登录",
        "_title_default": "电子商务借卖交易平台"
      },
      {
        "component": () => React.createElement(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "电子商务借卖交易平台",
        "_title_default": "电子商务借卖交易平台"
      }
    ],
    "_title": "电子商务借卖交易平台",
    "_title_default": "电子商务借卖交易平台"
  },
  {
    "component": () => React.createElement(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "电子商务借卖交易平台",
    "_title_default": "电子商务借卖交易平台"
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
