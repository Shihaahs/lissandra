export default {
    baseURL: '/mock/lissandra',
    lissandra: {

        mvo: {
            productManage: {
                list: 'mvo/productManage/list',
                add: 'mvo/productManage/add',
                delete: 'mvo/productManage/delete',
                update: 'mvo/productManage/update',
                shelf: 'mvo/productManage/shelf'
            },
            orderManage: {
                list: 'mvo/orderManage/list',
                get: 'mvo/orderManage/get'
            },
        },

        bvo: {
            productSearch: {
                list: 'bvo/productSearch/list'
            },
            walletManage: {
                list: 'bvo/walletManage/list',
                balance: 'bvo/walletManage/balance',
                recharge: 'bvo/walletManage/recharge',
                withdraw: 'bvo/walletManage/withdraw'
            },
        },

        admin: {
            registerCheck: {
                approval: 'admin/registerCheck/approval',
                check: 'admin/registerCheck/check'
            },
            rechargeAndWithdrawCheck: {
                check: 'admin/rechargeAndWithdrawCheck/check',
                update: 'admin/rechargeAndWithdrawCheck/update',
            },
        },

        public: {
            find:{
                user: 'public/find/user'
            }
        },

        logout: 'logout'
    }



}
