export default {
  baseURL: '/api',

    lissandra: {

        mvo: {
            productManage: {
                list: 'mvo/list/product/all.json',
                add: 'mvo/add/product.json',
                delete: 'mvo/delete/product.json',
                update: 'mvo/update/product/info.json',
                shelf: 'mvo/update/product/isShelf.json'
            },
            orderManage: {
                list: 'mvo/list/order/all.json',
                get: 'mvo/get/order.json'
            },
        },

        bvo: {
            productSearch: {
                list: 'bvo/list/product/all.json'
            },
            walletManage: {
                list: 'bvo/list/wallet/order/user.json',
                balance: 'bvo/get/wallet/balance/user.json',
                recharge: 'bvo/wallet/order/recharge.json',
                withdraw: 'bvo/wallet/order/withdraw.json'
            },
        },

        admin: {
            registerCheck: {
                approval: 'admin/is/approval/register.json',
                check: 'admin/list/check/register.json'
            },
            rechargeAndWithdrawCheck: {
                check: 'admin/list/check/walletOrder.json',
                update: 'admin/update/walletOrderState.json',
            },
        },

        public: {
            find:{
                user: 'public/find/user.json'
            }
        },
        logout: 'logout.json'

    },

}
