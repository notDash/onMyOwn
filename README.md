# onMyOwn

## Javascript learning

### Chapter 1   Create Objects

#### 1. 工厂模式创建对象
     我们知道， 在javascript中没有类的概念。但是javascript中有Object对象存在。我们可以使用new的方式来创建一个对象实例：
     var obj = new Object();
     或者使用对象字面量的方式来创建：
     var anotherObj={}。
     那我们如何去创建一个具有特定属性和方法的对象实例呢？可以有如下的方式来实现（使用上面创建的对象为例）
         obj.name = 'lee';
         obj.age = 23;
         obj.sayName = function(){
             alert(this.name);
         };
    工厂模式创建对象：








