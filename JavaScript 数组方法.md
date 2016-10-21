
# JavaScript 数组方法

## 检测数组

### 1. instanceof 
    if(value instanceof Array){}  在同一个执行环境的情况下是可以的，但是在不同z的执行环境下会存在不同的Array构造函数
### 2. ES5  Array.isArray()
    if(Array.isArray(value)){} // 支持： IE9+、Firefox4+、Safari5+、Opera 10.5+、Chrome

## Array的方法
### 1. 转换方法
    所有对象都有toLocaleString()、toString()、valueOf()方法， 调用数组的toString()、valueOf()会返回相同的值。调用数组的toString()、valueOf()会调用数组每一项的toString()方法调用数组的toLocaleString()h方法会调用数组每一项的toLocaleString()方法。
    join(param) ，如果不给join()方法传递参数或者传递undefined则使用逗号作为分隔符。// IE7以及更早的版本会错误的使用字符串“undefined”作为分隔

### 2. 栈方法
    > push()
    > pop()
### 3. 队列方法
    > shift()
    > unshift()

### 4. 重排序方法
    > sort()
    > reverse()
    
### 5. 操作方法
    > concat()
    > slice()
    > splice()
    
### 6. 位置方法    
    > indexOf()
    > lastIndexOf()
    
### 7. 迭代方法
    > every()
    > some()
    > filter()
    > map()
    > forEach()
    
### 8. 缩小方法
    > reduce()
    > reduceRight()
    








