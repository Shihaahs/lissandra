import {Component} from 'react'
import {Layout} from 'antd'
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
        //验证管理者，只有管理者是石傻傻，
        //才开放应用管理界面
        /*TyAPI.post('public/find/user')
            .then(json => {
                if (json.data.loginName === '石傻傻') {
                    this.setState({
                        menuData: [... this.state.menuData].concat({
                            name: '项目管理',
                            icon: 'code',
                            path: 'pandora/appauth',
                        })
                    })
                }
            });*/
    }

    render() {
        const {children, location} = this.props
        const {collapsed} = this.state

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

export default BasicLayout
