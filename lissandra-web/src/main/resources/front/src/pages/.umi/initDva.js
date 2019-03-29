import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'rechargeAndWithdrawCheck', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/lissandra/admin/rechargeAndWithdrawCheck/models/rechargeAndWithdrawCheck.js').default) });
app.model({ namespace: 'registerCheck', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/lissandra/admin/registerCheck/models/registerCheck.js').default) });
app.model({ namespace: 'productSearch', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/lissandra/bvo/productSearch/models/productSearch.js').default) });
app.model({ namespace: 'walletManage', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/lissandra/bvo/walletManage/models/walletManage.js').default) });
app.model({ namespace: 'orderManage', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/lissandra/mvo/orderManage/models/orderManage.js').default) });
app.model({ namespace: 'productManage', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/lissandra/mvo/productManage/models/productManage.js').default) });
app.model({ namespace: 'accesslog', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/pandora/accesslog/models/accesslog.js').default) });
app.model({ namespace: 'appauth', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/pandora/appauth/models/appauth.js').default) });
app.model({ namespace: 'burypoint', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/pandora/burypoint/models/burypoint.js').default) });
app.model({ namespace: 'userprint', ...(require('/Users/wuer/WorkSpace/IdeaWorkspace/lissandra/lissandra-web/src/main/resources/front/src/pages/pandora/userprint/models/userprint.js').default) });
