!function($){$.fn.camera=function(a,e){function t(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i))return!0}function i(){var a=$(R).width();$("li",R).removeClass("camera_visThumb"),$("li",R).each(function(){var e=$(this).position(),t=$("ul",R).outerWidth(),i=$("ul",R).offset().left,r=$("> div",R).offset().left,o=r-i;o>0?$(".camera_prevThumbs",V).removeClass("hideNav"):$(".camera_prevThumbs",V).addClass("hideNav"),t-o>a?$(".camera_nextThumbs",V).removeClass("hideNav"):$(".camera_nextThumbs",V).addClass("hideNav");var s=e.left,n=e.left+$(this).width();n-o<=a&&s-o>=0&&$(this).addClass("camera_visThumb")})}function r(){function e(){if(g=h.width(),a.height.indexOf("%")!=-1){var e=Math.round(g/(100/parseFloat(a.height)));u=""!=a.minHeight&&e<parseFloat(a.minHeight)?parseFloat(a.minHeight):e,h.css({height:u})}else"auto"==a.height?u=h.height():(u=parseFloat(a.height),h.css({height:u}));$(".camerarelative",w).css({width:g,height:u}),$(".imgLoaded",w).each(function(){var e,t,i=$(this),r=i.attr("width"),o=i.attr("height"),s=(i.index(),i.attr("data-alignment")),n=i.attr("data-portrait");if("undefined"!=typeof s&&s!==!1&&""!==s||(s=a.alignment),"undefined"!=typeof n&&n!==!1&&""!==n||(n=a.portrait),0==n||"false"==n)if(r/o<g/u){var c=g/r,l=.5*Math.abs(u-o*c);switch(s){case"topLeft":e=0;break;case"topCenter":e=0;break;case"topRight":e=0;break;case"centerLeft":e="-"+l+"px";break;case"center":e="-"+l+"px";break;case"centerRight":e="-"+l+"px";break;case"bottomLeft":e="-"+2*l+"px";break;case"bottomCenter":e="-"+2*l+"px";break;case"bottomRight":e="-"+2*l+"px"}i.css({height:o*c,"margin-left":0,"margin-right":0,"margin-top":e,position:"absolute",visibility:"visible",width:g})}else{var c=u/o,l=.5*Math.abs(g-r*c);switch(s){case"topLeft":t=0;break;case"topCenter":t="-"+l+"px";break;case"topRight":t="-"+2*l+"px";break;case"centerLeft":t=0;break;case"center":t="-"+l+"px";break;case"centerRight":t="-"+2*l+"px";break;case"bottomLeft":t=0;break;case"bottomCenter":t="-"+l+"px";break;case"bottomRight":t="-"+2*l+"px"}i.css({height:u,"margin-left":t,"margin-right":t,"margin-top":0,position:"absolute",visibility:"visible",width:r*c})}else if(r/o<g/u){var c=u/o,l=.5*Math.abs(g-r*c);switch(s){case"topLeft":t=0;break;case"topCenter":t=l+"px";break;case"topRight":t=2*l+"px";break;case"centerLeft":t=0;break;case"center":t=l+"px";break;case"centerRight":t=2*l+"px";break;case"bottomLeft":t=0;break;case"bottomCenter":t=l+"px";break;case"bottomRight":t=2*l+"px"}i.css({height:u,"margin-left":t,"margin-right":t,"margin-top":0,position:"absolute",visibility:"visible",width:r*c})}else{var c=g/r,l=.5*Math.abs(u-o*c);switch(s){case"topLeft":e=0;break;case"topCenter":e=0;break;case"topRight":e=0;break;case"centerLeft":e=l+"px";break;case"center":e=l+"px";break;case"centerRight":e=l+"px";break;case"bottomLeft":e=2*l+"px";break;case"bottomCenter":e=2*l+"px";break;case"bottomRight":e=2*l+"px"}i.css({height:o*c,"margin-left":0,"margin-right":0,"margin-top":e,position:"absolute",visibility:"visible",width:g})}})}var t;1==E?(clearTimeout(t),t=setTimeout(e,200)):e(),E=!0}function o(){$("iframe",m).each(function(){$(".camera_caption",m).show();var e=$(this),t=e.attr("data-src");e.attr("src",t);var i=a.imagePath+"blank.gif",r=new Image;if(r.src=i,a.height.indexOf("%")!=-1){var o=Math.round(g/(100/parseFloat(a.height)));u=""!=a.minHeight&&o<parseFloat(a.minHeight)?parseFloat(a.minHeight):o}else u="auto"==a.height?h.height():parseFloat(a.height);e.after($(r).attr({class:"imgFake",width:g,height:u}));var s=e.clone();e.remove(),$(r).bind("click",function(){"absolute"==$(this).css("position")?($(this).remove(),t.indexOf("vimeo")!=-1||t.indexOf("youtube")!=-1?t.indexOf("?")!=-1?autoplay="&autoplay=1":autoplay="?autoplay=1":t.indexOf("dailymotion")!=-1&&(t.indexOf("?")!=-1?autoplay="&autoPlay=1":autoplay="?autoPlay=1"),s.attr("src",t+autoplay),K=!0):($(this).css({position:"absolute",top:0,left:0,zIndex:10}).after(s),s.css({position:"absolute",top:0,left:0,zIndex:9}))})})}function s(a){for(var e,t,i=a.length;i;e=parseInt(Math.random()*i),t=a[--i],a[i]=a[e],a[e]=t);return a}function n(){if($(R).length&&!$(L).length){var a,e=$(R).outerWidth(),t=($("ul > li",R).outerWidth(),$("li.cameracurrent",R).length?$("li.cameracurrent",R).position():""),r=$("ul > li",R).length*$("ul > li",R).outerWidth(),o=$("ul",R).offset().left,s=$("> div",R).offset().left;a=o<0?"-"+(s-o):s-o,1==ia&&($("ul",R).width($("ul > li",R).length*$("ul > li",R).outerWidth()),$(R).length&&!$(L).lenght&&h.css({marginBottom:$(R).outerHeight()}),i(),$("ul",R).width($("ul > li",R).length*$("ul > li",R).outerWidth()),$(R).length&&!$(L).lenght&&h.css({marginBottom:$(R).outerHeight()})),ia=!1;var n=$("li.cameracurrent",R).length?t.left:"",c=$("li.cameracurrent",R).length?t.left+$("li.cameracurrent",R).outerWidth():"";n<$("li.cameracurrent",R).outerWidth()&&(n=0),c-a>e?n+e<r?$("ul",R).animate({"margin-left":"-"+n+"px"},500,i):$("ul",R).animate({"margin-left":"-"+($("ul",R).outerWidth()-e)+"px"},500,i):n-a<0?$("ul",R).animate({"margin-left":"-"+n+"px"},500,i):($("ul",R).css({"margin-left":"auto","margin-right":"auto"}),setTimeout(i,100))}}function c(){Z=0;var e=$(".camera_bar_cont",V).width(),t=$(".camera_bar_cont",V).height();if("pie"!=f)switch(U){case"leftToRight":$("#"+v).css({right:e});break;case"rightToLeft":$("#"+v).css({left:e});break;case"topToBottom":$("#"+v).css({bottom:t});break;case"bottomToTop":$("#"+v).css({top:t})}else ea.clearRect(0,0,a.pieDiameter,a.pieDiameter)}function l(e){b.addClass("camerasliding"),K=!1;var i=parseFloat($("div.cameraSlide.cameracurrent",w).index());if(e>0)var d=e-1;else if(i==O-1)var d=0;else var d=i+1;var p=$(".cameraSlide:eq("+d+")",w),k=$(".cameraSlide:eq("+(d+1)+")",w).addClass("cameranext");if(i!=d+1&&k.hide(),$(".cameraContent",_).fadeOut(600),$(".camera_caption",_).show(),$(".camerarelative",p).append($("> div ",b).eq(d).find("> div.camera_effected")),$(".cameraContent:eq("+d+")",_).append($("> div ",b).eq(d).find("> div")),$(".imgLoaded",p).length){if(M.length>d+1&&!$(".imgLoaded",k).length){var y=M[d+1],C=new Image;C.src=y+"?"+(new Date).getTime(),k.prepend($(C).attr("class","imgLoaded").css("visibility","hidden")),C.onload=function(){_a=C.naturalWidth,ka=C.naturalHeight,$(C).attr("data-alignment",q[d+1]).attr("data-portrait",F[d+1]),$(C).attr("width",_a),$(C).attr("height",ka),r()}}a.onLoaded.call(this),$(".camera_loader",h).is(":visible")?$(".camera_loader",h).fadeOut(400):($(".camera_loader",h).css({visibility:"hidden"}),$(".camera_loader",h).fadeOut(400,function(){$(".camera_loader",h).css({visibility:"visible"})}));var x,T,S,B,I,P=a.rows,H=a.cols,A=1,D=0,E=new Array("simpleFade","curtainTopLeft","curtainTopRight","curtainBottomLeft","curtainBottomRight","curtainSliceLeft","curtainSliceRight","blindCurtainTopLeft","blindCurtainTopRight","blindCurtainBottomLeft","blindCurtainBottomRight","blindCurtainSliceBottom","blindCurtainSliceTop","stampede","mosaic","mosaicReverse","mosaicRandom","mosaicSpiral","mosaicSpiralReverse","topLeftBottomRight","bottomRightTopLeft","bottomLeftTopRight","topRightBottomLeft","scrollLeft","scrollRight","scrollTop","scrollBottom","scrollHorz");marginLeft=0,marginTop=0,opacityOnGrid=0,1==a.opacityOnGrid?opacityOnGrid=0:opacityOnGrid=1;var z=$(" > div",b).eq(d).attr("data-fx");if(B=t()&&""!=a.mobileFx&&"default"!=a.mobileFx?a.mobileFx:"undefined"!=typeof z&&z!==!1&&"default"!==z?z:a.fx,"random"==B?(B=s(E),B=B[0]):(B=B,B.indexOf(",")>0&&(B=B.replace(/ /g,""),B=B.split(","),B=s(B),B=B[0])),dataEasing=$(" > div",b).eq(d).attr("data-easing"),mobileEasing=$(" > div",b).eq(d).attr("data-mobileEasing"),I=t()&&""!=a.mobileEasing&&"default"!=a.mobileEasing?"undefined"!=typeof mobileEasing&&mobileEasing!==!1&&"default"!==mobileEasing?mobileEasing:a.mobileEasing:"undefined"!=typeof dataEasing&&dataEasing!==!1&&"default"!==dataEasing?dataEasing:a.easing,x=$(" > div",b).eq(d).attr("data-slideOn"),"undefined"!=typeof x&&x!==!1)j=x;else if("random"==a.slideOn){var j=new Array("next","prev");j=s(j),j=j[0]}else j=a.slideOn;var Q=$(" > div",b).eq(d).attr("data-time");T="undefined"!=typeof Q&&Q!==!1&&""!==Q?parseFloat(Q):a.time;var X=$(" > div",b).eq(d).attr("data-transPeriod");switch(S="undefined"!=typeof X&&X!==!1&&""!==X?parseFloat(X):a.transPeriod,$(b).hasClass("camerastarted")||(B="simpleFade",j="next",I="",S=400,$(b).addClass("camerastarted")),B){case"simpleFade":H=1,P=1;break;case"curtainTopLeft":H=0==a.slicedCols?a.cols:a.slicedCols,P=1;break;case"curtainTopRight":H=0==a.slicedCols?a.cols:a.slicedCols,P=1;break;case"curtainBottomLeft":H=0==a.slicedCols?a.cols:a.slicedCols,P=1;break;case"curtainBottomRight":H=0==a.slicedCols?a.cols:a.slicedCols,P=1;break;case"curtainSliceLeft":H=0==a.slicedCols?a.cols:a.slicedCols,P=1;break;case"curtainSliceRight":H=0==a.slicedCols?a.cols:a.slicedCols,P=1;break;case"blindCurtainTopLeft":P=0==a.slicedRows?a.rows:a.slicedRows,H=1;break;case"blindCurtainTopRight":P=0==a.slicedRows?a.rows:a.slicedRows,H=1;break;case"blindCurtainBottomLeft":P=0==a.slicedRows?a.rows:a.slicedRows,H=1;break;case"blindCurtainBottomRight":P=0==a.slicedRows?a.rows:a.slicedRows,H=1;break;case"blindCurtainSliceTop":P=0==a.slicedRows?a.rows:a.slicedRows,H=1;break;case"blindCurtainSliceBottom":P=0==a.slicedRows?a.rows:a.slicedRows,H=1;break;case"stampede":D="-"+S;break;case"mosaic":D=a.gridDifference;break;case"mosaicReverse":D=a.gridDifference;break;case"mosaicRandom":break;case"mosaicSpiral":D=a.gridDifference,A=1.7;break;case"mosaicSpiralReverse":D=a.gridDifference,A=1.7;break;case"topLeftBottomRight":D=a.gridDifference,A=6;break;case"bottomRightTopLeft":D=a.gridDifference,A=6;break;case"bottomLeftTopRight":D=a.gridDifference,A=6;break;case"topRightBottomLeft":D=a.gridDifference,A=6;break;case"scrollLeft":H=1,P=1;break;case"scrollRight":H=1,P=1;break;case"scrollTop":H=1,P=1;break;case"scrollBottom":H=1,P=1;break;case"scrollHorz":H=1,P=1}for(var Y,ta,ia=0,ra=P*H,oa=g-Math.floor(g/H)*H,sa=u-Math.floor(u/P)*P,na=0,ca=0,la=new Array,da=new Array,ha=new Array;ia<ra;){la.push(ia),da.push(ia),W.append('<div class="cameraappended" style="display:none; overflow:hidden; position:absolute; z-index:1000" />');var ma=$(".cameraappended:eq("+ia+")",w);"scrollLeft"==B||"scrollRight"==B||"scrollTop"==B||"scrollBottom"==B||"scrollHorz"==B?J.eq(d).clone().show().appendTo(ma):"next"==j?J.eq(d).clone().show().appendTo(ma):J.eq(i).clone().show().appendTo(ma),Y=ia%H<oa?1:0,ia%H==0&&(na=0),ta=Math.floor(ia/H)<sa?1:0,ma.css({height:Math.floor(u/P+ta+1),left:na,top:ca,width:Math.floor(g/H+Y+1)}),$("> .cameraSlide",ma).css({height:u,"margin-left":"-"+na+"px","margin-top":"-"+ca+"px",width:g}),na=na+ma.width()-1,ia%H==H-1&&(ca=ca+ma.height()-1),ia++}switch(B){case"curtainTopLeft":break;case"curtainBottomLeft":break;case"curtainSliceLeft":break;case"curtainTopRight":la=la.reverse();break;case"curtainBottomRight":la=la.reverse();break;case"curtainSliceRight":la=la.reverse();break;case"blindCurtainTopLeft":break;case"blindCurtainBottomLeft":la=la.reverse();break;case"blindCurtainSliceTop":break;case"blindCurtainTopRight":break;case"blindCurtainBottomRight":la=la.reverse();break;case"blindCurtainSliceBottom":la=la.reverse();break;case"stampede":la=s(la);break;case"mosaic":break;case"mosaicReverse":la=la.reverse();break;case"mosaicRandom":la=s(la);break;case"mosaicSpiral":var pa,fa,ga,ua=P/2,va=0;for(ga=0;ga<ua;ga++){for(fa=ga,pa=ga;pa<H-ga-1;pa++)ha[va++]=fa*H+pa;for(pa=H-ga-1,fa=ga;fa<P-ga-1;fa++)ha[va++]=fa*H+pa;for(fa=P-ga-1,pa=H-ga-1;pa>ga;pa--)ha[va++]=fa*H+pa;for(pa=ga,fa=P-ga-1;fa>ga;fa--)ha[va++]=fa*H+pa}la=ha;break;case"mosaicSpiralReverse":var pa,fa,ga,ua=P/2,va=ra-1;for(ga=0;ga<ua;ga++){for(fa=ga,pa=ga;pa<H-ga-1;pa++)ha[va--]=fa*H+pa;for(pa=H-ga-1,fa=ga;fa<P-ga-1;fa++)ha[va--]=fa*H+pa;for(fa=P-ga-1,pa=H-ga-1;pa>ga;pa--)ha[va--]=fa*H+pa;for(pa=ga,fa=P-ga-1;fa>ga;fa--)ha[va--]=fa*H+pa}la=ha;break;case"topLeftBottomRight":for(var fa=0;fa<P;fa++)for(var pa=0;pa<H;pa++)ha.push(pa+fa);da=ha;break;case"bottomRightTopLeft":for(var fa=0;fa<P;fa++)for(var pa=0;pa<H;pa++)ha.push(pa+fa);da=ha.reverse();break;case"bottomLeftTopRight":for(var fa=P;fa>0;fa--)for(var pa=0;pa<H;pa++)ha.push(pa+fa);da=ha;break;case"topRightBottomLeft":for(var fa=0;fa<P;fa++)for(var pa=H;pa>0;pa--)ha.push(pa+fa);da=ha}$.each(la,function(e,t){function r(){if($(this).addClass("cameraeased"),$(".cameraeased",w).length>=0&&$(R).css({visibility:"visible"}),$(".cameraeased",w).length==ra){n(),$(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom",m).each(function(){$(this).css("visibility","hidden")}),J.eq(d).show().css("z-index","999").removeClass("cameranext").addClass("cameracurrent"),J.eq(i).css("z-index","1").removeClass("cameracurrent"),$(".cameraContent",_).eq(d).addClass("cameracurrent"),i>=0&&$(".cameraContent",_).eq(i).removeClass("cameracurrent"),a.onEndTransition.call(this);var e=J.eq(d).find(".fadeIn").length;$(".cameraContent",_).eq(d).find(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom").length;0!=e&&$(".cameraSlide.cameracurrent .fadeIn",m).each(function(){if(""!=$(this).attr("data-easing"))var a=$(this).attr("data-easing");else var a=I;var t=$(this);if("undefined"==typeof t.attr("data-outerWidth")||t.attr("data-outerWidth")===!1||""===t.attr("data-outerWidth")){var i=t.outerWidth();t.attr("data-outerWidth",i)}else var i=t.attr("data-outerWidth");if("undefined"==typeof t.attr("data-outerHeight")||t.attr("data-outerHeight")===!1||""===t.attr("data-outerHeight")){var r=t.outerHeight();t.attr("data-outerHeight",r)}else var r=t.attr("data-outerHeight");var o=t.position(),s=(o.left,o.top,t.attr("class")),n=t.index();t.parents(".camerarelative").outerHeight(),t.parents(".camerarelative").outerWidth();s.indexOf("fadeIn")!=-1?t.animate({opacity:0},0).css("visibility","visible").delay(T/e*(.1*(n-1))).animate({opacity:1},T/e*.15,a):t.css("visibility","visible")}),$(".cameraContent.cameracurrent",_).show(),$(".cameraappended",w).remove(),b.removeClass("camerasliding"),J.eq(i).hide();var t,r=$(".camera_bar_cont",V).width(),s=$(".camera_bar_cont",V).height();t="pie"!=f?.05:.005,$("#"+v).animate({opacity:a.loaderOpacity},200),N=setInterval(function(){if(b.hasClass("stopped")&&clearInterval(N),"pie"!=f)switch(Z<=1.002&&!b.hasClass("stopped")&&!b.hasClass("paused")&&!b.hasClass("hovered")?Z+=t:Z<=1&&(b.hasClass("stopped")||b.hasClass("paused")||b.hasClass("stopped")||b.hasClass("hovered"))?Z=Z:b.hasClass("stopped")||b.hasClass("paused")||b.hasClass("hovered")||(clearInterval(N),o(),$("#"+v).animate({opacity:0},200,function(){clearTimeout(G),G=setTimeout(c,p),l(),a.onStartLoading.call(this)})),U){case"leftToRight":$("#"+v).animate({right:r-r*Z},T*t,"linear");break;case"rightToLeft":$("#"+v).animate({left:r-r*Z},T*t,"linear");break;case"topToBottom":$("#"+v).animate({bottom:s-s*Z},T*t,"linear");break;case"bottomToTop":$("#"+v).animate({bottom:s-s*Z},T*t,"linear")}else aa=Z,ea.clearRect(0,0,a.pieDiameter,a.pieDiameter),ea.globalCompositeOperation="destination-over",ea.beginPath(),ea.arc(a.pieDiameter/2,a.pieDiameter/2,a.pieDiameter/2-a.loaderStroke,0,2*Math.PI,!1),ea.lineWidth=a.loaderStroke,ea.strokeStyle=a.loaderBgColor,ea.stroke(),ea.closePath(),ea.globalCompositeOperation="source-over",ea.beginPath(),ea.arc(a.pieDiameter/2,a.pieDiameter/2,a.pieDiameter/2-a.loaderStroke,0,2*Math.PI*aa,!1),ea.lineWidth=a.loaderStroke-2*a.loaderPadding,ea.strokeStyle=a.loaderColor,ea.stroke(),ea.closePath(),Z<=1.002&&!b.hasClass("stopped")&&!b.hasClass("paused")&&!b.hasClass("hovered")?Z+=t:Z<=1&&(b.hasClass("stopped")||b.hasClass("paused")||b.hasClass("hovered"))?Z=Z:b.hasClass("stopped")||b.hasClass("paused")||b.hasClass("hovered")||(clearInterval(N),o(),$("#"+v+", .camera_canvas_wrap",V).animate({opacity:0},200,function(){clearTimeout(G),G=setTimeout(c,p),l(),a.onStartLoading.call(this)}))},T*t)}}switch(Y=t%H<oa?1:0,t%H==0&&(na=0),ta=Math.floor(t/H)<sa?1:0,B){case"simpleFade":height=u,width=g,opacityOnGrid=0;break;case"curtainTopLeft":height=0,width=Math.floor(g/H+Y+1),marginTop="-"+Math.floor(u/P+ta+1)+"px";break;case"curtainTopRight":height=0,width=Math.floor(g/H+Y+1),marginTop="-"+Math.floor(u/P+ta+1)+"px";break;case"curtainBottomLeft":height=0,width=Math.floor(g/H+Y+1),marginTop=Math.floor(u/P+ta+1)+"px";break;case"curtainBottomRight":height=0,width=Math.floor(g/H+Y+1),marginTop=Math.floor(u/P+ta+1)+"px";break;case"curtainSliceLeft":height=0,width=Math.floor(g/H+Y+1),t%2==0?marginTop=Math.floor(u/P+ta+1)+"px":marginTop="-"+Math.floor(u/P+ta+1)+"px";break;case"curtainSliceRight":height=0,width=Math.floor(g/H+Y+1),t%2==0?marginTop=Math.floor(u/P+ta+1)+"px":marginTop="-"+Math.floor(u/P+ta+1)+"px";break;case"blindCurtainTopLeft":height=Math.floor(u/P+ta+1),width=0,marginLeft="-"+Math.floor(g/H+Y+1)+"px";break;case"blindCurtainTopRight":height=Math.floor(u/P+ta+1),width=0,marginLeft=Math.floor(g/H+Y+1)+"px";break;case"blindCurtainBottomLeft":height=Math.floor(u/P+ta+1),width=0,marginLeft="-"+Math.floor(g/H+Y+1)+"px";break;case"blindCurtainBottomRight":height=Math.floor(u/P+ta+1),width=0,marginLeft=Math.floor(g/H+Y+1)+"px";break;case"blindCurtainSliceBottom":height=Math.floor(u/P+ta+1),width=0,t%2==0?marginLeft="-"+Math.floor(g/H+Y+1)+"px":marginLeft=Math.floor(g/H+Y+1)+"px";break;case"blindCurtainSliceTop":height=Math.floor(u/P+ta+1),width=0,t%2==0?marginLeft="-"+Math.floor(g/H+Y+1)+"px":marginLeft=Math.floor(g/H+Y+1)+"px";break;case"stampede":height=0,width=0,marginLeft=.2*g*(e%H-(H-Math.floor(H/2)))+"px",marginTop=.2*u*(Math.floor(e/H)+1-(P-Math.floor(P/2)))+"px";break;case"mosaic":height=0,width=0;break;case"mosaicReverse":height=0,width=0,marginLeft=Math.floor(g/H+Y+1)+"px",marginTop=Math.floor(u/P+ta+1)+"px";break;case"mosaicRandom":height=0,width=0,marginLeft=.5*Math.floor(g/H+Y+1)+"px",marginTop=.5*Math.floor(u/P+ta+1)+"px";break;case"mosaicSpiral":height=0,width=0,marginLeft=.5*Math.floor(g/H+Y+1)+"px",marginTop=.5*Math.floor(u/P+ta+1)+"px";break;case"mosaicSpiralReverse":height=0,width=0,marginLeft=.5*Math.floor(g/H+Y+1)+"px",marginTop=.5*Math.floor(u/P+ta+1)+"px";break;case"topLeftBottomRight":height=0,width=0;break;case"bottomRightTopLeft":height=0,width=0,marginLeft=Math.floor(g/H+Y+1)+"px",marginTop=Math.floor(u/P+ta+1)+"px";break;case"bottomLeftTopRight":height=0,width=0,marginLeft=0,marginTop=Math.floor(u/P+ta+1)+"px";break;case"topRightBottomLeft":height=0,width=0,marginLeft=Math.floor(g/H+Y+1)+"px",marginTop=0;break;case"scrollRight":height=u,width=g,marginLeft=-g;break;case"scrollLeft":height=u,width=g,marginLeft=g;break;case"scrollTop":height=u,width=g,marginTop=u;break;case"scrollBottom":height=u,width=g,marginTop=-u;break;case"scrollHorz":height=u,width=g,0==i&&d==O-1?marginLeft=-g:i<d||i==O-1&&0==d?marginLeft=g:marginLeft=-g}var s=$(".cameraappended:eq("+t+")",w);"undefined"!=typeof N&&(clearInterval(N),clearTimeout(G),G=setTimeout(c,S+D)),$(L).length&&($(".camera_pag li",h).removeClass("cameracurrent"),$(".camera_pag li",h).eq(d).addClass("cameracurrent")),$("#fluidMenu").find("li").removeClass("cameracurrent"),$("#fluidMenu").find("li").eq(d).addClass("cameracurrent"),$(R).length&&($("li",R).removeClass("cameracurrent"),$("li",R).eq(d).addClass("cameracurrent"),$("li",R).not(".cameracurrent").find("img").animate({opacity:.5},0),$("li.cameracurrent img",R).animate({opacity:1},0),$("li",R).hover(function(){$("img",this).stop(!0,!1).animate({opacity:1},150)},function(){$(this).hasClass("cameracurrent")||$("img",this).stop(!0,!1).animate({opacity:.5},150)}));var p=parseFloat(S)+parseFloat(D);"scrollLeft"==B||"scrollRight"==B||"scrollTop"==B||"scrollBottom"==B||"scrollHorz"==B?(a.onStartTransition.call(this),p=0,s.delay((S+D)/ra*da[e]*A*.5).css({display:"block",height:height,"margin-left":marginLeft,"margin-top":marginTop,width:width}).animate({height:Math.floor(u/P+ta+1),"margin-top":0,"margin-left":0,width:Math.floor(g/H+Y+1)},S-D,I,r),J.eq(i).delay((S+D)/ra*da[e]*A*.5).animate({"margin-left":marginLeft*-1,"margin-top":marginTop*-1},S-D,I,function(){$(this).css({"margin-top":0,"margin-left":0})})):(a.onStartTransition.call(this),p=parseFloat(S)+parseFloat(D),"next"==j?s.delay((S+D)/ra*da[e]*A*.5).css({display:"block",height:height,"margin-left":marginLeft,"margin-top":marginTop,width:width,opacity:opacityOnGrid}).animate({height:Math.floor(u/P+ta+1),"margin-top":0,"margin-left":0,opacity:1,width:Math.floor(g/H+Y+1)},S-D,I,r):(J.eq(d).show().css("z-index","999").addClass("cameracurrent"),J.eq(i).css("z-index","1").removeClass("cameracurrent"),$(".cameraContent",_).eq(d).addClass("cameracurrent"),$(".cameraContent",_).eq(i).removeClass("cameracurrent"),s.delay((S+D)/ra*da[e]*A*.5).css({display:"block",height:Math.floor(u/P+ta+1),"margin-top":0,"margin-left":0,opacity:1,width:Math.floor(g/H+Y+1)}).animate({height:height,"margin-left":marginLeft,"margin-top":marginTop,width:width,opacity:opacityOnGrid},S-D,I,r)))})}else{var ba=M[d],wa=new Image;wa.src=ba+"?"+(new Date).getTime(),p.css("visibility","hidden"),p.prepend($(wa).attr("class","imgLoaded").css("visibility","hidden"));var _a,ka;$(wa).get(0).complete&&"0"!=_a&&"0"!=ka&&"undefined"!=typeof _a&&_a!==!1&&"undefined"!=typeof ka&&ka!==!1||($(".camera_loader",h).delay(500).fadeIn(400),wa.onload=function(){_a=wa.naturalWidth,ka=wa.naturalHeight,$(wa).attr("data-alignment",q[d]).attr("data-portrait",F[d]),$(wa).attr("width",_a),$(wa).attr("height",ka),w.find(".cameraSlide_"+d).hide().css("visibility","visible"),r(),l(d+1)})}}var d={alignment:"center",autoAdvance:!0,mobileAutoAdvance:!0,barDirection:"leftToRight",barPosition:"bottom",cols:6,easing:"easeInOutExpo",mobileEasing:"",fx:"random",mobileFx:"",gridDifference:250,height:"50%",imagePath:"images/",hover:!0,loader:"pie",loaderColor:"#eeeeee",loaderBgColor:"#222222",loaderOpacity:.8,loaderPadding:2,loaderStroke:7,minHeight:"200px",navigation:!0,navigationHover:!0,mobileNavHover:!0,opacityOnGrid:!1,overlayer:!0,pagination:!0,playPause:!0,pauseOnClick:!0,pieDiameter:38,piePosition:"rightTop",portrait:!1,rows:4,slicedCols:12,slicedRows:8,slideOn:"random",thumbnails:!1,time:7e3,transPeriod:1500,onEndTransition:function(){},onLoaded:function(){},onStartLoading:function(){},onStartTransition:function(){}};$.support.borderRadius=!1,$.each(["borderRadius","BorderRadius","MozBorderRadius","WebkitBorderRadius","OBorderRadius","KhtmlBorderRadius"],function(){void 0!==document.body.style[this]&&($.support.borderRadius=!0)});var a=$.extend({},d,a),h=$(this).addClass("camera_wrap");h.wrapInner('<div class="camera_src" />').wrapInner('<div class="camera_fakehover" />');var m=$(".camera_fakehover",h),p=h;m.append('<div class="camera_target"></div>'),1==a.overlayer&&m.append('<div class="camera_overlayer"></div>'),h.after('<div class="camera_target_content"></div>');var f;f="pie"!=a.loader||$.support.borderRadius?a.loader:"bar","pie"==f?m.append('<div class="camera_pie"></div>'):"bar"==f?m.append('<div class="camera_bar"></div>'):m.append('<div class="camera_bar" style="display:none"></div>'),1==a.playPause&&m.append('<div class="camera_commands"></div>'),1==a.navigation&&m.append('<div class="camera_prev"><span></span></div>').append('<div class="camera_next"><span></span></div>'),1==a.thumbnails&&h.append('<div class="camera_thumbs_cont" />'),1==a.thumbnails&&1!=a.pagination&&$(".camera_thumbs_cont",h).wrap("<div />").wrap('<div class="camera_thumbs" />').wrap("<div />").wrap('<div class="camera_command_wrap" />'),1==a.pagination&&h.append('<div class="camera_pag"></div>'),h.append('<div class="camera_loader"></div>'),$(".camera_caption",h).each(function(){$(this).wrapInner("<div />")});var g,u,v="pie_"+h.index(),b=$(".camera_src",h),w=$(".camera_target",h),_=$(h).next(),k=$(".camera_pie",h),y=$(".camera_bar",h),C=$(".camera_prev",h),x=$(".camera_next",h),T=$(".camera_commands",h),L=$(".camera_pag",h),R=$(".camera_thumbs_cont",h),M=new Array;$("> div",b).each(function(){M.push($(this).attr("data-src"))});var S=new Array;$("> div",b).each(function(){$(this).attr("data-link")?S.push($(this).attr("data-link")):S.push("")});var B=new Array;$("> div",b).each(function(){$(this).attr("data-target")?B.push($(this).attr("data-target")):B.push("")});var F=new Array;$("> div",b).each(function(){$(this).attr("data-portrait")?F.push($(this).attr("data-portrait")):F.push("")});var q=new Array;$("> div",b).each(function(){$(this).attr("data-alignment")?q.push($(this).attr("data-alignment")):q.push("")});var I=new Array;$("> div",b).each(function(){$(this).attr("data-thumb")?I.push($(this).attr("data-thumb")):I.push("")});var O=M.length;$(_).append('<div class="cameraContents" />');var P;for(P=0;P<O;P++)if($(".cameraContents",_).append('<div class="cameraContent" />'),""!=S[P]){var H=$("> div ",b).eq(P).attr("data-box");H="undefined"!=typeof H&&H!==!1&&""!=H?'data-box="'+$("> div ",b).eq(P).attr("data-box")+'"':""}$(".camera_caption",h).each(function(){var a=$(this).parent().index(),e=h.find(".cameraContent").eq(a);$(this).appendTo(e)}),w.append('<div class="cameraCont" />');var A,W=$(".cameraCont",h);for(A=0;A<O;A++){W.append('<div class="cameraSlide cameraSlide_'+A+'" />');var D=$("> div:eq("+A+")",b);w.find(".cameraSlide_"+A).clone(D)}$(window).bind("load resize pageshow",function(){n(),i()}),W.append('<div class="cameraSlide cameraSlide_'+A+'" />');var E;h.show();var z,g=w.width(),u=w.height();$(window).bind("resize pageshow",function(){1==E&&r(),$("ul",R).animate({"margin-top":0},0,n),b.hasClass("paused")||(b.addClass("paused"),$(".camera_stop",V).length?($(".camera_stop",V).hide(),$(".camera_play",V).show(),"none"!=f&&$("#"+v).hide()):"none"!=f&&$("#"+v).hide(),clearTimeout(z),z=setTimeout(function(){b.removeClass("paused"),$(".camera_play",V).length?($(".camera_play",V).hide(),$(".camera_stop",V).show(),"none"!=f&&$("#"+v).fadeIn()):"none"!=f&&$("#"+v).fadeIn()},1500))});var N,G,j,Q,T,L,K;if(j=t()&&""!=a.mobileAutoAdvance?a.mobileAutoAdvance:a.autoAdvance,0==j&&b.addClass("paused"),Q=t()&&""!=a.mobileNavHover?a.mobileNavHover:a.navigationHover,0!=b.length){var J=$(".cameraSlide",w);J.wrapInner('<div class="camerarelative" />');var U=a.barDirection,V=h;$("iframe",m).each(function(){var a=$(this),e=a.attr("src");a.attr("data-src",e);var t=a.parent().index(".camera_src > div");$(".cameraContent:eq("+t+")",_).append(a)}),o(),1==a.hover&&(t()||m.hover(function(){b.addClass("hovered")},function(){b.removeClass("hovered")})),1==Q&&($(C,h).animate({opacity:0},0),$(x,h).animate({opacity:0},0),$(T,h).animate({opacity:0},0),t()?($(document).on("vmouseover",p,function(){$(C,h).animate({opacity:1},200),$(x,h).animate({opacity:1},200),$(T,h).animate({opacity:1},200)}),$(document).on("vmouseout",p,function(){$(C,h).delay(500).animate({opacity:0},200),$(x,h).delay(500).animate({opacity:0},200),$(T,h).delay(500).animate({opacity:0},200)})):m.hover(function(){$(C,h).animate({opacity:1},200),$(x,h).animate({opacity:1},200),$(T,h).animate({opacity:1},200)},function(){$(C,h).animate({opacity:0},200),$(x,h).animate({opacity:0},200),$(T,h).animate({opacity:0},200)})),V.on("click",".camera_stop",function(){j=!1,b.addClass("paused"),$(".camera_stop",V).length?($(".camera_stop",V).hide(),$(".camera_play",V).show(),"none"!=f&&$("#"+v).hide()):"none"!=f&&$("#"+v).hide()}),V.on("click",".camera_play",function(){j=!0,b.removeClass("paused"),$(".camera_play",V).length?($(".camera_play",V).hide(),$(".camera_stop",V).show(),"none"!=f&&$("#"+v).show()):"none"!=f&&$("#"+v).show()}),1==a.pauseOnClick}if("pie"!=f){y.append('<span class="camera_bar_cont" />'),$(".camera_bar_cont",y).animate({opacity:a.loaderOpacity},0).css({position:"absolute",left:0,right:0,top:0,bottom:0,"background-color":a.loaderBgColor}).append('<span id="'+v+'" />'),$("#"+v).animate({opacity:0},0);var X=$("#"+v);switch(X.css({position:"absolute","background-color":a.loaderColor}),a.barPosition){case"left":y.css({right:"auto",width:a.loaderStroke});break;case"right":y.css({left:"auto",width:a.loaderStroke});break;case"top":y.css({bottom:"auto",height:a.loaderStroke});break;case"bottom":y.css({top:"auto",height:a.loaderStroke})}switch(U){case"leftToRight":X.css({left:0,right:0,top:a.loaderPadding,bottom:a.loaderPadding});break;case"rightToLeft":X.css({left:0,right:0,top:a.loaderPadding,bottom:a.loaderPadding});break;case"topToBottom":X.css({left:a.loaderPadding,right:a.loaderPadding,top:0,bottom:0});break;case"bottomToTop":X.css({left:a.loaderPadding,right:a.loaderPadding,top:0,bottom:0})}}else{k.append('<canvas id="'+v+'"></canvas>');var X=document.getElementById(v);X.setAttribute("width",a.pieDiameter),X.setAttribute("height",a.pieDiameter);var Y;switch(a.piePosition){case"leftTop":Y="left:0; top:0;";break;case"rightTop":Y="right:0; top:0;";break;case"leftBottom":Y="left:0; bottom:0;";break;case"rightBottom":Y="right:0; bottom:0;"}X.setAttribute("style","position:absolute; z-index:1002; "+Y);var Z,aa;if(X&&X.getContext){var ea=X.getContext("2d");ea.rotate(1.5*Math.PI),ea.translate(-a.pieDiameter,0)}}if("none"!=f&&0!=j||($("#"+v).hide(),$(".camera_canvas_wrap",V).hide()),$(L).length){$(L).append('<ul class="camera_pag_ul" />');var ta;for(ta=0;ta<O;ta++)$(".camera_pag_ul",h).append('<li class="pag_nav_'+ta+'" style="position:relative; z-index:1002"><span><span>'+ta+"</span></span></li>");$(".camera_pag_ul li",h).hover(function(){if($(this).addClass("camera_hover"),$(".camera_thumb",this).length){var a=$(".camera_thumb",this).outerWidth(),e=$(".camera_thumb",this).outerHeight(),t=$(this).outerWidth();$(".camera_thumb",this).show().css({top:"-"+e+"px",left:"-"+(a-t)/2+"px"}).animate({opacity:1,"margin-top":"-3px"},200),$(".thumb_arrow",this).show().animate({opacity:1,"margin-top":"-3px"},200)}},function(){$(this).removeClass("camera_hover"),$(".camera_thumb",this).animate({"margin-top":"-20px",opacity:0},200,function(){$(this).css({marginTop:"5px"}).hide()}),$(".thumb_arrow",this).animate({"margin-top":"-20px",opacity:0},200,function(){$(this).css({marginTop:"5px"}).hide()})})}if($(R).length){$(L).length?($.each(I,function(a,e){if(""!=$("> div",b).eq(a).attr("data-thumb")){var t=$("> div",b).eq(a).attr("data-thumb"),i=new Image;i.src=t,$("li.pag_nav_"+a,L).append($(i).attr("class","camera_thumb").css({position:"absolute"}).animate({opacity:0},0)),$("li.pag_nav_"+a+" > img",L).after('<div class="thumb_arrow" />'),$("li.pag_nav_"+a+" > .thumb_arrow",L).animate({opacity:0},0)}}),h.css({marginBottom:$(L).outerHeight()})):($(R).append("<div />"),$(R).before('<div class="camera_prevThumbs hideNav"><div></div></div>').before('<div class="camera_nextThumbs hideNav"><div></div></div>'),$("> div",R).append("<ul />"),$.each(I,function(a,e){if(""!=$("> div",b).eq(a).attr("data-thumb")){var t=$("> div",b).eq(a).attr("data-thumb"),i=new Image;i.src=t,$("ul",R).append('<li class="pix_thumb pix_thumb_'+a+'" />'),$("li.pix_thumb_"+a,R).append($(i).attr("class","camera_thumb"))}}))}else!$(R).length&&$(L).length&&h.css({marginBottom:$(L).outerHeight()});var ia=!0;$(T).length&&($(T).append('<div class="camera_play"></div>').append('<div class="camera_stop"></div>'),1==j?($(".camera_play",V).hide(),$(".camera_stop",V).show()):($(".camera_stop",V).hide(),$(".camera_play",V).show())),c(),$(".moveFromLeft, .moveFromRight, .moveFromTop, .moveFromBottom, .fadeIn, .fadeFromLeft, .fadeFromRight, .fadeFromTop, .fadeFromBottom",m).each(function(){$(this).css("visibility","hidden")}),a.onStartLoading.call(this),l(),$(C).length&&$(C).click(function(){if(!b.hasClass("camerasliding")){var e=parseFloat($(".cameraSlide.cameracurrent",w).index());clearInterval(N),o(),$("#"+v+", .camera_canvas_wrap",h).animate({opacity:0},0),c(),l(0!=e?e:O),a.onStartLoading.call(this)}}),$(x).length&&$(x).click(function(){if(!b.hasClass("camerasliding")){var e=parseFloat($(".cameraSlide.cameracurrent",w).index());clearInterval(N),
o(),$("#"+v+", .camera_canvas_wrap",V).animate({opacity:0},0),c(),l(e==O-1?1:e+2),a.onStartLoading.call(this)}}),t()&&(m.bind("swipeleft",function(e){if(!b.hasClass("camerasliding")){var t=parseFloat($(".cameraSlide.cameracurrent",w).index());clearInterval(N),o(),$("#"+v+", .camera_canvas_wrap",V).animate({opacity:0},0),c(),l(t==O-1?1:t+2),a.onStartLoading.call(this)}}),m.bind("swiperight",function(e){if(!b.hasClass("camerasliding")){var t=parseFloat($(".cameraSlide.cameracurrent",w).index());clearInterval(N),o(),$("#"+v+", .camera_canvas_wrap",V).animate({opacity:0},0),c(),l(0!=t?t:O),a.onStartLoading.call(this)}})),$(L).length&&$(".camera_pag li",h).click(function(){if(!b.hasClass("camerasliding")){var e=parseFloat($(this).index()),t=parseFloat($(".cameraSlide.cameracurrent",w).index());e!=t&&(clearInterval(N),o(),$("#"+v+", .camera_canvas_wrap",V).animate({opacity:0},0),c(),l(e+1),a.onStartLoading.call(this))}}),$fluidContainer=$("#fluidContainer"),$(".pix_thumb a",$fluidContainer).click(function(){if(!b.hasClass("camerasliding")){var e=parseFloat($(this).parents("li").index()),t=parseFloat($(".cameracurrent",w).index());e!=t&&(clearInterval(N),o(),$("#"+v+", .camera_canvas_wrap",V).animate({opacity:0},0),$(".pix_thumb",$fluidContainer).removeClass("cameracurrent"),$(this).parents("li").addClass("cameracurrent"),c(),l(e+1),n(),a.onStartLoading.call(this))}}),$(R).length&&($(".camera_thumbs_cont .camera_prevThumbs",V).hover(function(){$(this).stop(!0,!1).animate({opacity:1},250)},function(){$(this).stop(!0,!1).animate({opacity:.7},250)}),$(".camera_prevThumbs",V).click(function(){var a=0,e=($(R).outerWidth(),$("ul",R).offset().left),t=$("> div",R).offset().left,r=t-e;$(".camera_visThumb",R).each(function(){var e=$(this).outerWidth();a+=e}),r-a>0?$("ul",R).animate({"margin-left":"-"+(r-a)+"px"},500,i):$("ul",R).animate({"margin-left":0},500,i)}),$(".camera_thumbs_cont .camera_nextThumbs",V).hover(function(){$(this).stop(!0,!1).animate({opacity:1},250)},function(){$(this).stop(!0,!1).animate({opacity:.7},250)}),$(".camera_nextThumbs",V).click(function(){var a=0,e=$(R).outerWidth(),t=$("ul",R).outerWidth(),r=$("ul",R).offset().left,o=$("> div",R).offset().left,s=o-r;$(".camera_visThumb",R).each(function(){var e=$(this).outerWidth();a+=e}),s+a+a<t?$("ul",R).animate({"margin-left":"-"+(s+a)+"px"},500,i):$("ul",R).animate({"margin-left":"-"+(t-e)+"px"},500,i)}))}}(jQuery),function($){$.fn.cameraStop=function(){var a=$(this),e=$(".camera_src",a);"pie_"+a.index();if(e.addClass("stopped"),$(".camera_showcommands").length){$(".camera_thumbs_wrap",a)}else;}}(jQuery),function($){$.fn.cameraPause=function(){var a=$(this),e=$(".camera_src",a);e.addClass("paused")}}(jQuery),function($){$.fn.cameraResume=function(){var a=$(this),e=$(".camera_src",a);"undefined"!=typeof autoAdv&&autoAdv===!0||e.removeClass("paused")}}(jQuery);