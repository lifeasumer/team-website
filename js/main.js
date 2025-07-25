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
        browser: ['animation-duration', '-webkit-animation-duration'],
        overlay: false,
        overlayClass: 'animsition-overlay-slide',
        overlayParentElement: 'html',
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

    /*[ Fixed Header ]*/
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

    $(document).ready(function () {
        // Handle account button click
        $('.btn-show-menu-mobile-account').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu-mobile-account').slideToggle();          
            $('.menu-mobile').slideUp();      
        });

        // Handle 3-bar menu toggle
        $('.btn-show-menu-mobile').on('click', function () {
            $(this).toggleClass('is-active');
            $('.menu-mobile').slideToggle();           // Toggle main menu
            $('.menu-mobile-account').slideUp();       // ✅ Always hide account dropdown
        });
    });

    /*[ Handle submenu toggles for both menus ]*/
    function bindArrowToggle(menuSelector) {
        $(`${menuSelector} .arrow-main-menu-m`).each(function () {
            $(this).off('click').on('click', function () {
                $(this).closest('.item-menu-m').find('.sub-menu-m').first().slideToggle();
                $(this).toggleClass('turn-arrow-main-menu-m');
            });
        });
    }

    // Initial binding
    bindArrowToggle('.menu-mobile');
    bindArrowToggle('.menu-mobile-account');

    /*[ Responsive Reset ]*/
    $(window).resize(function () {
        if ($(window).width() >= 992) {
            if ($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display', 'none');
                $('.btn-show-menu-mobile').removeClass('is-active');
            }

            $('.sub-menu-m').each(function () {
                if ($(this).css('display') == 'block') {
                    $(this).css('display', 'none');
                    $('.arrow-main-menu-m').removeClass('turn-arrow-main-menu-m');
                }
            });
        }
    });


    /*[ Show / hide modal search ]*/
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

    /*[ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
    });

    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine: 'best-available',
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

    /*[ Filter / Search product ]*/
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

    /*[ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*[ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*[ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*[ Rating ]*/
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
    
    /*[ Show modal1 ]*/
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

$(".menu-mobile .dropdown-hover > a").on("click", function(e) {
    e.preventDefault();
    $(this).parent().find(".submenu").slideToggle();
    $(this).find(".arrow").toggleClass("rotate-arrow");
});

$(window).resize(function(){
    if($(window).width() >= 992){
        $(".menu-mobile .submenu").slideUp();
        $(".menu-mobile .dropdown-hover > a .arrow").removeClass("rotate-arrow");
    }
});

document.querySelectorAll('.sub-dropdown .dropdown-item').forEach(item => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const menu = this.closest('.sub-dropdown');
    if (menu) {
      menu.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('active'));
    }

    this.classList.add('active');
  });
});

const products = [
	{ name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
	{ name: "Adrona Embellished", price: "₨13,000.00", image: "images/traditional-2.jpg" },
	{ name: "Aizal butterfly dress", price: "₨10,000.00", image: "images/traditional-3.jpg" },
	{ name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
    { name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
    { name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
    { name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
    { name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
    { name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg" },
];

const container = document.getElementById('product-list');
products.forEach((product, index) => {
	const html = `
		<div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item product-item" style="display: ${index < 4 ? '' : 'none'}">
			<div class="block2">
				<div class="block2-pic hov-img0">
					<img src="${product.image}" alt="${product.name}">
					<a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
						Quick View
					</a>
				</div>
				<div class="block2-txt flex-w flex-t p-t-14">
					<div class="block2-txt-child1 flex-col-l">
						<a href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">${product.name}</a>
						<span class="stext-105 cl3">From ${product.price}</span>
					</div>
					<div class="block2-txt-child2 flex-r p-t-3">
						<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
							<img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
							<img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
						</a>
					</div>
				</div>
			</div>
		</div>
	`;
	container.insertAdjacentHTML('beforeend', html);
});

const loadMoreBtn = document.querySelector('.load-more-btn');
let visibleCount = 8;

loadMoreBtn.addEventListener('click', function () {
	const items = document.querySelectorAll('.product-item');
	const next = visibleCount + 8;
	for (let i = visibleCount; i < next && i < items.length; i++) {
		items[i].style.display = '';
	}
	visibleCount = next;
	if (visibleCount >= items.length) {
		loadMoreBtn.style.display = 'none';
	}
});

