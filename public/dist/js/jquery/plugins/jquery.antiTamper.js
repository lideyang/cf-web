define(function(require,exports,module){require("jquery");!function($){var e=$.ajax;$.ajax=function(n){if(null!=n&&n.url){var a=(n.formTokenId,n.success,n.error,n.data),o=(n.url,$("input[name='formToken']").val());if(a&&"string"==typeof a){var r=a.indexOf("formToken");if(r>=0){var r=a.indexOf("formToken"),f=a.substring(r+10,a.length),i=f.indexOf("&"),t=f.substring(0,i);console.log(t);var s=new RegExp(t,"g"),a=a.replace(s,o)}else a+="&formToken="+o}else if(a instanceof Array){var l=!1;for(var u in a){var m=a[u];if("formToken"==m.name){m.value=o,l=!0;break}}l||a.push({name:"formToken",value:o})}else{var v={};a=$.extend(!0,a||{},v,{formToken:o})}n.data=a,n.complete=function(e,n){401==e.status&&window.location.reload();var a=e.responseJSON;if(a&&a.code){var o=e.getResponseHeader("formToken");o&&$("input[name='formToken']").val(o)}a&&a.data&&a.data.key&&$("input[name='key']").val(a.data.key)},e(n)}}}(jQuery)});