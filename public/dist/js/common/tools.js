define(function(require,exports,module){var $=require("jquery");module.exports={inputValueClear:function(t){$(t).on("keyup",function(){var t=$(this),e=t.parent().find(".am-icon-times-circle");e.on("click",function(){t.val(""),$(this).removeClass("text-info").addClass("text-miss")}),""!=t.val()?e.removeClass("text-miss").addClass("text-info"):e.removeClass("text-info").addClass("text-miss")})},timer:function(t){$(t).each(function(){function t(t){return t<10&&(t="0"+t),t}var e=$(this),i=e.text().split(":"),n=86400*parseInt(i[0])+3600*parseInt(i[1])+60*parseInt(i[2])+parseInt(i[3]),a=setInterval(function(){if(n--,n>0){var i=parseInt(n/60/60/24,10),s=parseInt(n/60/60%24,10),r=parseInt(n/60%60,10),l=parseInt(n%60,10);i=t(i),s=t(s),r=t(r),l=t(l),e.text(i+":"+s+":"+r+":"+l),e.css("visibility","visible")}else clearInterval(a)},1e3)})},rangeInput:function(t,e,i){var n=$("#comfirmAmount");n.on("keyup",function(){var n=parseInt($(this).val());n<e?$(this).val(e):n>i&&$(this).val(i),$("#amountMoneyTxt").text(parseInt($(this).val()*parseFloat(t)).toFixed(2))}),$("#rangeBoxer").on("click","a.min",function(){var i=parseInt(n.val());i>0&&i>parseInt(e)&&(n.val(i-1),$("#amountMoneyTxt").text(((i-1)*parseFloat(t)).toFixed(2)))}),$("#rangeBoxer").on("click","a.max",function(){var e=parseInt(n.val());e<parseInt(i)&&(n.val(e+1),$("#amountMoneyTxt").text(((e+1)*parseFloat(t)).toFixed(2)))})},fixMoney:function(e,n,a){var s=/^[0-9]+(\.[0-9]{1,2})?$/,r=$(e).val(),l=r.replace(/,/g,"");try{if(""==r||null==r||!s.test(l)||0==r)return l=0,void("undefined"!=typeof a&&($(a).val("0"),$(e).val("0")));n=n>0&&n<=20?n:2,l=parseFloat((l+"").replace(/[^\d\.-]/g,"")).toFixed(n)+"";var o=l.split(".")[0].split("").reverse(),c=l.split(".")[1];for(t="",i=0;i<o.length;i++)t+=o[i]+((i+1)%3==0&&i+1!=o.length?",":"");var p=t.split("").reverse().join("")+"."+c}catch(t){p=0,l=0}return"undefined"!=typeof a&&null!=a&&"0.00"!=p&&($(a).val(l.replace(/,/g,"")),$(e).val(p)),p},moneyFixInput:function(t,e){var t=t||"#moneyTxt";$(t).on({blur:function(){var e=e||"#realMoney";if(module.exports.fixMoney(t,2,e),e){var i=$(this).parents("form").first();!i.validate().element(e)}}})},eventsList:function(t,e){require("amazeUI");var i=require("handlebars.min"),n=$("#wrapper"),a=n.find("#events-list"),s=n.find("#pull-down"),r=(n.find("#pull-down-label"),n.find("#pull-up")),l=-s.outerHeight();return this.compiler=i.compile($("#tpi-list-item").html()),this.prev=this.next=this.start=e.params.start,this.total=null,this.getURL=function(t){var i=["callback=?"];for(var n in t)"start"!==n&&i.push(n+"="+t[n]);return i.push("start="),e.api+"?"+i.join("&")},this.renderList=function(t,e){var i=this,n=s;"load"===e&&(n=r),$.ajax({url:this.URL+t,success:function(t){console.log(t),i.total=t.total;var n=i.compiler(t.data);"refresh"===e?a.children("li").first().before(n):"load"===e?a.append(n):a.html(n),setTimeout(function(){i.iScroll.refresh()},100)},error:function(){console.log("Error...")},complete:function(){i.resetLoading(n),"load"!==e&&i.iScroll.scrollTo(0,l,800,$.AMUI.iScroll.utils.circular)}})},this.setLoading=function(t){t.addClass("loading")},this.resetLoading=function(t){t.removeClass("loading")},this.init=function(){var t,i=this.iScroll=new $.AMUI.iScroll("#wrapper",{probeType:3,mouseWheel:!0}),n=this,a=!1;this.URL=this.getURL(e.params),this.renderList(e.params.start),i.on("scrollStart",function(){this.y>=l&&(a=!0),t=this.y}),i.on("scrollEnd",function(){a&&this.directionY===-1&&n.handlePullDown(),a=!1,t===this.y&&1===this.directionY&&n.handlePullUp()})},this.handlePullDown=function(){console.log("handle pull down");var t=this;this.prev>0?(this.setLoading(s),this.prev-=e.params.count,this.renderList(this.prev,"refresh")):(console.log("别刷了，没有了"),t.iScroll.scrollTo(0,-45,800,$.AMUI.iScroll.utils.circular))},this.handlePullUp=function(){console.log("handle pull up"),this.next<this.total?(this.setLoading(r),this.next+=e.params.count,this.renderList(this.next,"load")):(console.log(this.next),console.log("已到最后"))},this},handelSelectFile:function(t,e){function i(){var t=/^data:base64,/,i=this.result+"";t.test(i)&&(i=i.replace(t,"data:"+s.mime[s.fileType]+";base64,"));var a=new FormData;a.append("file",n),$.ajax({url:e,data:a,type:"post",processData:!1,contentType:!1,success:function(t){"200"==t.code?$("#uploadPic").attr("src",t.data):layer.msg(t.message,{icon:5})}})}var n=t.target.files[0];if(this.type=n.type,this.type||(this.type=this.mime[n.name.match(/\.([^\.]+)$/i)[1]]),!/image.(png|jpg|jpeg|bmp)/.test(this.type))return void alert("选择的文件类型不是图片");if(n.size>1048576)return void alert("选择文件大于1M，请重新选择");this.fileName=n.name,this.fileSize=n.size,this.fileType=this.type,this.fileDate=n.lastModifiedDate;var a=new FileReader,s=this;return a.onload=i,a.readAsDataURL(n),!1}}});