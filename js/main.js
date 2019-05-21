var $hpMain = {
    winWidth:0,
    mouseOverElement : [],
	mouseOutElement : [],
    init : function() {
		$hpMain.turnPageEvent();
		$hpMain.randerEvent();
		// $hpMain.saveContactEvent();
		// $hpMain.checkContentDetail();
		// $hpMain.queryContentEvent();
		$hpMain.scalingEvent();
		$hpMain.navMenuBtnEvent();
    },

    // 顶部导航
    navMenuBtnEvent : function() {
        // 遍历 .each
		$('li.mainlevel').each(function(index) {
            // 鼠标移动到一个对象上面及移出这个对象 hover  
            // 鼠标移动到上面时，触发第一个函数。鼠标移出这个元素时，触发第二个函数。
			$(this).hover(function() {  // 移入
				$(this).children("a").addClass("nav-first-h");
				var _self = this;
                clearTimeout($hpMain.mouseOutElement[index]);
                // 给每个li增加事件
				$hpMain.mouseOverElement[index] = setTimeout(function() {
                    // 滑动 slideDown 200毫秒
					$(_self).find('ul').slideDown(200);
				}, 300);
			}, function() {   // 移出
				$(this).children("a").removeClass("nav-first-h");
				var _self = this;
				clearTimeout($hpMain.mouseOverElement[index]);
				$hpMain.mouseOutElement[index] = setTimeout(function() {
					$(_self).find('ul').slideUp(200);
				}, 300);
			});
		});
		// $("li.mainlevel").children("ul").each(function(index) {
		// 	$(this).focus(function() {
		// 		$(this).parent("li").addClass("nav-first-h");
		// 	}, function() {
		// 		$(this).parent("li").removeClass("nav-first-h");
		// 	});
		// });
    },
    // 浏览器宽
    scalingEvent : function() {
        // 获取 window 和 document 的宽  .width()
		$hpMain.winWidth = $(window).width();
		$hpMain.randerNavState();
    },
    // 响应式 改变a的padding值 搜索块的margin-right input框的宽度
	randerNavState : function() {
		if ($hpMain.winWidth <= 1150) {
			$hpMain.randerFirstNavPadding("0px 6px");
			$("#keyword").css("width", "80px");
			$("table.search-table").css("margin-right", "10px");
		} else if ($hpMain.winWidth <= 1270) {
			$hpMain.randerFirstNavPadding("0px 10px");
			$("#keyword").css("width", "115px");
			$("table.search-table").css("margin-right", "10px");
		} else {
			$hpMain.randerFirstNavPadding("0px 15px");
			$("#keyword").css("width", "135px");
			$("table.search-table").css("margin-right", "20px");
		}
	},
	randerFirstNavPadding : function(padding) {
		$(".mainlevel").children("a").each(function() {
			$(this).css("padding", padding);
			var ul = $(this).parent("li").children("ul");
			if (ul.length > 0) {
                // 第一个匹配元素外部宽度 设置为 true 时，计算边距在内。
				var width = $(this).outerWidth(true);
				ul.each(function() {
                    // 改变下拉菜单ul的位置
					$(this).css("left", -(130 - width - 15)/2 + "px");
				});
			}
		});
    },
    // navBtn的点击事件
	turnPageEvent : function() {
		$(".navBtn").click(function() {
            // 获取url属性值
    		var url = $(this).attr("url");
            // 首页按钮
			if ($(this).hasClass("homepage")) {
				window.location.href = url;
			} else { // 除了首页之外 其他的页面
				var rltPage = $(this).attr("rltPage");
                var id = $(this).attr("id");
                // rltPage 属性有值
				if (rltPage != undefined && rltPage != null && rltPage.length > 0) {
					window.location.href = url + "?p=" + rltPage + "&navId=" + id;
				}
			}
		});
    },
    randerEvent : function() {
		// $(".container").on("scroll", function() {
		// 	var top = $(this).offset().top;
		// 	$(".img-news").html(top);
		// });
		$(".img-news-con").find("li").hover(function(){
			$(this).find(".img-news-txt").stop().animate({height:"150px"},400);
		},function(){
			$(this).find(".img-news-txt").stop().animate({height:"50px"},400);
		});
	},
}
$(function() {
	$hpMain.init();
});