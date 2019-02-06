import React, { Component } from 'react';
import { Input, Button, List } from 'antd'

/** 当组件里面只有render函数时，可以使用无状态组件 比如UI组件
UI组件 dump组件  负责页面渲染
容器组件 smart组件 负责页面逻辑处理
*/
const TodoListUpgradeUI = (props) => {
    return (
      <div style={{marginTop: '10px', marginLeft: '10px'}}>
        <div>
          <Input 
            value={props.inputValue}
            placeholder='todo info' 
            style={{width: '300px'}}
            onChange={props.handleInputChange}
          />
          <Button type="primary" onClick={props.handleBtnClick}>提交</Button>
        </div>
        <List
          bordered
          dataSource={props.list}
          renderItem={(item, index) => (<List.Item onClick={() => {props.handleDeleteItem(index)}}>{item}</List.Item>)}
        />
      </div>
    )
}
export default TodoListUpgradeUI
// export default class TodoListUpgradeUI extends Component {
//   render() {
//     return (
//       <div style={{marginTop: '10px', marginLeft: '10px'}}>
//         <div>
//           <Input 
//             value={this.props.inputValue}
//             placeholder='todo info' 
//             style={{width: '300px'}}
//             onChange={this.props.handleInputChange}
//           />
//           <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
//         </div>
//         <List
//           bordered
//           dataSource={this.props.list}
//           renderItem={(item, index) => (<List.Item onClick={(index) => {this.props.handleDeleteItem(index)}}>{item}</List.Item>)}
//         />
//       </div>
//     )
//   }
// }

