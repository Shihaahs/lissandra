import React, {Fragment, PureComponent} from 'react'
import styles from './index.less'

export default class PageContainer extends PureComponent {
  render() {
    return (
        <Fragment>
          {this.props.header &&
          <div className={styles.PageHeader}>{this.props.header}</div>
          }
          <div className={
            [
              styles.PageContainer,
              this.props.noAnimation ? '' : styles.animation
            ].join(' ')
          }>
            {this.props.content}
          </div>
        </Fragment>
    )
  }
}