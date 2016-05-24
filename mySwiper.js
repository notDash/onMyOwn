/*

	因为目前只考虑移动端的实现。所以像addEventListener等这样ie的兼容性没有考虑。

 */
(function () {
    var defaults = {
        // 焦点图张数或者轮播图按钮数
        dots:0,
        // 焦点图切换时间间距
        delay: 3000,
        // 切换时滑动的速度
        speed:300,
        // 是否自动轮播
        autoplay:true,
        // 是否循环轮播
        loopPlay:true,
        // 轮播方向
        direction: 'horizontal',
        slideClass: 'swiper-slide',
	    slideActiveClass: 'swiper-slide-active',
	    slideVisibleClass: 'swiper-slide-visible',
	    slideDuplicateClass: 'swiper-slide-duplicate',
	    slideNextClass: 'swiper-slide-next',
	    slidePrevClass: 'swiper-slide-prev',
	    wrapperClass: 'swiper-wrapper',
	    bulletClass: 'swiper-pagination-bullet',
	    bulletActiveClass: 'swiper-pagination-bullet-active',
	    buttonDisabledClass: 'swiper-button-disabled',
	    paginationCurrentClass: 'swiper-pagination-current',
	    paginationTotalClass: 'swiper-pagination-total',
	    paginationHiddenClass: 'swiper-pagination-hidden',
	    paginationProgressbarClass: 'swiper-pagination-progressbar'
    };

    var d = document;
    var s = null;
    // 当前显示的dom
    var activeDom = null;

    var Swiper = function (domClass, params) {
    	s = this;
    	s.params = params;
    	// 初始化， 绑定参数
        // 初始化参数设置
        s.init = function() {
            // 循环遍历defaults以及params，如果在params里有的参数则替换参数，如果没有的话则使用默认的
            if(this.params) {
                for( var p in defaults) {
                    if(! this.params[p]) {
                        this.params[p] = defaults[p];
                    }
                }
            } else {
                this.params = defaults;
            }
            s.wrapDom = d.getElementsByClassName(s.params.wrapperClass)[0];

            // 绑定监听程序
            s.sliderEvent(domClass);
            // 移除当前swiper容器所有的空元素
            s.delTextNode(s.wrapDom);

            // 默认设置wrap下的第一个元素为active元素
            if(d.getElementsByClassName(s.params.slideActiveClass).length === 0) {
                var classArr = s.wrapDom.childNodes[0].className.split(' ');
                classArr.push(s.params.slideActiveClass);
                s.wrapDom.childNodes[0].className = classArr.join(' ');
            }
            activeDom = d.getElementsByClassName(s.params.slideActiveClass)[0];
            // 判断如果autoplay为true(自动轮播), 调用轮播方法
            if(this.params['autoplay'] === true) {
                s.sliderOpt();
            }
        };

        s.sliderEvent = function() {
            var currDom = d.getElementsByClassName(domClass)[0];
            var currX = 0;
            var currY = 0;
            // directionTo 1为向右移动（默认）。 0为向左移动
            var directionTo = 1;
            currDom.addEventListener('touchstart', function(){
                if(event) {
                    // 如果手动的区滑动，清除自动轮播
                    if(s.autoplayT) {
                        clearTimeout(s.autoplayT);
                    }
                    activeDom = event.target;
                    currX = event.touches[0].pageX;
                    currY = event.touches[0].pageY;
                    s.transformPosi = s.getTransformPosi();
                }
            }, false);
            
            currDom.addEventListener('touchmove', function(){
                if(event) {
                    s.moveX = event.touches[0].pageX - currX;
                    if((s.moveX) < 0) {
                        
                        // 向右移动
                        directionTo = 1;
                        if(s.transformPosi){
                            activeDom.parentNode.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d('+(s.moveX - s.transformPosi)+'px, 0px, 0px);';
                        } else {
                            activeDom.parentNode.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d('+s.moveX+'px, 0px, 0px);';
                        }
                    }
                    if((s.moveX) > 0) {
                        // 向左移动
                        directionTo = 0;
                        activeDom.parentNode.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d(-'+s.moveX+'px, 0px, 0px);';
                    }

                }
            }, false);

            currDom.addEventListener('touchend', function(){

                if(event) {
                    if(s.moveX) {
                        activeDom.parentNode.style = '';
                        s.animateByOpt(directionTo);    
                    }
                    s.animateOpt();
                }
            }, false);
        };

        /**
         * 获取父元素的transform值
         * @author lishengyong
         * @date   2016-05-23T17:10:27+0800
         * @return {[type]}                 [description]
         */
        s.getTransformPosi = function() {
            var currPTransformX = 0;
            var currPTransform = s.wrapDom.style.transform;
            if(currPTransform) {
                if(currPTransform.match(/translate3d\(-(\d+)px,\s*(\d+)px,\s*(\d+)px\)/i)) {
                    currPTransformX = currPTransform.match(/translate3d\(-(\d+)px,\s*(\d+)px,\s*(\d+)px\)/i)[1];
                }
                if(currPTransform.match(/translate3d\((\d+)px,\s*(\d+)px,\s*(\d+)px\)/i)) {
                    currPTransformX = currPTransform.match(/translate3d\((\d+)px,\s*(\d+)px,\s*(\d+)px\)/i)[1];
                    currPTransformX = ~currPTransformX + 1;
                }
            }
            currPTransformX = +currPTransformX;
            return currPTransformX;
        }

        // 轮播方法
        s.sliderOpt = function() {
            // 自动轮播定时任务
            s.animateOpt();
        };

        s.animateOpt = function() {
            // 定时任务返回的ID
            s.autoplayT = setTimeout(function(){
           // s.wrapDom.childNodes;
           if(s.wrapDom) {
                // 默认向右滑动
                // 1.首先去获取有swiper-slide-active类的元素， 如果没有， 则wrapDom子元素中的第一个，并设置class为swiper-slide-active
                // 2.如果有， 则让当前的元素滑动， 设置其nextSibling的元素的class为swiper-slide-active
                // 3.如果nextSibling为空， 则跳转1
                var domList = s.wrapDom.childNodes;
                s.transformPosi = s.getTransformPosi();
                if(activeDom == s.wrapDom.childNodes[domList.length - 1]) {
                    s.wrapDom.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d(0px, 0px, 0px);';
                } else {
                    // 获取父元素的值
                    var currPTransformX = s.transformPosi;
                    // 980这个值应该根据计算元素的宽度来获取
                    currPTransformX += 980;
                    s.wrapDom.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d(-'+currPTransformX+'px, 0px, 0px);';
                }
                s.changeClass(activeDom);
                s.resetActiveDom();                      
                console.log(activeDom.innerHTML);
                s.animateOpt();
               }
            }, this.params.delay);
        };


        // 幻灯移动方法    directionTo 1为向右移动（默认）。 0为向左移动
        s.animateByOpt = function(directionTo) {
            if(directionTo === 1) {
                if(activeDom) {
                    // 判断当前元素是不是最后一个轮播图
                    if(activeDom.parentNode.lastChild == activeDom) {
                        //activeDom.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d(-980px, 0px, 0px);';
                        activeDom.parentNode.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d(0px, 0px, 0px);';
                    } else {
                        // 获取父元素的值
                        var currPTransformX = s.transformPosi;
                        // 980这个值应该根据计算元素的宽度来获取
                        currPTransformX += 980;
                        activeDom.parentNode.style = 'transition-duration: ' + s.params.speed + 'ms;transform: translate3d(-'+currPTransformX+'px, 0px, 0px);';
                        
                    }
                    s.changeClass(activeDom);
                    // 重置活动对象
                    s.resetActiveDom();
                }
            } else {
                // 相反方向移动
                if(activeDom) {
                }
            }
        };

        // 设置样式
        s.changeClass = function(activeDom) {
            var prevClass = activeDom.className.split(' ');
            prevClass.length = prevClass.length - 1;
            //prevClass.push(s.params.slidePrevClass);
            activeDom.className = prevClass.join(' ');
            if(activeDom.nextSibling) {
                // 如果有下一个兄弟元素
                var currClass = activeDom.nextSibling.className.split(' ');
                currClass.push(s.params.slideActiveClass);
                activeDom.nextSibling.className = currClass.join(' ');
            } else {
                // 获取下一个元素失败， 则设置第一个元素为活动元素
                var activeClass = s.wrapDom.childNodes[0].className.split(' ');
                activeClass.push(s.params.slideActiveClass);
                s.wrapDom.childNodes[0].className = activeClass.join(' ');
            }
        };

        // 重置活动对象
        s.resetActiveDom = function () {
            activeDom = d.getElementsByClassName(s.params.slideActiveClass)[0];
        }

        s.init();
        

    };

    window.Swiper = Swiper;

    /**
     * 删除子节点中的空白节点
     * @param  {[type]} elem [description]
     * @return {[type]}      [description]
     */
    Swiper.prototype = {
      constructor:Swiper,
      delTextNode:function(elem){
        var elem_child = elem.childNodes;
            for(var i=0; i<elem_child.length;i++){
            if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {
                elem.removeChild(elem_child[i]);
            }
        }
      }  
    };

})()



