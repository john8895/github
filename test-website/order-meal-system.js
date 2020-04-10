/*
* -------------------
* 待辦事項
* -------------------
* 1. 刪除項目按鈕
* 2. 訂購統計
*/
var orderUl = my$('todayOrder');
var orderView = my$('orderView');
var prompt = document.getElementById('prompt') || 0;
// var total = 0;


/*
* -------------------
* 更新訂購列表
* -------------------
*/
updateOrderList();

function updateOrderList() {
    var dataList = localStorage.getItem(getDate());
    dataList = dataList ? JSON.parse(dataList) : [];
    //先清空元素
    orderUl.innerText = "";
    // total = 0;
    // console.log("updateOrderList--" + total);


    //判斷localStorage有無資料
    if (dataList.length > 0) {
        var total = 0;
        //console.log("資料庫有資料");

        for (var i = 0; i < dataList.length; i++) {
            var list = document.createElement('li');
            var aObj = document.createElement('a');
            aObj.setAttribute('onclick', 'delOrderItem(this)');
            aObj.href = "#";
            aObj.id = 'delItem';
            aObj.innerText = '刪除';
            list.innerText = `${dataList[i].name} / ${dataList[i].type} / ${dataList[i].price} 元`;
            list.appendChild(aObj);
            orderUl.appendChild(list);
            total += parseInt(dataList[i].price);
        }
        prompt.innerText = `當前資料共 ${dataList.length} 筆，總金額 ${total} 元`;
        // console.log(`當前資料共 ${dataList.length} 筆，總金額 ${total} 元`);
        console.log("updateOrderList--for--" + total);


    } else { //無資料
        prompt.innerText = "資料庫無資料";

    }
    orderCount(total);

}


// var arr = {
//     name: "黃雅雅",
//     type: "雞腿飯",
//     price: 100
// }

my$('btn1').onclick = function () {
    var newData = my$('text').value;
    var data = localStorage.getItem(getDate()); //日期為key
    var total = 0;
    newData = newData.trim();
    newData = newData.split('/');

    data = data ? JSON.parse(data) : []; //如果localstorage有資料就讀出並轉陣列，無則給空陣列

    var order = {
        name: newData[0],
        type: newData[1],
        price: newData[2]
    };
    data.push(order); //插入新資料
    //儲存資料
    localStorage.setItem(getDate(), JSON.stringify(data));

    orderUl.innerText = "";
    for (var i = 0; i < data.length; i++) {
        var list = document.createElement('li');
        var aObj = document.createElement('a');
        aObj.setAttribute('onclick', 'delOrderItem(this)');
        aObj.href = "#";
        aObj.id = 'delItem';
        aObj.innerText = '刪除';
        list.innerText = `${data[i].name} / ${data[i].type} / ${data[i].price} 元`;
        list.appendChild(aObj);
        orderUl.appendChild(list);
        prompt.innerText = "";
        total += parseInt(data[i].price);
    }
    prompt.innerText = `當前資料共 ${data.length} 筆，總金額 ${total} 元`;
    orderCount(total);

};


/*
* -------------------
* 刪除項目
* -------------------
*/
var delBtn = document.getElementById('delItem') || 0;

delBtn.onclick = function () {

}

function delOrderItem(thisItem) {
    thisItem.parentElement.remove();
}


/*
* -------------------
* 訂購統計
* -------------------
*/
function orderCount(total) {
    var totalNum = document.getElementById('totalNum');
    var data = localStorage.getItem(getDate()); //日期為key

    console.log("orderCount----" + total);
    total = total ? total : total = 0;
    totalNum.innerText = `總金額 ${total} 元`;

    //取得資料
    data = JSON.parse(data);
    console.log(data);
    //組成新array
    //計算array
    for (var i = 0; i < data.length; i++) {
        var count = 0;
        var tempType={
            type: "",
            num: 0,
        };
        // console.log(data[i].type);
        // if (data[i].type === data[i + 1].type) {
        //     tempType.type = data[i].type;
        //     tempType['num']++
        //     console.log(tempType);
        // }
    }

    var tempArr = [{
        type: "雞腿飯"
    }]
    //輸出到畫面
    console.log("orderCount----"+total);
    var oraderData = localStorage.getItem(getDate());
    oraderData = JSON.parse(oraderData);

    console.log(oraderData);

    total=total?total:total=0;
    totalNum.innerText = `總金額 ${total} 元`
}

/*
* -------------------
* 清除資料
* -------------------
*/
function clearLocalstorage() {
    localStorage.clear();
    updateOrderList();
    // orderCount();
}

/*
* -------------------
* 取得當日日期，如20200407，每天只能存取當日的資料
* -------------------
*/
function getDate() {
    var today = new Date;
    var todayMonth = today.getMonth() + 1;
    todayMonth = todayMonth < 10 ? "0" + todayMonth : todayMonth;
    var todayDate = today.getDate()
    todayDate = todayDate < 10 ? "0" + todayDate : todayDate;
    return today.getFullYear() + "" + todayMonth + "" + todayDate
    // console.log(today.getFullYear() + "" + todayMonth + "" + todayDate);
}