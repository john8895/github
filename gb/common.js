
/**
 * 
 * @param {*} id 
 */

function my$(id){
    return document.getElementById(id);
}

function setInnerText(element, text) {
    if (typeof element.textContent == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}

function getInnerText(element){
    if(typeof element.textContent == "undefined"){
        return element.innerText;
    }else {
        return element.textContent;
    }
}

//獲取任意一個父級元素的第一個子級元素
function getFirstElementChild(element) {
    if (element.firstElementChild) { //---true 支持
        return element.firstElementChild;
    } else {
        var node = element.firstChild;
        while (node && node.nodeType != 1) {
            element.nextSibling;
        }
        return node;
    }
}

//獲取任意一個父級元素的最後一個子級元素
function getLastElementChild(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = element.previousSibling;
        }
        return node;
    }
}

//獲取任意一個元素的前一個兄弟元素
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = element.previousSibling;
        }
        return node;
    }
}

//獲取任意一個元素的後一個兄弟元素
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = element.nextSibling;
        }
        return node;
    }
}

//獲取任意一個父級元素的所有子元素
// function getAllElementChild(element) {
//     if (element.children) {
//
//         return element.children;
//         // var el = element.children;
//         // var a;
//         // for(var i=0;i<el.length;i++){
//         //     if(el[i].innerText){
//         //         a += el[i].innerText + " ";
//         //     }
//         // }
//         // return a;
//
//     } else {
//         var node = element.childNodes;
//
//
//         while (node && node.nodeType != 1) {
//             node = element.nextSibling;
//
//         }
//
//         return node;
//     }
// }

//兼容代碼
function addEventListener(element, type, fn) {
    // 判斷瀏覽器是否兼容
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    } else {
        element["on" + type] = fn;
    }
}