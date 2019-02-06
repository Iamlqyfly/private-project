export default class ChildTwo extends React.Component {
  render() {
    return (
      <div>
        子组件二
        <p>{this.context.value}</p>
      </div>
    )
  }
}

ChildTwo.contextTypes = {
  value: PropTypes.string
}