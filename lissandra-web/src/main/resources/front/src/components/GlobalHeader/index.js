import React, {PureComponent} from 'react'
import {Menu, Icon, Spin, Dropdown, Avatar, Divider} from 'antd'
import Debounce from 'lodash-decorators/debounce'
import Link from 'umi/link'
import styles from './index.less'
import TyAPI from '../../utils/TyAPI'
import TyHistory from "../../utils/TyHistory";

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
            <h1 style={{display:"inline-block"}}>电子商务借卖交易平台</h1>
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
  
  onMenuClick({ item, key, keyPath }) {
    if (key === 'logout') {
      location.href = '/api/logout'
    }
  }

  componentDidMount() {
    TyAPI.post('lissandra/public/find/user.json')
        .then(json => {
            this.setState({
              userName: json.data.userName
          });
            let user = {
                userId : json.data.userId,
                userName : json.data.userName
            };
            localStorage.setItem("currentUser", JSON.stringify(user));
        });
  }
}
