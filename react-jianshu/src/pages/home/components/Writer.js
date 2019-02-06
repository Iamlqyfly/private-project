import React, { PureComponent } from 'react'
import { WriterWrapper } from '../style'

// class Writer extends PureComponent {
//   render() {
//     return (
//       <WriterWrapper>HomeWork</WriterWrapper>
//     )
//   }
// }

// export default Writer

/** 
 * 使用无状态组件提高性能
如此组件没有状态的影响或者仅仅纯静态展示时，
完全可以用无状态组件来替代有状态组件，
因其除render无任何其他生命周期方法且仅仅
返回的是个函数，无实例化过程，大大提升了性能
 */

const Writer = () => <WriterWrapper>Welcome</WriterWrapper>;

export default Writer;