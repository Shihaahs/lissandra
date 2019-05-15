import React, {PureComponent} from 'react'
import styles from './index.less'

export default class NotAllowed extends PureComponent {
  render(content = '非法访问') {
    return (
      <div className={styles.NotFound}>
        <h1 className={styles.title}>{this.props.content || content}</h1>
      </div>
    )
  }
}

export class NotFound extends NotAllowed {
  render(content) {
    return super.render('没有该页面')
  }
}

export class NotImplemented extends NotAllowed {
  render(content) {
    return super.render('该页面未实现')
  }
}