/*! lidy compress 2016-04-26 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports&&"function"==typeof require?require("jquery"):jQuery)}(function(a){function b(b,d){this._name=c,this.el=b,this.$el=a(b),this.$el.prop("multiple")||(this.settings=a.extend({},e,d,this.$el.data()),this._defaults=e,this.$options=this.$el.find("option, optgroup"),this.init(),a.fn[c].instances.push(this))}var c="comboSelect",d="comboselect",e={comboClass:"combo-select",comboArrowClass:"combo-arrow",comboDropDownClass:"combo-dropdown",inputClass:"combo-input text-input",disabledClass:"option-disabled",hoverClass:"option-hover",selectedClass:"option-selected",markerClass:"combo-marker",themeClass:"",maxHeight:200,extendStyle:!0,focusInput:!0},f={ESC:27,TAB:9,RETURN:13,LEFT:37,UP:38,RIGHT:39,DOWN:40,ENTER:13,SHIFT:16},g=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());a.extend(b.prototype,{init:function(){this._construct(),this._events()},_construct:function(){this.$el.data("plugin_"+d+"_tabindex",this.$el.prop("tabindex")),!g&&this.$el.prop("tabIndex",-1),this.$container=this.$el.wrapAll('<div class="'+this.settings.comboClass+" "+this.settings.themeClass+'" />').parent(),this.settings.extendStyle&&this.$el.attr("style")&&this.$container.attr("style",this.$el.attr("style")),this.$arrow=a('<div class="'+this.settings.comboArrowClass+'" />').appendTo(this.$container),this.$dropdown=a('<ul class="'+this.settings.comboDropDownClass+'" />').appendTo(this.$container),this._build(),this.$input=a('<input type="text"'+(g?'tabindex="-1"':"")+' placeholder="'+this.getPlaceholder()+'" class="'+this.settings.inputClass+'">').appendTo(this.$container),this._updateInput()},getPlaceholder:function(){var a="";return this.$options.filter(function(a,b){return"OPTION"==b.nodeName}).each(function(b,c){""==c.value&&(a=c.innerHTML)}),a},_build:function(){var a=this,b="",c=0;this.$options.each(function(d,e){return"optgroup"==e.nodeName.toLowerCase()?b+='<li class="option-group">'+this.label+"</li>":(b+='<li class="'+(this.disabled?a.settings.disabledClass:"option-item")+" "+(c==a.$el.prop("selectedIndex")?a.settings.selectedClass:"")+'" data-index="'+c+'" data-value="'+this.value+'">'+this.innerHTML+"</li>",void c++)}),this.$dropdown.html(b),this.$items=this.$dropdown.children()},_events:function(){this.$container.on("focus.input","input",a.proxy(this._focus,this)),this.$container.on("mouseup.input","input",function(a){a.preventDefault()}),this.$container.on("blur.input","input",a.proxy(this._blur,this)),this.$el.on("change.select",a.proxy(this._change,this)),this.$el.on("focus.select",a.proxy(this._focus,this)),this.$el.on("blur.select",a.proxy(this._blurSelect,this)),this.$container.on("click.arrow","."+this.settings.comboArrowClass,a.proxy(this._toggle,this)),this.$container.on("comboselect:close",a.proxy(this._close,this)),this.$container.on("comboselect:open",a.proxy(this._open,this)),this.$container.on("comboselect:update",a.proxy(this._update,this)),a("html").off("click.comboselect").on("click.comboselect",function(){a.each(a.fn[c].instances,function(a,b){b.$container.trigger("comboselect:close")})}),this.$container.on("click.comboselect",function(a){a.stopPropagation()}),this.$container.on("keydown","input",a.proxy(this._keydown,this)),this.$container.on("keyup","input",a.proxy(this._keyup,this)),this.$container.on("click.item",".option-item",a.proxy(this._select,this))},_keydown:function(a){switch(a.which){case f.UP:this._move("up",a);break;case f.DOWN:this._move("down",a);break;case f.TAB:this._enter(a);break;case f.RIGHT:this._autofill(a);break;case f.ENTER:this._enter(a)}},_keyup:function(a){switch(a.which){case f.ESC:this.$container.trigger("comboselect:close");break;case f.ENTER:case f.UP:case f.DOWN:case f.LEFT:case f.RIGHT:case f.TAB:case f.SHIFT:break;default:this._filter(a.target.value)}},_enter:function(a){var b=this._getHovered();if(b.length&&this._select(b),a&&a.which==f.ENTER){if(!b.length)return this._blur(),!0;a.preventDefault()}},_move:function(a){var b=this._getVisible(),c=this._getHovered(),d=c.prevAll(".option-item").filter(":visible").length,e=b.length;switch(a){case"up":d--,0>d&&(d=e-1);break;case"down":d++,d>=e&&(d=0)}b.removeClass(this.settings.hoverClass).eq(d).addClass(this.settings.hoverClass),this.opened||this.$container.trigger("comboselect:open"),this._fixScroll()},_select:function(b){var c=a(b.currentTarget?b.currentTarget:b);if(c.length){var d=c.data("index");this._selectByIndex(d),this.$input.focus(),this.$container.trigger("comboselect:close")}},_selectByIndex:function(a){"undefined"==typeof a&&(a=0),this.$el.prop("selectedIndex")!=a&&this.$el.prop("selectedIndex",a).trigger("change")},_autofill:function(){var a=this._getHovered();if(a.length){var b=a.data("index");this._selectByIndex(b)}},_filter:function(b){var c=this,d=this._getAll();needle=a.trim(b).toLowerCase(),reEscape=new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\"].join("|\\")+")","g"),pattern="("+b.replace(reEscape,"\\$1")+")",a("."+c.settings.markerClass,d).contents().unwrap(),needle?(this.$items.filter(".option-group, .option-disabled").hide(),d.hide().filter(function(){var b=a(this),d=a.trim(b.text()).toLowerCase();return-1!=d.toString().indexOf(needle)?(b.html(function(a,b){return b.replace(new RegExp(pattern,"gi"),'<span class="'+c.settings.markerClass+'">$1</span>')}),!0):void 0}).show()):this.$items.show(),this.$container.trigger("comboselect:open")},_highlight:function(){var a=this._getVisible().removeClass(this.settings.hoverClass),b=a.filter("."+this.settings.selectedClass);b.length?b.addClass(this.settings.hoverClass):a.removeClass(this.settings.hoverClass).first().addClass(this.settings.hoverClass)},_updateInput:function(){var b=this.$el.prop("selectedIndex");return this.$el.val()?(text=this.$el.find("option").eq(b).text(),this.$input.val(text)):this.$input.val(""),this._getAll().removeClass(this.settings.selectedClass).filter(function(){return a(this).data("index")==b}).addClass(this.settings.selectedClass)},_blurSelect:function(){this.$container.removeClass("combo-focus")},_focus:function(a){this.$container.toggleClass("combo-focus",!this.opened),g||(this.opened||this.$container.trigger("comboselect:open"),this.settings.focusInput&&a&&a.currentTarget&&"INPUT"==a.currentTarget.nodeName&&a.currentTarget.select())},_blur:function(){var b=a.trim(this.$input.val().toLowerCase()),c=!isNaN(b),d=this.$options.filter(function(){return"OPTION"==this.nodeName}).filter(function(){return c?parseInt(a.trim(this.innerText).toLowerCase())==b:a.trim(this.innerText).toLowerCase()==b}).prop("index");this._selectByIndex(d)},_change:function(){this._updateInput()},_getAll:function(){return this.$items.filter(".option-item")},_getVisible:function(){return this.$items.filter(".option-item").filter(":visible")},_getHovered:function(){return this._getVisible().filter("."+this.settings.hoverClass)},_open:function(){var b=this;this.$container.addClass("combo-open"),this.opened=!0,this.settings.focusInput&&setTimeout(function(){!b.$input.is(":focus")&&b.$input.focus()}),this._highlight(),this._fixScroll(),a.each(a.fn[c].instances,function(a,c){c!=b&&c.opened&&c.$container.trigger("comboselect:close")})},_toggle:function(){this.opened?this._close.call(this):this._open.call(this)},_close:function(){this.$container.removeClass("combo-open combo-focus"),this.$container.trigger("comboselect:closed"),this.opened=!1,this.$items.show()},_fixScroll:function(){if(!this.$dropdown.is(":hidden")){var a=this._getHovered();if(a.length){var b,c,d,e=a.outerHeight();b=a[0].offsetTop,c=this.$dropdown.scrollTop(),d=c+this.settings.maxHeight-e,c>b?this.$dropdown.scrollTop(b):b>d&&this.$dropdown.scrollTop(b-this.settings.maxHeight+e)}}},_update:function(){this.$options=this.$el.find("option, optgroup"),this.$dropdown.empty(),this._build()},dispose:function(){this.$arrow.remove(),this.$input.remove(),this.$dropdown.remove(),this.$el.removeAttr("tabindex"),this.$el.data("plugin_"+d+"_tabindex")&&this.$el.prop("tabindex",this.$el.data("plugin_"+d+"_tabindex")),this.$el.unwrap(),this.$el.removeData("plugin_"+d),this.$el.removeData("plugin_"+d+"_tabindex"),this.$el.off("change.select focus.select blur.select")}}),a.fn[c]=function(c,e){return this.each(function(){var f=a(this),g=f.data("plugin_"+d);"string"==typeof c?g&&"function"==typeof g[c]&&g[c](e):(g&&g.dispose&&g.dispose(),a.data(this,"plugin_"+d,new b(this,c)))}),this},a.fn[c].instances=[]});