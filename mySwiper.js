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

    var activeDom = null;

    Swiper = function (domClass, params) {
    	var s = this;
    	s.params = params;
    	// 初始化， 绑定参数
        init.apply(s);
        // 绑定监听程序
        sliderEvent(domClass);
        // 移除当前swiper容器所有的空元素
        delTextNode(d.getElementsByClassName(s.params.wrapperClass)[0]);
    };

    // 初始化参数设置
    function init () {
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
        // 判断如果autoplay为true(自动轮播), 调用轮播方法
        if(this.params['autoplay'] === true) {
        	sliderOpt.apply(this);
        }
        
    }

    function sliderEvent(domClass) {
    	var currDom = d.getElementsByClassName(domClass)[0];
		var currX = 0;
		var currY = 0;
		// directionTo 1为向右移动（默认）。 0为向左移动
		var directionTo = 1;
    	currDom.addEventListener('touchstart', function(){
    		if(event) {
    			activeDom = event.target;
	    		currX = event.touches[0].pageX;
	    		currY = event.touches[0].pageY;
    		}
    	}, false);
    	
    	currDom.addEventListener('touchmove', function(){
	    	if(event) {
	    		if((event.touches[0].pageX - currX) < 0) {
	    			// 向右移动
	    			directionTo = 1;
	    		}
	    		if((event.touches[0].pageX - currX) > 0) {
	    			// 向左移动
	    			directionTo = 0;
	    		}
	    	}
	    }, false);

	    currDom.addEventListener('touchend', function(){
	    	if(event) {
    			animateByOpt(directionTo);
    		}
	    }, false);
    }

    // 轮播函数
    function sliderOpt () {
    	//alert("轮播开始");
    	animateOpt(1);
    }

    /**
     * 自动轮播方法
     * @return {[type]} [description]
     */
    function animateOpt() {

    }

    // 幻灯移动方法    directionTo 1为向右移动（默认）。 0为向左移动
    function animateByOpt (directionTo) {
    	if(directionTo === 1) {
    		if(activeDom) {
    			// 判断当前元素是不是最后一个轮播图
    			if(activeDom.parentNode.lastChild == activeDom) {
    				activeDom.style = "transition-duration: 300ms;transform: translate3d(-980px, 0px, 0px);";
    				activeDom.parentNode.style = 'transition-duration: 300ms;transform: translate3d(980px, 0px, 0px);';
    			} else {
    				activeDom.style = "transition-duration: 300ms;transform: translate3d(-980px, 0px, 0px);";
	    			// 获取父元素的值
	    			var currPTransform = activeDom.parentNode.style.transform;
	    			var currPTransformX = 0;
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
	    			// 980这个值应该根据计算元素的宽度来获取
	    			currPTransformX += 980;
	    			activeDom.parentNode.style = 'transition-duration: 300ms;transform: translate3d(-'+currPTransformX+'px, 0px, 0px);';
    			}

    		}
    	} else {
    		// 相反方向移动
    		if(activeDom) {
    		}
    	}
    }

    /**
     * 删除子节点中的空白节点
     * @param  {[type]} elem [description]
     * @return {[type]}      [description]
     */
    function delTextNode(elem){
		var elem_child = elem.childNodes;
			for(var i=0; i<elem_child.length;i++){
			if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)) {
				elem.removeChild(elem_child[i]);
			}
		}
	}

})()



