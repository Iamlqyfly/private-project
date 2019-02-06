/** import()加载并且自动执行
 * 
 */
import( /* webpackChunkName: 'subPageA'*/ "./subPageA").then(function (subPageA) {
  console.log(subPageA)
})
import( /* webpackChunkName: 'subPageB'*/ "./subPageB").then(function (subPageB) {
  console.log(subPageB)
})

import( /* webpackChunkName: 'lodash'*/ "lodash").then(function (_) {
  console.log(_.join(["3", "2"]));
});
export default 'page';