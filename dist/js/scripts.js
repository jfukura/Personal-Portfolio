var model={view:"intro"},control={init:function(){""!==window.location.hash.substr(1)?model.view=window.location.hash.substr(1).split("=")[0]:model.view="intro",control.view.change(model.view),control.menu()},view:{change:function(e,n){"intro"!==e&&$(".badge").removeClass("mod-full"),$(".menu-target").removeClass("is-active"),$('.menu-target[href="#'+model.view.toLowerCase()+'"]').addClass("is-active"),$(".js-main").fadeTo(250,0,function(){$(".js-main").load("view/"+e+".view.html",function(){control.view.options[e](),$(".js-main").fadeTo(250,1),control.externalLinks(),n&&n()})})},options:{intro:function(){console.log("intro view stuff")},work:function(){$(".work").on("mouseenter mouseleave focusin focusout click",function(e){if("mouseenter"===e.type||"focusin"===e.type)$(this).addClass("is-hovered");else if("mouseleave"===e.type||"focusout"===e.type)$(this).removeClass("is-hovered");else if("click"===e.type){var n=this.id;control.view.change("project"),window.location.hash="project="+n}})},project:function(){function e(){$(".js-main").fadeTo(250,1)}var n=window.location.hash.substr(1).split("=")[1];$(".js-main").fadeTo(250,0,function(){control.view.getProject(n,e)})},resume:function(){$(".stat-graph").each(function(){var e=$(this).data("stat");$(this).append('<span class="stat-graph-bar"></span>'),$(this).find(".stat-graph-bar").css("width",e+"%")})}},getProject:function(e,n){$.ajax("view/projects.xml").success(function(n){for(var i=$(n).find('project[id="'+e+'"]'),t=i.children().length-1;t>=0;t--){var o=i.children()[t].nodeName;if("images"===o){var s=$(i.children()[t]).attr("key");$("#keyImg").attr("src",s),$(i.children()[t]).children().each(function(){var e=this.innerHTML,n='<li class="imglist-item"><img src="'+e+'"/></li>';$("#imgList").append(n)})}else $("#"+o).html(i.children()[t].innerHTML.replace("<![CDATA[","").replace("]]>",""))}}).done(function(e){n()})}},menu:function(){$(".hamburger").on("click",function(e){$(this).toggleClass("is-active"),$(".menu").toggleClass("is-active")}),$(".menu-target").on("click",function(e){e.preventDefault(),model.view=$(this).attr("href").replace("#",""),history.pushState(null,null,"/#"+model.view),control.view.change(model.view)})},getUrlVars:function(){for(var e,n=[],i=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),t=0;t<i.length;t++)e=i[t].split("="),n.push(e[0]),n[e[0]]=e[1];return n},externalLinks:function(){$('.link[target="_blank"]').on("click",function(){ga("send","event","External Link","Click",$(this).attr("href"))})}};$(function(){control.init()});