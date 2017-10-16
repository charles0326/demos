$(function(){
	$('.main-nav > li > a > i ').on('mouseover',function(e){
    	e.stopPropagation();
    	$('.drop-down-nav').hide()
			$(this).parents('a').next('.drop-down-nav').stop().hide().slideDown(1000);
	});

	$('.drop-down-nav').on('mouseover',function(e){
		e.stopPropagation();
	});

	$('body').on('mouseover', function(){
		$('.drop-down-nav').hide();
	});

	$(window).on('mouseover', function(){
		$('#search-btn>i').css('color','#A7ABB5');
		$('#search-text').fadeOut();
		$('.drop-down-nav').hide();
	});

	$('.search-layout, .search-layout > button').mouseover(function(e){
		e.stopPropagation();
		$('#search-btn>i').css('color','#fff');
		$('#search-text').fadeIn();
	});

	$('.nav-btn').bind('click',function(){
		$('.mobile-down-nav').fadeToggle();
	});

	// $('.fa-sort-desc').click(function(){
	// 	$(this).parents('.return-teaching').toggleClass('return-teaching-change');	
	// 	$(this).next('.u-teaching-work').toggleClass('u-teaching-work-fade');
	// });

	$('#sign-btn').click(function(e){
		e.stopPropagation();
		$(this).siblings('span').toggleClass('on');	
		$(this).next('.u-teaching-work').toggleClass('u-teaching-work-fade');
	});

	$(window).on('click',function(){
		$('.sign-btn>span').removeClass('on');
		$('.u-teaching-work').removeClass('u-teaching-work-fade');
	});

	$('.post_list').click(function(){
		$(this).next('.more_content').slideToggle();
	});

	$(window).scroll(function(){
		var top = $(window).scrollTop();
		var width = $(window).width();

		if (top > 53 & width > 720){
			$('.nav').css({'position':'fixed','top':'0','z-index':'999','background':'#0f3565'});
			$('.home_link').animate({top:'20px'},'fast');
			$('.top-nav').css('display','none');
		}else if(top <= 53 & width > 720){
			$('.nav').css('position','relative');
			$('.top-nav').css('display','block');
			$('.home_link').animate({top:'0px'});
		};
	});

	$('.u-t-logo').click(function(){
		// $(this).find('span').css('display','none');
		$('.welcome').css({"display":"block"});
	});
	
	$('.close_btn').click(function(){
		$('.welcome').css({"display":"none"});
	});

	//回到顶部
	$("#back-top").hide();
	$(function () {
		$(window).scroll(function(){
			if ($(window).scrollTop()>1000){
			$("#back-top").fadeIn(500);
			$('#back-top a').removeClass('visted');
		}
		else
		{
			$("#back-top").fadeOut(500);
		}
		});
		$("#back-top").click(function(){
		$('body,html').animate({scrollTop:0},1000);
		$('#back-top a').addClass('visted');
		return false;
		});
	});

	// 百度统计
	var _hmt = _hmt || [];
	(function() {
	  var hm = document.createElement("script");
	  hm.src = "//hm.baidu.com/hm.js?efe09603f45cae5a11b7264c07f34317";
	  var s = document.getElementsByTagName("script")[0]; 
	  s.parentNode.insertBefore(hm, s);
	})();

	//banner动画效果
	$(document).ready(function(){
		$('.banner-ziti.Animate').animate({
			top:'140px',
			opacity:'show',
		},{
			easing:'easeOutCubic',
			duration:1000,
			queue:false,
		});

		$('.banner-ziti.contact').animate({
			top:'90px',
			opacity:'show',
		},{
			easing:'easeOutCubic',
			duration:1000,
			queue:false,
		});
	});
	// 三级菜单动画
	$(".topmenu").lavaLamp({
        fx: "backout",  
        speed: 700,
        click: function(event, menuItem) {
            // return false;
        }
    });
	
})