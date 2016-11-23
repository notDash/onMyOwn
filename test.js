
var tempResultHtml = '';
var tempResultSuffixArr = [];
var currLevel = 0;

/**
 * [handleFormatHtml description]
 * @param  {[type]}  jqDom   [第一次传递进来的是html]
 * @param  {Boolean} isRoot  [第一次传递进来为true]
 * @param  {[type]}  withTab [是否加tab或者四个空格]
 * @return {[type]}          [description]
 */
function handleFormatHtml (jqDom, isRoot, withSpace) {
	var currNode,outerH,pre,space='';
	if(isRoot) { // 如果是第一次传递html代码进来
		console.log($(document.body));
		jqDom = $(jqDom)[0]; // jqDom[0] 是根元素
		withSpace = 0;
	} else if(jqDom.nodeType === 1){
		withSpace += 1;
	} else {
		return;
	}
	console.log(withSpace);
	if(withSpace < currLevel || withSpace === currLevel ) {
		// console.log(tempResultSuffixArr.shift());
	}
	currLevel = withSpace;
	if(hasElementChileNodes(jqDom)) {
		currNode = jqDom.cloneNode();
		outerH = currNode.outerHTML;
		pre = outerH.substr(0, outerH.split('').length - (currNode.tagName.length + 3));
		tempResultHtml += wrapWithFormatL(pre, true, withSpace);
		space = '';
		for(var i = 0; i < withSpace * 4; ++i) {
			space += ' ';
		}
		tempResultSuffixArr.unshift(space + '&lt;/' + currNode.tagName.toLowerCase() + '&gt;');
		for(var i =0 , len = jqDom.childNodes.length; i < len; i ++) {
			handleFormatHtml(jqDom.childNodes[i], false, withSpace);	
		}
	} else {
		if(jqDom.nodeType === 1) {
			currNode = jqDom.cloneNode(true);
			outerH = currNode.outerHTML;
			pre = outerH.substr(0, outerH.split('').length - (currNode.tagName.length + 3));
			tempResultHtml += wrapWithFormatL(pre, false, withSpace) + '&lt;/' + currNode.tagName.toLowerCase() + '&gt;<br>';
			return;
		}
		return;
	}
}

function wrapWithFormatL (html, withBR, withSpace) {
	// 生成withSpace * 4 个空格
	var space = '';
	for(var i = 0; i < withSpace * 4; ++i) {
		space += ' ';
	}
	return withBR?space + html.replace(/[<]/g, '&lt;').replace(/[>]/g, '&gt;<br>'):space + html.replace(/[<]/g, '&lt;').replace(/[>]/g, '&gt;');
}

function hasElementChileNodes (element) {
	if(element && element.childNodes.length > 0) {
		for(var i =0 , len = element.childNodes.length; i < len; i ++) {
			if(element.childNodes[i].nodeType === 1) {
				return true;
			}	
		}
	}
	return false;	
}

// console.log(document.body.outerHTML);
handleFormatHtml(document.body, true, 0);

$('#formatHtml')[0].innerHTML = tempResultHtml + tempResultSuffixArr.join('<br>');


console.log(tempResultSuffixArr);
