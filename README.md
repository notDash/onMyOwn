# onMyOwn

## Javascript learning

### Chapter 1   Create Objects
	我们知道， 在javascript中没有类的概念。但是javascript中有Object对象存在。我们可以使用new的方式来创建一个对象实例：
 		var obj = new Object();
 	或者使用对象字面量的方式来创建：
 		var anotherObj={}。
 	那我们如何去创建一个具有特定属性和方法的对象实例呢？可以有如下的方式来实现（使用上面创建的对象为例）：
		obj.name = 'lee';
		obj.age = 23;
		obj.sayName = function(){
			alert(this.name);
		};
	这样，我们就创建了一个具有两个属性和一个方法的对象。如果这个时候我们想再创建一个具有相同该属性的对象实例，则只能再重复一遍以上的操作。此时根据面向对象的编程思想，我们可能会想通过一种方式来创建一类具有相同属性和方法的对象。不需要再去写重复的代码，只需要实现就好了。
####1. 工厂模式创建对象
	工厂模式创建对象：顾名思义，我们希望通过工厂来创建一类具有相同属性和方法的实例。以Person为例，我们想创建几个Person的实例。首先定义一个创建Person对象的工厂方法：
		var createPerson = function(name, age) {
			var o = new Object();
			o.name = name;
			o.age = age;
			o.sayName = function(){
				console.log(this.name);
			};
			return o;
		};

		var person1 = createPerson("zhangsan", 28);
		person1.sayName(); // 输出“zhangsan”

		var person2 = createPerson("lisi", 28);
		person2.sayName(); // 输出“lisi”

	这样我们就创建了一个Person对象的工作方法，每次调用createPerson方法的时候都回去创建一个具有给定属性和方法的对象。但是工厂模式创建对象有一个不足的地方就是我们没法使用instanceof去判断对象类型。此时我们可以使用构造函数模式去创建对象。

####2. 构造函数模式创建对象
	熟悉面向对象方法编写程序的程序员大都熟悉类的这个概念。我们创建一个类，封装某些属性和方法，并且类名首字母约定为大写。例如Person。同理我们在javascript中可以利用函数来充当类的角色。约定作为构造函数的函数名首字母大写，其他普通的函数函数名首字母小写。
		var Person = function(name, age){
			this.name = name;
			this.age = age;
			this.sayName = function() {
				console.log(this.name);
			}
		}

		var person1 = new Person("zhangsan", 28);
		person1.sayName(); // 输出“zhangsan”
		var person2 = new Person("lisi", 28);
		person2.sayName(); // 输出“lisi”
		// 通过构造函数的方式，我们可以确定对象的实例类型
		console.log(person1 instanceof Person); // true








