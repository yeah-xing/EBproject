"use strict";function xiaoji(){var c=0;$(".col-total1").each(function(){$(this).text($(this).siblings(".col-price1").text().replace(/[^0-9]/gi,"")*$(this).prev().find("input").val()+"元"),$(this).siblings(".col-check").children().prop("checked")&&(c+=1*$(this).text().replace(/[^0-9]/gi,""))}),$(".total-price>em").text(c)}function jianshu(){var a=0,t=0;$(".check-dx").each(function(){var c=1*$(this).parent().siblings(".col-num").find("input").val();if(t+=c,$(this).prop("checked")){var i=1*$(this).parent().siblings(".col-num").find("input").val();a+=i}}),$("#cartTotaNum").text(t),$("#selTotaNum").text(a)}var arr=[];function dack(t){xiaoji(),jianshu(),$(".item-box").find(".add-num").click(function(){var i=1*$(this).prev().val()+1;99<=i&&(i=99),$(this).prev().val(i);var a=$(this).parents(".col-num").siblings(".col-name").text();t.forEach(function(c){a===c.title&&(c.num=i)}),sendData(t),xiaoji(),jianshu()}).siblings(".reduce-num").click(function(){var i=1*$(this).next().val()-1;i<=1&&(i=1),$(this).next().val(i);var a=$(this).parents(".col-num").siblings(".col-name").text();t.forEach(function(c){a===c.title&&(c.num=i)}),sendData(t),xiaoji(),jianshu()}),$(".col-action>a").click(function(){$(this).parents(".item-box").hide(500,function(){$(this).remove();var a=$(this).find(".col-name").text();t.forEach(function(c,i){a===c.title&&t.splice(i,1)}),sendData(t),xiaoji()}),jianshu()}),$(".check-qx").click(function(){$(".check-dx").prop("checked",this.checked),xiaoji(),jianshu()}),$(".check-dx").click(function(){var c=!0;$(".check-dx").each(function(){$(this).prop("checked")||(c=!1)}),$(".check-qx").prop("checked",c),xiaoji(),jianshu()})}function applyCart(c){var i="";c.forEach(function(c){i+='<div class="item-box">\n        <div class="item-table">\n            <div class="col col-check fl">\n                <input class="check-dx check-wd" type="checkbox">\n            </div>\n            <div class="col col-img fl"><img src="'.concat(c.img,'" alt=""></div>\n            <div class="col fl col-name">').concat(c.title,'</div>\n            <div class="col col-price fl col-price1">').concat(c.price_info,'</div>\n            <div class="col fl col-num">\n                <div class="change-num">\n                    <a class="reduce-num" href="javascript:;">-</a>\n                    <input type="text" oninput = "value=value.replace(/[^d]/g,\'\')" maxlength="2" value="').concat(c.num,'" class="goods-num">\n                    <a class="add-num" href="javascript:;">+</a>\n                </div>\n            </div>\n            <div class="col fl col-total col-total1">').concat(c.price_info,'</div>\n            <div class="col fl col-action"><a href="javascript:;">x</a></div>\n        </div>\n        \n    </div>')}),$(".list-body").html(i)}function getcartData(){$.ajax({url:"/cart",type:"POST",dataType:"json",data:{username:username},success:function(c){applyCart(c),dark(c)}})}function sendData(c){$.ajax({url:"/send",type:"POST",data:{arr:JSON.stringify(c)},success:function(c){0===c.code&&alert("后台错误，请检查")}})}getcartData();