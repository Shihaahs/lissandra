import {Component} from 'react'
import {Layout, message as msg} from 'antd'
import SiderMenu from '../components/SiderMenu/SiderMenu'
import {getMenuData} from '../commons/menu'
import logo from '../assets/logo.png'
import GlobalHeader from '../components/GlobalHeader'
import GlobalFooter from '../components/GlobalFooter'
import TyAPI from "../utils/TyAPI";

const {Content, Header} = Layout

class BasicLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            menuData: getMenuData()
        }

    }

    handleMenuCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount() {

        console.log(this.props);
        TyAPI.post('lissandra/public/find/user')
            .then(json => {
                if ("200" === json.code) {
                    let user = {
                        userId: json.data.userId,
                        userName: json.data.userName,
                        permission: json.data.permission,
                    };
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    //checkPermission(user);
                    console.log("权限校验");
                    if (user.permission === 0) {
                        this.props.location.pathname = "/lissandra/admin/registerCheck";
                        this.setState({
                            menuData: [...this.state.menuData].concat({
                                    name: '注册审核',
                                    icon: 'user-add',
                                    path: '/lissandra/admin/registerCheck',
                                },
                                {
                                    name: '充值/提现审核',
                                    icon: 'pay-circle',
                                    path: '/lissandra/admin/rechargeAndWithdrawCheck',
                                })
                        });
                        console.log("加载admin权限");
                    } else if (user.permission === 1) {
                        this.props.location.pathname = "/lissandra/mvo/productManage";
                        this.setState({
                            menuData: [...this.state.menuData].concat({
                                    name: '商品管理',
                                    icon: 'dashboard',
                                    path: '/lissandra/mvo/productManage',

                                },
                                {
                                    name: '订单管理',
                                    icon: 'form',
                                    path: '/lissandra/mvo/orderManage',
                                })
                        });
                        console.log("加载mvo权限");
                    } else if (user.permission === 2) {
                        this.props.location.pathname = "/lissandra/bvo/productSearch";
                        this.setState({
                            menuData: [...this.state.menuData].concat({
                                    name: '商品浏览',
                                    icon: 'schedule',
                                    path: '/lissandra/bvo/productSearch',
                                },
                                {
                                    name: '钱包管理',
                                    icon: 'red-envelope',
                                    path: '/lissandra/bvo/walletManage',
                                })
                        });
                        console.log("加载bvo权限");
                    }
                } else {
                    msg.error("当前用户未登录");
                    var loginURL = "http://" + location.hostname + ":8099/api/to/login";
                    console.log(loginURL);
                    location.href = loginURL;
                }
            });


    }

    render() {
        const {children, location} = this.props;
        const {collapsed} = this.state;

        return (
            <Layout>
                <SiderMenu
                    logo={logo}
                    collapsed={collapsed}
                    menuData={this.state.menuData}
                    location={location}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{padding: 0}}>
                        <GlobalHeader
                            logo={logo}
                            text={"电子商务借卖交易平台"}
                            collapsed={collapsed}
                            currentUser={{
                                name: '',
                            }}
                            onCollapse={this.handleMenuCollapse}
                        />
                    </Header>
                    <Content style={{margin: '24px 24px 0', height: '100%'}}>
                        {children}
                    </Content>
                    <GlobalFooter
                        copyright="Lissandra v1.0  ©Copyright ShiYiJie® 2018-2088"
                    >
                    </GlobalFooter>
                </Layout>
            </Layout>
        )
    }
}

function checkPermission(currentUser) {
    //权限认证


}

export default BasicLayout
