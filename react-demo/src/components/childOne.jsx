export default class ChildOne extends React.Component {
  handleChange = (e) => {
    const { changeValue } = this.context
    changeValue(e.target.value)
  }

  render () {
    return (
      <div>
        子组件-
        <input onChange={this.handleChange} />>
      </div>
    )
  }
}

ChildOne.contextTypes = {
  changeValue: PropTypes.func
}