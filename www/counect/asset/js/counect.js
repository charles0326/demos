var toggleLan = true;
/*解决Safari下a标签after伪类导致点击两次才触发点击的问题*/
/*$(document).ready(function(){
    $(document).on('touchstart',function(){},false);
});*/
document.addEventListener('touchstart',function(){},false);
/***************************************************************/
$(function(){
    $('.counect_header_nav-container a').on('click', function(){
        $('.counect_header_nav-container a').removeClass('header_nav_link-active');
        $(this).addClass('header_nav_link-active');
    });
    $('.counect__js-click__preview').on('click', function(){
        $.scrollTo($('.counect_preview'), 1000);
    });

    $('.counect__js-click__csp').on('click', function(){
        $.scrollTo($('.counect_csp'), 1000, {offset: -100});
    });

    $('.counect__js-click__hipay').on('click', function(){
        $.scrollTo($('.counect_hipay'), 1000, {offset: -100});
    });

    $('.counect__js-click__coinect').on('click', function(){
        $.scrollTo($('.counect_coinect'), 1000, {offset: -100});
    });

    $('.counect__js-click__cube').on('click', function(){
        $.scrollTo($('.counect_cube'), 1000, {offset: -100});
    });

    $('.counect__js-click__about').on('click', function(){
        $.scrollTo($('.counect_about'), 1000, {offset: -100});
    });
    $('.mobile__js-click__preview').on('click', function(){
        $.scrollTo($('.counect_preview'), 1000);
    });

    $('.mobile__js-click__csp').on('click', function(){
        $.scrollTo($('.counect_csp'), 1000, {offset: -100});
    });

    $('.mobile__js-click__hipay').on('click', function(){
        $.scrollTo($('.counect_hipay'), 1000, {offset: -100});
    });

    $('.mobile__js-click__coinect').on('click', function(){
        $.scrollTo($('.counect_coinect'), 1000, {offset: -100});
    });

    $('.mobile__js-click__cube').on('click', function(){
        $.scrollTo($('.counect_cube'), 1000, {offset: -100});
    });

    $('.mobile__js-click__about').on('click', function(){
        $.scrollTo($('.counect_about'), 1000, {offset: -100});
    });
    
    $('.counect__js-click__lan').on('click', function(){
        if(toggleLan){
            lanHandler("en");
        }
        else{
            lanHandler("cn");
        }
        toggleLan = !toggleLan;
    });
	
	$('body').on('click', function(){
		var display = $('#mobile_nav-panel').css('display');
		var toggles = $(".c-hamburger");
		if(display == "block")	toggles[0].classList.remove("is-active");
	});
});