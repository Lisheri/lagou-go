# Part1-2 作业

( 请在当前文件直接作答 )

## 简答题

### 1. 请说出下列最终执行结果，并解释为什么?

```javascript
var a = [];
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]()
```

　

　

### 2. 请说出此案列最终执行结果，并解释为什么?

```javascript
var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp;
}
```

　

　

### 3. 结合ES6语法，用最简单的方式找出数组中的最小值

```javascript
var arr = [12, 34, 32, 89, 4]
```

　

　

### 4. 请详细说明var、let、const三种声明变量的方式之间的具体差别

　

　

### 5. 请说出下列代码最终输出结果，并解释为什么？

```javascript
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn()
```

　

　

### 6. 简述Symbol类型的用途

　

　

### 7. 说说什么是浅拷贝，什么是深拷贝？

　

　

### 8. 请简述TypeScript与JavaScript之间的关系？

　

　

### 9. 请谈谈你所认为的typescript优缺点

　

　

### 10. 描述引用计数的工作原理和优缺点

　

　

### 11. 描述标记整理算法的工作流程

　

　

### 12.描述V8中新生代存储区垃圾回收的流程

　

　

### 13. 描述增量标记算法在何时使用及工作原理

　

　