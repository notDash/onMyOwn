# onMyOwn

## Javascript创建对象的模式

### Chapter 1  创建对象模式
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
		
	这样，我们就创建了一个具有两个属性和一个方法的对象。如果这个时候我们想再创建一个具有相同该属性的对象实例，则只能再重复一遍以
	上的操作。此时根据面向对象的编程思想，我们可能会想通过一种方式来创建一类具有相同属性和方法的对象。不需要再去写重复的代码，只
	需要实现就好了。
####1. 工厂模式创建对象
	工厂模式创建对象：顾名思义，我们希望通过工厂来创建一类具有相同属性和方法的实例。以Person为例，我们想创建几个Person的实例。首
	先定义一个创建Person对象的工厂方法：
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

	这样我们就创建了一个Person对象的工作方法，每次调用createPerson方法的时候都回去创建一个具有给定属性和方法的对象。但是工厂模式
	创建对象有一个不足的地方就是我们没法使用instanceof去判断对象类型。此时我们可以使用构造函数模式去创建对象。

####2. 构造函数模式创建对象
	熟悉面向对象方法编写程序的程序员大都熟悉类的这个概念。我们创建一个类，封装某些属性和方法，并且类名首字母约定为大写。如Person
	。同理我们在javascript中可以利用函数来充当类的角色。约定作为构造函数的函数名首字母大写，其他普通的函数函数名首字母小写。
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
		
####3. 原型模式创建对象	
		我们创建的每一个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以有特定类型的所有实
		例共享的属性和方法。使用原型对象可以使所有的对象实例共享它所包含的属性和方法。
		var Person = function(){};
		Person.prototype.name = "zhangsan";
		Person.prototype.age = 23;
		Person.prototype.sayName = function() {
			console.log(this.name);
		}

		var person1 = new Person();
		person1.sayName(); // 输出“zhangsan”
		var person2 = new Person();
		person2.sayName(); // 输出“lisi”
		// 通过构造函数的方式，我们可以确定对象的实例类型
		console.log(person1 instanceof Person); // true
		console.log(person1.sayName == person2.sayName); // true		
		原型对象的问题：1.没法为构造函数传递初始化参数； 
				2.所有实例共享一个属性和方法。如果一个属性是引用类型的话。那么修改一个实例的值，会相应的提现在另外一
				个实例上。如下所示：
		var Person = function(){};
		Person.prototype = {
			constructor:Person, // 以字面量的方式写Person.prototype会断开原始的原型链。所以要把Person重新设置
								//回去。要不然通过instanceof无法确定实例类型。
			name:"lisi",
			age:23,
			friends:["Tom", "Cat"],
			syanName:function(){
				console.log(this.name);
			}
		};

		var person1 = new Person();
		var person2 = new Person();

		person1.friends.push("Van");
		console.log(person1.friends); // [ 'Tom', 'Cat', 'Van' ]
		console.log(person2.friends); // [ 'Tom', 'Cat', 'Van' ]

####4. 组合使用构造函数模式和原型模式创建对象			
		创建自定义类型最常见的方式。
		构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
		
		var Person = function(name, age){
			this.name = name;
			this.age = age;
			this.ftiends = ["Tom", "Cat"];
		}
		Person.prototype = {
			constructor:Person,
			sayName:function(){
				console.log(this.name);
			}
		}

		var person1 = new Person("zhangsan", 23);
		var person2 = new Person("lisi", 22);

		person1.ftiends.push("Ven");

		console.log(person1.ftiends);     //[ 'Tom', 'Cat', 'Ven' ]
		console.log(person2.ftiends);  //[ 'Tom', 'Cat' ]
		console.log(person1.sayName === person2.sayName);  //true








