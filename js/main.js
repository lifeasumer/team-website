
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


 /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });



    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });

    $('.dropdown-submenu a.dropdown-toggle').on("click", function(e){
        $(this).next('.dropdown-menu').toggle();
        e.stopPropagation();
        e.preventDefault();
    });

})(jQuery);


    /*==================================================================
    [ Mobile Dropdown Menu ]*/
    $(".menu-mobile .dropdown-hover > a").on("click", function(e) {
        e.preventDefault();
        $(this).parent().find(".submenu").slideToggle();
        $(this).find(".arrow").toggleClass("rotate-arrow");
    });

    // Close mobile dropdowns when screen size changes to desktop
    $(window).resize(function(){
        if($(window).width() >= 992){
            $(".menu-mobile .submenu").slideUp();
            $(".menu-mobile .dropdown-hover > a .arrow").removeClass("rotate-arrow");
        }
    });



document.addEventListener('DOMContentLoaded', function () {
	const accountDropdown = document.querySelector('.js-toggle-account');

	if (accountDropdown) {
		accountDropdown.addEventListener('click', function (e) {
			e.preventDefault();
			this.classList.toggle('active');
		});
	}

	// Mobile Account Dropdown - works like main menu
	$('.js-toggle-account-mobile').on('click', function(e){
		e.preventDefault();
		$('.menu-mobile-account').slideToggle();
		$(this).toggleClass('active-account');
	});

	// Language submenu toggle for mobile
	$('.js-toggle-language').on('click', function(e){
		e.preventDefault();
		$(this).parent().find('.js-submenu-language').slideToggle();
		$(this).toggleClass('turn-arrow-main-menu-m');
	});

	// Currency submenu toggle for mobile
	$('.js-toggle-currency').on('click', function(e){
		e.preventDefault();
		$(this).parent().find('.js-submenu-currency').slideToggle();
		$(this).toggleClass('turn-arrow-main-menu-m');
	});

	// Close mobile account menu when main menu is toggled
	$('.btn-show-menu-mobile').on('click', function(){
		if($('.menu-mobile-account').css('display') == 'block') {
			$('.menu-mobile-account').slideUp();
			$('.js-toggle-account-mobile').removeClass('active-account');
		}
	});

	// Close mobile account menu when window is resized to desktop
	$(window).resize(function(){
		if($(window).width() >= 992){
			if($('.menu-mobile-account').css('display') == 'block') {
				$('.menu-mobile-account').css('display','none');
				$('.js-toggle-account-mobile').removeClass('active-account');
			}
			$('.js-submenu-language, .js-submenu-currency').each(function(){
				if($(this).css('display') == 'block') {
					$(this).css('display','none');
					$('.js-toggle-language, .js-toggle-currency').removeClass('turn-arrow-main-menu-m');
				}
			});
		}
	});
});
// Handle Language/Currency submenu hover + click selection
document.querySelectorAll('.trigger').forEach(trigger => {
  trigger.addEventListener('mouseenter', function () {
    const targetId = this.dataset.target;

    // Hide all submenus first
    document.querySelectorAll('.sub-dropdown').forEach(menu => {
      menu.style.display = 'none';
    });

    // Show the targeted submenu
    const targetMenu = document.querySelector(targetId);
    if (targetMenu) {
      targetMenu.style.display = 'flex';
    }
  });
});

// Add active class to clicked item (navbar-style)
document.querySelectorAll('.sub-dropdown .dropdown-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove active from all siblings
    const menu = this.closest('.sub-dropdown');
    if (menu) {
      menu.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
    }

    // Set clicked one as active
    this.classList.add('active');
  });
});

// Optional: hide submenu when mouse leaves whole dropdown area
document.querySelector('.dropdown-menu').addEventListener('mouseleave', function () {
  document.querySelectorAll('.sub-dropdown').forEach(menu => {
    menu.style.display = 'none';
  });
});
