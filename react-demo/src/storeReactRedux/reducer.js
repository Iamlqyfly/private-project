const defaultState = {
  inputValue: 'he',
  list: [1,22]
}

export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state)) //  拷贝之前的数据
    newState.inputValue = action.value
    console.log(newState,1)
    return newState
  }
  return state
}