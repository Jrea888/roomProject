/**
 * @author Administrator
 * @date 2020-05-05 00:55
 */
$(function() {
    // 默认显示5行数据
    for (var i = 0; i < 5; i++) {
        $("#addTable tbody").append('<tr>' +
            '<td><input type="hidden" class="form-control" value="0" placeholder="隐藏ID"></td>' +
            '<td><input type="text" class="form-control" value="" placeholder="输入指标场所"></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="10000"  placeholder="0-1000的值" /></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="10"  placeholder="0-10的值" /></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="150"  placeholder="0-150的值" /></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="100"  placeholder="0-100的值" /></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="30"  placeholder="0-30的值" /></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="50"  placeholder="0-50的值" /></td>' +
            '<td><input type="number" class="form-control" value="" min="0" max="25"  placeholder="0-25的值" /></td>' +
            '<td><button class="btn btn-success" style="width: 53px;height: 40px;">更新</button>' +
            '</tr>');
    }
    upData();
    // 给默认5行存储 ID
    defaultFun();
    // 重置数据
    resetData();
    
    // 加载页面 解除禁用
    $("#forbid").removeAttr("disabled");
});
var i, lastElement, index = 0;
var rows = 5,
    star = 0,
    end = 8;
var inputObj = {},
    inputArr = [],
    temp = [];
/**
 * 增加数据
 */
function newAddData() {
    rows = $("#searcher").val();
    if (rows <= 0) {
        alert("请输入行数！");
    } else {
        // 清空标签
        $("#addTable tbody tr").remove();
        for (var i = 0; i < rows; i++) {
            $("#addTable tbody").append('<tr>' +
                '<td><input type="hidden" class="form-control" value="0" placeholder="隐藏ID"></td>' +
                '<td><input type="text" class="form-control" value="" placeholder="输入指标场所"></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="10000"  placeholder="0-1000的值" /></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="10"  placeholder="0-10的值" /></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="150"  placeholder="0-150的值" /></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="100"  placeholder="0-100的值" /></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="30"  placeholder="0-30的值" /></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="50"  placeholder="0-50的值" /></td>' +
                '<td><input type="number" class="form-control" value="" min="0" max="25"  placeholder="0-25的值" /></td>' +
                '<td><button class="btn btn-success" style="width: 53px;height: 40px;">更新</button>' +
                '</tr>');
        }
        // 保存更改的测量值
        upData();
        // 保存 ID
        $.ajax({
            type: "GET",
            url: getUrl() + "/cp/CpCriterionDataItem/" + rows,
            dataType: "json",
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("authToken", localStorage.getItem("token"));
            },
            success: function(result) {
                if (result.code === 0) {
                    getDataId(result.rows);
                }
            },
            error: function() {
                alert("请求失败");
            }
        });
    }
}
// 获取数据
// function getData(prams){
//     temp = [];
//     var rowInput = $("#addTable tbody tr td input");
//     for (var j = 0; j <prams.length; j++) { //8
//         temp.push(prams[j].id);
//         temp.push(prams[j].place);
//         temp.push(prams[j].measuredU01);
//         temp.push(prams[j].measuredU02);
//         temp.push(prams[j].measuredU03);
//         temp.push(prams[j].measuredU04);
//         temp.push(prams[j].measuredU05);
//         temp.push(prams[j].measuredU06);
//         temp.push(prams[j].measuredU07);
//     }
//     console.log(temp);
//     console.log(rowInput.length);
//     // 填充数据
//     for (var j = 0; j < rowInput.length; j++) {
//         rowInput[j].value = temp[j];
//     }
//     return temp;
// }
//
/**
 *  获取用户ID
 * @param prams
 */
function getDataId(prams) {
    var first = 0;
    temp = [];
    var rowInput = $("#addTable tbody tr td input");
    for (var j = 0; j < prams.length; j++) {
        temp.push(prams[j].id);
    }
    inputArr = [];
    for (var j = 0; j < rowInput.length; j++) {
        inputArr.push(rowInput[j]);
    }
    for (var k = 0; k < temp.length; k++) {
        rowInput[first].value = temp[k];
        first += 9;
    }
}
// 填充数据
// function pushData(parms){
//     var rowInput = $("#addTable tbody tr td input");
//     inputArr = [];
//     for (var j = 0; j < rowInput.length; j++) {
//         inputArr.push(rowInput[j]);
//     }
//     lastElement = inputArr.splice(star,end);
//     star+=8;
//     end+=8;
//     for (var i = 0; i < parms.length; i++) {
//         lastElement[i].value = parms[i];
//     }
// }
//

/**
 * 更新数据
 */
var a = 9,
    b = 8,
    c = 7,
    d = 6,
    e = 5,
    f = 4,
    g = 3,
    h = 2,
    i = 1;
var inputNum = 0;

function upData() {
    var rowInput = $("#addTable tbody tr td input");
    $("#addTable button").click(function() {
        // 获取当前元素下标
        index = $("#addTable button").index(this);
        // 记录当前第几行
        index = index + i;
        console.log(index, "记录当前第几行");
        if (isNull(index) === false) {
            alert("请输入范围内测量值！");
            return
        }
        inputNum = index * 9;
        //校验
        if (isInputNull(rowInput, inputNum) === false) {
            return;
        }
        //ajax请求
        var data = {
            id: rowInput[inputNum - a].value,
            place: rowInput[inputNum - b].value,
            measuredU01: rowInput[inputNum - c].value,
            measuredU02: rowInput[inputNum - d].value,
            measuredU03: rowInput[inputNum - e].value,
            measuredU04: rowInput[inputNum - f].value,
            measuredU05: rowInput[inputNum - g].value,
            measuredU06: rowInput[inputNum - h].value,
            measuredU07: rowInput[inputNum - i].value,
        };
        data = JSON.stringify(data);
        // 保存值
        $.ajax({
            url: getUrl() + "/cp/CpCriterionDataItem",
            type: "PUT",
            data: data,
            dataType: "json",
            async: false,
            contentType: "application/json",
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("authToken", localStorage.getItem("token"));
            },
            success: function(result) {
                if (result.code === 0) {
                    alert(result.msg);
                }
            },
            error: function() {
                alert("请求失败！");
            }
        });
        // 一次评价
        getOneData()
    });
}
/**
 * 重置数据
 */
function resetData() {
    $.ajax({
        url: getUrl() + "/cp/CpCriterionDataItem",
        type: "DELETE",
        dataType: "json",
        async: false,
        contentType: "application/json",
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("authToken", localStorage.getItem("token"));
        },
        success: function(result) {
            if (result.code === 0) {
                alert(result.msg);
            }
        },
        error: function() {
            alert("请求失败！");
        }
    });
}
/**
 * 给默认Input获取ID
 * @param {*} prams 
 */
function defaultFun(prams = 5) {
    var first = 0;
    temp = [];
    var rowInput = $("#addTable tbody tr td input");
    $.ajax({
        type: "GET",
        url: getUrl() + "/cp/CpCriterionDataItem/" + prams,
        dataType: "json",
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("authToken", localStorage.getItem("token"));
        },
        success: function(result) {
            if (result.code === 0) {
                for (var j = 0; j < result.rows.length; j++) {
                    temp.push(result.rows[j].id);
                }
                inputArr = [];
                for (var j = 0; j < rowInput.length; j++) {
                    inputArr.push(rowInput[j]);
                }
                for (var k = 0; k < temp.length; k++) {
                    rowInput[first].value = temp[k];
                    first += 9;
                }
            }
        },
        error: function() {
            alert("请求失败");
        }
    });
    console.log(temp);
}
/**
 * 输入框值非空校验
 * @param parms
 * @param num
 */
function isInputNull(parms, num) {
    if (parms[num - c].value >= 0 && parms[num - c].value <= 1000) {
        parms[num - c].value = parms[num - c].value;
    } else {
        alert("二氧化碳测定值不在范围内！");
        return false;
    }
    if (parms[num - d].value >= 0 && parms[num - d].value <= 10) {
        parms[num - d].value = parms[num - d].value;
    } else {
        alert("一氧化碳测定值不在范围内！");
        return false;
    }
    if (parms[num - e].value >= 0 && parms[num - e].value <= 150) {
        parms[num - e].value = parms[num - e].value;
    } else {
        alert("吸入尘测定值不在范围内！");
        return false;
    }
    if (parms[num - f].value >= 0 && parms[num - f].value <= 100) {
        parms[num - f].value = parms[num - f].value;
    } else {
        alert("甲醛测定值不在范围内！");
        return false;
    }
    if (parms[num - g].value >= 0 && parms[num - g].value <= 30) {
        parms[num - g].value = parms[num - g].value
    } else {
        alert("菌落数测定值不在范围内！");
        return false;
    }
    if (parms[num - h].value >= 0 && parms[num - h].value <= 50) {
        parms[num - h].value = parms[num - h].value
    } else {
        alert("二氧化氮测定值不在范围内！");
        return false;
    }
    if (parms[num - i].value >= 0 && parms[num - i].value <= 25) {
        parms[num - i].value = parms[num - i].value
    } else {
        alert("二氧化硫测定值不在范围内！");
        return false;
    }
}
/**
 * 获取一次评价结果
 */
/*var oneInfo = [];
function getOneData(){
    oneInfo = [];
    $.ajax({
        type: "GET",
        url: getUrl()+"/cp/CpCriterionDataItem/"+rows,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("authToken",localStorage.getItem("token"));
        },
        success: function (result) {
            if (result.code === 0){
                console.log(result.rows,"一次评价结果")
                for (var j = 0; j < result.rows.length; j++) {
                    oneInfo.push(result.rows[j].place);
                    oneInfo.push(result.rows[j].minValue);
                }
            }
        },
        error: function () {
            alert("请求失败");
        }
    });
}
/**
 *  非空值校验
 * @param row
 * @returns {boolean}
 */
function isNull(row) {
    var val = document.querySelectorAll("#addTable input");
    row = row * 9;
    for (var j = 0; j < row; j++) {
        if (val[j].value == null || val[j].value == "") {
            return false;
        }
    }
}
/**
 * 一次评价
 */
function oneAccess() {
    $("#airTitle").hide();
    if (isNull(rows) === false) {
        alert("未录入数据，不能评价！");
        return
    }
    $.ajax({
        url: getUrl() + "/cp/oneCalculate/" + rows,
        type: "PUT",
        dataType: "json",
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("authToken", localStorage.getItem("token"));
        },
        success: function(result) {
            if (result.code === 0) {
                alert(result.msg);
                oneDataDeal();
            }
        },
        error: function() {
            alert("请求失败！");
        }
    })
    // 禁用按钮   设置禁用效果，不再响应点击事件
    $("#forbid").attr({"disabled":"disabled"});
}
/**
 * 一次评价数据处理
 * @param prams
 */
/*function oneDataDeal(prams){
    console.log(prams,"prams");
    var data = [],stringData = [];
    for (var j = 0; j < oneInfo.length; j++) {
        if(typeof oneInfo[j] == "number"){
            data.push(oneInfo[j]);
        }
        if (typeof oneInfo[j] == "string"){
            stringData.push(oneInfo[j]);
        }
        prams += oneInfo[j];
    }
    $("#twoAccess tbody").html("");
    for (var k = 0; k < data.length; k++) {
        if (data[k] >0.8500 && data[k]<=1.000){
            infoAccess(k,stringData,data,"优");
        } else if (data[k]>0.5000 && data[k]<=0.8500){
            infoAccess(k,stringData,data,"良");
        } else if (data[k]>0.2500 && data[k]<=0.5000){
            infoAccess(k,stringData,data,"中");
        } else if (data[k]>0 && data[k]<=0.2500){
            infoAccess(k,stringData,data,"差");
        } else {
            infoAccess(k,stringData,data,"不合格");
        }
    }
}
/**
 * 填充一次评价数据
 * @param {*} indedx 
 * @param {*} str 
 * @param {*} val 
 * @param {*} dep 
 */
/*function infoAccess(indedx,str,val,dep){
    $("#twoAccess tbody")
    .append("<tr><td>"+str[indedx]+"</td> <td>空气评价情况</td> <td>评价值：["+val[indedx]+"]</td>  <td>  "+dep+"</td> </tr>");
}
/**
 * 二次评价
 */
function towAccess() {
    if (isNull(rows) === false) {
        alert("未录入数据，不能评价！");
        return
    }
    $.ajax({
        url: getUrl() + "/cp/twoCalculate/" + rows,
        type: "PUT",
        dataType: "json",
        beforeSend: function(XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("authToken", localStorage.getItem("token"));
        },
        success: function(result) {
            if (result.code === 0) {
                alert(result.msg);
                twoDataDeal(result.data);
            }
        },
        error: function() {
            alert("请求失败！");
        }
    })
}
/**
 * 二次评价数据处理
 * @param prams
 */
function twoDataDeal(prams) {
    var info = [],
        towInfo;
    $("#twoAccess tbody").html("");
    $("#airTitle").show();
    // 分割元素
    if (rows <= 1) {
        towInfo = prams.split("：");
        info.push(towInfo[1]);
        $("#twoAccess tbody").append("<tr><td>" + towInfo[1] + "</td></tr>");
    } else {
        towInfo = prams.split("：");
        towInfo = towInfo[1].split("-->");
        for (var k = 0; k < towInfo.length; k++) {
            $("#twoAccess tbody").append("<tr><td>" + towInfo[k] + "</td></tr>");
        }
    }
}