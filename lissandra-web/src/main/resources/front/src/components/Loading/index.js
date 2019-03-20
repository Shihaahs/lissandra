import React, {PureComponent} from 'react'
import styles from './index.less'
import {Spin, Skeleton} from 'antd'

export default class Loading extends PureComponent {
  constructor() {
    super()
  }
  
  render() {
    return (
        <div className={[styles.Loading, this.props.stop ? styles.out : ''].join(' ')}>
          <Skeleton active/>
          <div className={styles.info}>
            <Spin size="large" className={styles.logo}/>
            <div className={styles.text}>正在载入</div>
          </div>
        </div>
    )
  }
}