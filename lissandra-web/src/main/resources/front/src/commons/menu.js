/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

export function isUrl(path) {
    return reg.test(path)
}

const menuData = [
    {
        name: '商品管理',
        icon: 'dashboard',
        path: 'mvo/productManage',

    },
    {
        name: '订单管理',
        icon: 'form',
        path: 'mvo/orderManage',
    },
    {
        name: '商品浏览',
        icon: 'schedule',
        path: 'bvo/productSearch',
    },
    {
        name: '钱包管理',
        icon: 'red-envelope',
        path: 'bvo/walletManage',
    },
    {
        name: '注册审核',
        icon: 'user-add',
        path: 'admin/registerCheck',
    },
    {
        name: '充值/提现审核',
        icon: 'pay-circle',
        path: 'admin/rechargeAndWithdrawCheck',
    },

];

function formatter(data, parentPath = '/lissandra/', parentAuthority) {
    return data.map(item => {
        let {path} = item;
        if (!isUrl(path)) {
            path = parentPath + item.path
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        };
        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority)
        }
        return result
    });
}


export const getMenuData = () => formatter(menuData);
