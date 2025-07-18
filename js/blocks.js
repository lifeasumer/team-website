// Blocks Functionality for Cinderella.pk

// Block hover effects and animations
function initializeBlockEffects() {
    // Block1 hover effects (category blocks)
    document.querySelectorAll('.block1').forEach(block => {
        const blockTxt = block.querySelector('.block1-txt');
        
        if (blockTxt) {
            block.addEventListener('mouseenter', function() {
                blockTxt.classList.add('hov3');
            });
            
            block.addEventListener('mouseleave', function() {
                blockTxt.classList.remove('hov3');
            });
        }
    });
    
    // Block2 hover effects (product blocks)
    document.querySelectorAll('.block2').forEach(block => {
        const blockPic = block.querySelector('.block2-pic');
        const blockBtn = block.querySelector('.block2-btn');
        
        if (blockPic && blockBtn) {
            block.addEventListener('mouseenter', function() {
                blockPic.classList.add('hov-img0');
                blockBtn.style.opacity = '1';
                blockBtn.style.visibility = 'visible';
            });
            
            block.addEventListener('mouseleave', function() {
                blockBtn.style.opacity = '0';
                blockBtn.style.visibility = 'hidden';
            });
        }
    });
}

// Product blocks functionality
function initializeProductBlocks() {
    const products = [
        { name: "Amal's butterfly dress", price: "₨8,000.00", image: "images/traditional-2.jpg", category: "traditional" },
        { name: "Adrona Embellished", price: "₨13,000.00", image: "images/traditional-2.jpg", category: "luxury" },
        { name: "Aizal butterfly dress", price: "₨10,000.00", image: "images/traditional-3.jpg", category: "traditional" },
        { name: "Bridal Elegance", price: "₨25,000.00", image: "images/banner-01.jpg", category: "bridal" },
        { name: "Princess Gown", price: "₨12,000.00", image: "images/banner-03.jpg", category: "girls" },
        { name: "Luxury Silk", price: "₨18,000.00", image: "images/banner-02.jpg", category: "luxury" },
        { name: "Traditional Charm", price: "₨9,500.00", image: "images/traditional-2.jpg", category: "traditional" },
        { name: "Bridal Dream", price: "₨30,000.00", image: "images/banner-01.jpg", category: "bridal" },
        { name: "Little Princess", price: "₨7,500.00", image: "images/banner-03.jpg", category: "girls" },
        { name: "Royal Collection", price: "₨22,000.00", image: "images/banner-02.jpg", category: "luxury" },
        { name: "Heritage Style", price: "₨11,000.00", image: "images/traditional-3.jpg", category: "traditional" },
        { name: "Wedding Belle", price: "₨28,000.00", image: "images/banner-01.jpg", category: "bridal" }
    ];

    const container = document.getElementById('product-list');
    if (container) {
        // Clear existing content
        container.innerHTML = '';
        
        products.forEach((product, index) => {
            const html = `
                <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item product-item" style="display: ${index < 8 ? 'block' : 'none'}" data-category="${product.category}">
                    <div class="block2">
                        <div class="block2-pic hov-img0">
                            <img src="${product.image}" alt="${product.name}">
                            <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1" style="opacity: 0; visibility: hidden;">
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

        // Initialize load more functionality
        initializeLoadMore();
    }
}

// Load more functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let visibleCount = 8;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            const items = document.querySelectorAll('.product-item');
            const next = visibleCount + 8;
            
            for (let i = visibleCount; i < next && i < items.length; i++) {
                items[i].style.display = 'block';
            }
            
            visibleCount = next;
            
            if (visibleCount >= items.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
}

// Category filter functionality
function initializeCategoryFilter() {
    const filterButtons = document.querySelectorAll('.filter-tope-group button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            const items = document.querySelectorAll('.product-item');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('how-active1'));
            // Add active class to clicked button
            this.classList.add('how-active1');
            
            // Filter items
            items.forEach(item => {
                if (filterValue === '*' || item.getAttribute('data-category') === filterValue.replace('.', '')) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Reset load more functionality
            const loadMoreBtn = document.querySelector('.load-more-btn');
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'block';
            }
        });
    });
}

// Wishlist functionality
function initializeWishlistBlocks() {
    document.querySelectorAll('.js-addwish-b2').forEach(wishBtn => {
        wishBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productName = this.closest('.block2').querySelector('.js-name-b2').textContent;
            
            // Add to wishlist (you can implement actual wishlist storage here)
            const wishlist = JSON.parse(localStorage.getItem('cinderella_wishlist') || '[]');
            
            if (!wishlist.includes(productName)) {
                wishlist.push(productName);
                localStorage.setItem('cinderella_wishlist', JSON.stringify(wishlist));
                
                // Visual feedback
                this.classList.add('js-addedwish-b2');
                
                // Show success message
                showWishlistMessage(productName, 'added');
            } else {
                showWishlistMessage(productName, 'already_added');
            }
        });
    });
}

// Show wishlist message
function showWishlistMessage(productName, action) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${action === 'added' ? '#28a745' : '#ffc107'};
        color: ${action === 'added' ? 'white' : '#212529'};
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
        max-width: 300px;
    `;
    
    const message = action === 'added' 
        ? `${productName} added to wishlist!` 
        : `${productName} is already in wishlist!`;
    
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Quick view modal functionality
function initializeQuickView() {
    document.querySelectorAll('.js-show-modal1').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productBlock = this.closest('.block2');
            const productName = productBlock.querySelector('.js-name-b2').textContent;
            const productPrice = productBlock.querySelector('.stext-105').textContent;
            const productImage = productBlock.querySelector('img').src;
            
            // Create or update modal content
            let modal = document.querySelector('.js-modal1');
            if (!modal) {
                createQuickViewModal();
                modal = document.querySelector('.js-modal1');
            }
            
            // Update modal content
            const modalImg = modal.querySelector('.wrap-pic-w img');
            const modalName = modal.querySelector('.js-name-detail');
            const modalPrice = modal.querySelector('.mtext-106');
            
            if (modalImg) modalImg.src = productImage;
            if (modalName) modalName.textContent = productName;
            if (modalPrice) modalPrice.textContent = productPrice;
            
            // Show modal
            modal.classList.add('show-modal1');
        });
    });
}

// Create quick view modal
function createQuickViewModal() {
    const modalHTML = `
        <div class="js-modal1 p-t-66 p-b-20">
            <div class="overlay-modal1 js-hide-modal1"></div>
            <div class="container">
                <div class="bg0 p-t-60 p-b-30 p-lr-15-lg how-pos3-parent">
                    <button class="how-pos3 hov3 trans-04 js-hide-modal1">
                        <img src="images/icons/icon-close.png" alt="CLOSE">
                    </button>
                    <div class="row">
                        <div class="col-md-6 col-lg-7 p-b-30">
                            <div class="p-l-25 p-r-30 p-lr-0-lg">
                                <div class="wrap-slick3 flex-sb flex-w">
                                    <div class="wrap-pic-w pos-relative">
                                        <img src="" alt="IMG-PRODUCT">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-5 p-b-30">
                            <div class="p-r-50 p-t-5 p-lr-0-lg">
                                <h4 class="mtext-105 cl2 js-name-detail p-b-14"></h4>
                                <span class="mtext-106 cl2"></span>
                                <p class="stext-102 cl3 p-t-23">
                                    Beautiful dress from Cinderella.pk collection. Perfect for special occasions.
                                </p>
                                <div class="p-t-33">
                                    <div class="flex-w flex-r-m p-b-10">
                                        <div class="size-204 flex-w flex-m respon6-next">
                                            <button class="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal hide functionality
    document.querySelectorAll('.js-hide-modal1').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.js-modal1').classList.remove('show-modal1');
        });
    });
}

// Initialize all block functionality
function initializeAllBlocks() {
    initializeBlockEffects();
    initializeProductBlocks();
    initializeCategoryFilter();
    initializeWishlistBlocks();
    initializeQuickView();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAllBlocks();
});

// Re-initialize when new content is loaded dynamically
window.reinitializeBlocks = function() {
    initializeAllBlocks();
};

