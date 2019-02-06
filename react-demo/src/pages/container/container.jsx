import Parent from '.../parent'
import childOne from '../components/childOne'
import childTwo from '../components/childTwo'

export default class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }
  changeValue = value => {
    this.setState({value})
  }

  getChildContext() {
    return {
      value: this.state.value,
      changeValue: this.changeValue
    }
  }
  render() {
    return (
      <div>
        <Parent>
          <childOne />
        </Parent>
        <Parent>
          <childTwo />
        </Parent>
      </div>
    )
  }
}

Container.childContextTypes = {
  value: PropTypes.string,
  changeValue: PropTypes.func
}