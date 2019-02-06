import React, { Component } from 'react'
import store from './storeReactRedux'
import  { connect } from 'react-redux'
class ReactReduxTodoList extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    console.log(this.state)
    // this.changeInputValue = this.changeInputValue.bind(this)
  }
  
  // changeInputValue(e) {
  //   // inputValue: e.target.value

  // }
  render() {
    return (
      <div>
        <div>
          <input value={this.props.inputValue} onChange={this.props.changeInputValue}/>
          <button>提交</button>
        </div>
        <ul>
          {
            this.props.list.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue(e) {
      console.log(e.target.value)
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action)
    }
  }

}
// export default ReactReduxTodoList
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxTodoList)