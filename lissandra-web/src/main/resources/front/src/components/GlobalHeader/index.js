import React, {PureComponent} from 'react'
import {Menu, Icon, Spin, Dropdown, Avatar, Divider} from 'antd'
import Debounce from 'lodash-decorators/debounce'
import Link from 'umi/link'
import styles from './index.less'
import TyAPI from '../../utils/TyAPI'
import {message as msg} from 'antd'

export default class GlobalHeader extends PureComponent {
    constructor() {
        super()
        this.state = {
            userName: '',
        }
    }

    componentWillUnmount() {
        this.triggerResizeEvent.cancel()
    }

    toggle = () => {
        const {collapsed, onCollapse} = this.props
        onCollapse(!collapsed)
        this.triggerResizeEvent()
    }

    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, false)
        window.dispatchEvent(event)
    }

    render() {
        const {
            logo,
            collapsed,
            isMobile,
        } = this.props
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick.bind(this)}>
                <Menu.Item key="logout">
                    <Icon type="logout"/>退出登录
                </Menu.Item>
            </Menu>
        )
        return (
            <div className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32"/>
                    </Link>,
                    <Divider type="vertical" key="line"/>
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <h1 style={{display: "inline-block"}}>电子商务借卖交易平台</h1>
                <div className={styles.right}>
                    {this.state.userName ? (
                        <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <span>{this.state.userName}</span>
              </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{marginLeft: 8}}/>
                    )}
                </div>
            </div>
        )
    }

    onMenuClick({item, key, keyPath}) {
        if (key === 'logout') {
            TyAPI.post("lissandra/logout")
                .then(json => {
                    if ("200" === json.code) {
                        localStorage.removeItem("currentUser");
                        var loginURL = "http://" + location.hostname + ":8099/api/to/login";
                        console.log(loginURL);
                        location.href = loginURL;
                    } else {
                        msg.error("登出失败");
                    }
                })
        }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser == null) {
            console.log("post user global");
            TyAPI.post('lissandra/public/find/user')
                .then(json => {
                    if ("200" === json.code) {
                        let user = {
                            userId: json.data.userId,
                            userName: json.data.userName,
                            permission: json.data.permission,
                        };
                        this.setState({
                            userName: json.data.userName,
                        });
                        localStorage.setItem("currentUser", JSON.stringify(user));
                    } else {
                        msg.error("当前用户未登录");
                        var loginURL = "http://" + location.hostname + ":8099/api/to/login";
                        console.log(loginURL);
                        location.href = loginURL;
                    }
                });
        }
        if (currentUser && currentUser.userName) {
            this.setState({
                userName: currentUser.userName
            });
        }
        /*TyAPI.post('lissandra/public/find/user.json')
            .then(json => {
                if ("200" === json.code) {
                    this.setState({
                        userName: json.data.userName
                    });
                    let user = {
                        userId: json.data.userId,
                        userName: json.data.userName,
                        permission: json.data.permission,
                    };
                    localStorage.setItem("currentUser", JSON.stringify(user));
                } else {
                    msg.error("当前用户未登录");
                    location.href = "http://127.0.0.1:8099/api/to/login";
                }
            });*/
    }
}
