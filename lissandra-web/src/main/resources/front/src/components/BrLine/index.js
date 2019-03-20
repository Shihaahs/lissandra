import React, {PureComponent} from 'react'

export default class BrLine extends PureComponent {
  render() {
    return <div style={{height: (this.props.height || '2') + 'em'}}/>
  }
}
