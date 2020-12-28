const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')


/*
  练习1: 
  实现函数 ex1 
  使用 fp.add(x, y) 和 fp.map(f, x)
  让函子里的值 增加1
*/
// 1.创建一个函子
let maybe = Maybe.of([5, 6, 1])

// 2.实现 ex1 函数

// 3.调用测试
console.log( maybe.map(ex1) )  // Maybe { _value: [ 6, 7, 2 ] }


/*
  练习2:
  实现 ex2 函数
  函数中使用 fp.first 获取列表的第一个元素
*/
// 1.生成一个函子
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

// 2.实现 ex2

// 3.测试打印
// console.log( xs.map(ex2) )  // Container { _value: 'do' }


/*
  练习3:
  实现 ex3 函数
  使用 safeProp 和 fp.first 找到 user 的名字的首字母
*/
let safeProp = fp.curry(function (x, o) {
	return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert'}

// 1.实现 ex3

// 2.测试打印
console.log( ex3() ) // Maybe { _value: 'A' }


/*
  练习4:
  实现 ex4 函数
  把参数转为整数,并且返回相应函子
  要求使用 Maybe 
*/

// 1.实现 ex4 函数

// 2.测试打印
console.log( ex4('7R') )   // Maybe { _value: 7 }