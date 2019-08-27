///Jquery 扩展

$.extend({
    /*
     将input 的值直接转换为对象
     该方约定，input 标签中的id属性必须对于实体类中的字段
     */
    toJson: function (selector) {
        var jsonData = {};
        $(selector).find("input").each(function (index, item) {
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData[pro] = val;
        });
        $(selector).find("textarea").each(function (index, item) {
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData[pro] = val;
        });
        $(selector).find("select").each(function (index, item) {
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData[pro] = val;
        });
        return jsonData;
    },

    /*
     将json对象的值赋值到input 标签 和 textarea 标签
     data:后台传来的json对象数据
     selector：对指定范围中的input 标签和textarea 进行赋值
     */
    toValue: function (data, selector) {
        $(data).each(function (index, item) {
            //input 赋值
            $(selector).find("input").each(function (index2, item2) {
                var pro = $(item2).attr("id");
                $(item2).val(item[pro]);
            });
            $(selector).find("textarea").each(function (index, item2) {
                var pro = $(item2).attr("id");
                $(item2).val(item[pro]);
            });
            $(selector).find("select").each(function (index, item2) {
                var pro = $(item2).attr("id");
                $(item2).val(item[pro]);
            });
        });
    },

    clearValue: function (selector) {
        $(selector).find("input").each(function (index2, item2) {
            var pro = $(item2).attr("id");
            $(item2).val("");
        });
        $(selector).find("textarea").each(function (index, item2) {
            var pro = $(item2).attr("id");
            $(item2).val("");
        });
        $(selector).find("select").each(function (index, item2) {
            var pro = $(item2).attr("id");
            $(item2).val("");
        });
    },
    //验证input 标签是否为空
     /*
     判断input 标签 是否有值
     ingoreInputArr:忽略验证的input 标签 传入方式  var arr = ["标题","内容"];
     selector：对指定范围中的input 标签和textarea 进行赋值
     */
    checkValue: function (selector, ingoreInputArr) {
        var returnValue = true;
        var inputs = $(selector).find("input");
        var i = 0;
        var isIngore = -1;
        inputs.each(function (index,item) {
            var value = $(item).val();
            var lable = $(item).parent(".col-sm-4").prev();
            if(lable.length == 0)
                lable = $(item).parent().parent(".col-sm-4").prev();
            if(lable.length == 0)
                return;
            var text = $(lable).text().replace(":", "").replace("：", "");
            var ignoreAttr = $(lable).attr("ignore");
            if(ignoreAttr == "true" || ignoreAttr == true) {
                return;
            }
            else{
                if (ingoreInputArr) {
                    isIngore = $.inArray(text, ingoreInputArr);
                }
                
                if (isIngore == -1 && !value && i == 0) {
                    i++;
                    layer.alert(text.replace(":", "") + "内容不能为空");
                    returnValue = false;
                    return false;
                }
                else {
                    returnValue = true;
                }
            }
        });
        if(returnValue)
        {
            var selects = $(selector).find("select");
                selects.each(function(selectIndex,selectItem){
                    var value = $(selectItem).val();
                    var lable = $(selectItem).parent(".col-sm-4").prev();
                    if (lable.length == 0)
                        lable = $(selectItem).parent().parent(".col-sm-4").prev();
                    if (lable.length == 0)
                        return;
                    var text = $(lable).text().trim().replace(":", "").replace("：", "");
                    var ignoreAttr = $(lable).attr("ignore");
                    if (ignoreAttr == "true" || ignoreAttr == true) {
                        return;
                    }
                    if (ingoreInputArr) {
                        isIngore = $.inArray(text, ingoreInputArr);
                    }
                    
                    if (isIngore == -1 && !value && i == 0) {
                        i++;
                        layer.alert(text.replace(":", "") + "内容不能为空");
                        returnValue = false;
                        return false;
                    }
                    else{
                        returnValue = true;
                    }
                });
        }
        if(returnValue){
            var selects = $(selector).find("textare");
                $(selects).each(function(textareIndex,textareItem){
                    var value = $(textareItem).val();
                    var lable = $(textareItem).parent().prev();
                    if (lable.length == 0)
                        lable = $(textareItem).parent().parent(".col-sm-4").prev();

                    if (lable.length == 0)
                        return;
                    var text = $(lable).text().trim().replace(":", "").replace("：", "");
                    var ignoreAttr = $(lable).attr("ignore");
                    if(ignoreAttr == "true" || ignoreAttr == true) {
                        return;
                    }
                    if (ingoreInputArr) {
                        isIngore = $.inArray(text, ingoreInputArr);
                    }
                    
                    if (isIngore == -1 && !value && i == 0) {
                        i++;
                        layer.alert(text.replace(":", "") + "内容不能为空");
                        returnValue = false;
                        return false;
                    }
                    else{
                        returnValue = true;
                    }
                })
        }
        return returnValue;
    }

    ,searchFilter:function(selector){
        var array = [];
        
        $(selector).find("input").each(function (index, item) {
            var jsonData = {};
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData["name"] = pro;
            jsonData["value"] = val;
            array.push(jsonData);
        });
        $(selector).find("select").each(function (index, item) {
            var jsonData = {};
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData["name"] = pro;
            jsonData["value"] = val;
            array.push(jsonData);
        });
        return array;
    }

    ,searchParam:function(selector){
        var jsonData = {};
        $(selector).find("input").each(function (index, item) {
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData[pro] = val;
        });
        $(selector).find("select").each(function (index, item) {
            var pro = $(item).attr("id");
            var val = $(item).val();
            jsonData[pro] = val;
        });
        return jsonData;
    }

    /*生成时间随机串 */
    ,timeRandomString:function(prefixStr){
        if(!prefixStr)
            prefixStr = "GMCN";//General membership card number 通用会员卡编号
        var date = new Date();
        var year = date.getFullYear() ;
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        var timeStr = year +(month<10 ? "0" + month : month)
                            +(day<10 ? "0"+ day : day)
                            +(hour < 10 ? "0"+ hour : hour)
                            +(minute < 10 ? "0" + minute : minute)
                            +(second < 10 ? "0" +second : second);
        var noStr = this.randomString(4,true);
        return prefixStr + timeStr + noStr;
    }

    , randomString: function (num, isOnlyNums = true) {
        
        var str = "",
            range = num,
            arr = [];//, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        if (isOnlyNums) {
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        }
        else{
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        }
        // 随机产生
        // if (randomFlag) {
        //     range = Math.round(Math.random() * num) + num;
        // }
        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }

    , numRandomString: function (prefixStr, num) {
        var randomStr = this.randomString(num,false);
        return prefixStr+randomStr;
    }
});