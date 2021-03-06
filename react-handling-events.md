# react 学习

## 1. 事件处理（handing Events）
    react事件处理与DOM元素的事件处理非常相似。
    以下是一些语法上的区别：
        1. React事件使用驼峰式命名， 而不是小写字母
        2. 在JSX中，事件句柄是传递一个函数而不是一个字符串的函数名
    例如, HTML中这么写：
        <button onclick="activateLasers()">
            Activate Lasers
        </button>
    在React中稍微有些不同：
        <button onClick={activateLasers}>
            Activate Lasers
        </button>
    另一点区别是在react中不能通过返回false来组织默认的事件行为。你必须明确的调用preventDefault方法来实现。例如，针对一般的HTML， 阻止link默认打开一个新页面的行为，可以如下写：
        <a href="#" onclick="console.log('The link was clicked.'); return false">
            Click me
        </a>
    在react中，用如下的代码实现：
        function ActionLink () {
            function handleClick(e) {
                e.preventDefault();
                console.log('The link was clicked.');
            }

            return (
                <a href="#" onClick={handleClick}>
                    Click me 
                </a>
            );
        }
    以上代码中的e是一个综合的事件。react是根据W3C规则定义的这些综合事件，所以不必担心浏览兼容性问题。想了解更多可以访问： https://facebook.github.io/react/docs/events.html
    在react中通常不需要调用addEventListener去给DOM元素添加事件，而是当元素初始渲染之后提供了一个监听。
    当使用ES6的class来定义一个组件的时候， 通常的做法是把事件处理函数定义为一个class的方法。以下的例子定义了一个Toggle组件，让用户能够去切换ON和OFF的一个状态：
        class Toggle extends React.Component{
            constructor(props) {
                super(props);
                this.state = {
                    isToggleOn: true
                }
                this.handleClick = this.handleClick.bind(this);
            }
            handleClick() {
                this.setState(prevState => ({isToggleOn: !prevState.isToggleOn}));
            }
            render() {
                return (
                    <button onClick={this.handleClick}>
                        {this.state.isToggleOn? 'ON' : 'OFF'}
                    </button>
                );
            }
        }
        ReactDOM.render(
          <Toggle />,
          document.getElementById('root')
        );
    
    必须要注意JSX回调函数中的this。在JavaScript中，class方法默认并不会被绑定。
    如果你忘记绑定this.handleClick，并把它传递给onClick，当方法真正调用的时候
    this将会是undefined。
    这并不是React特殊的一个处理方式，而是function在JavaScript中的一种运行机制。
    通常，如果你在写方法的时候倾向于不带()，就像onClick={this.handleClick}这样
    你应该对该方法做绑定。
    

