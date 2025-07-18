// Language and Currency Functionality for Cinderella.pk

// Language translations
const translations = {
    en: { 
        'Home': 'Home', 
        'Bridal Dress': 'Bridal Dress', 
        'Luxury Wear': 'Luxury Wear', 
        'Girls Collection': 'Girls Collection', 
        'Traditional Wear': 'Traditional Wear', 
        'Affiliate': 'Affiliate', 
        'Contact': 'Contact', 
        'Search': 'Search...', 
        'Your Cart': 'Your Cart', 
        'Total': 'Total', 
        'View Cart': 'View Cart', 
        'Check Out': 'Check Out',
        'Free shipping for orders over': 'Free shipping for orders over',
        'Help & FAQs': 'Help & FAQs',
        'My Account': 'My Account',
        'Login / Sign Up': 'Login / Sign Up'
    },
    ar: { 
        'Home': 'الرئيسية', 
        'Bridal Dress': 'فستان العروس', 
        'Luxury Wear': 'ملابس فاخرة', 
        'Girls Collection': 'مجموعة البنات', 
        'Traditional Wear': 'ملابس تقليدية', 
        'Affiliate': 'التابعة', 
        'Contact': 'اتصال', 
        'Search': 'بحث...', 
        'Your Cart': 'عربة التسوق الخاصة بك', 
        'Total': 'المجموع', 
        'View Cart': 'عرض العربة', 
        'Check Out': 'الدفع',
        'Free shipping for orders over': 'شحن مجاني للطلبات التي تزيد عن',
        'Help & FAQs': 'المساعدة والأسئلة الشائعة',
        'My Account': 'حسابي',
        'Login / Sign Up': 'تسجيل الدخول / التسجيل'
    },
    zh: { 
        'Home': '首页', 
        'Bridal Dress': '新娘礼服', 
        'Luxury Wear': '奢华服装', 
        'Girls Collection': '女孩系列', 
        'Traditional Wear': '传统服装', 
        'Affiliate': '加盟', 
        'Contact': '联系', 
        'Search': '搜索...', 
        'Your Cart': '您的购物车', 
        'Total': '总计', 
        'View Cart': '查看购物车', 
        'Check Out': '结账',
        'Free shipping for orders over': '订单满',
        'Help & FAQs': '帮助与常见问题',
        'My Account': '我的账户',
        'Login / Sign Up': '登录 / 注册'
    },
    fr: { 
        'Home': 'Accueil', 
        'Bridal Dress': 'Robe de Mariée', 
        'Luxury Wear': 'Vêtements de Luxe', 
        'Girls Collection': 'Collection Filles', 
        'Traditional Wear': 'Vêtements Traditionnels', 
        'Affiliate': 'Affilié', 
        'Contact': 'Contact', 
        'Search': 'Rechercher...', 
        'Your Cart': 'Votre Panier', 
        'Total': 'Total', 
        'View Cart': 'Voir le Panier', 
        'Check Out': 'Commander',
        'Free shipping for orders over': 'Livraison gratuite pour les commandes de plus de',
        'Help & FAQs': 'Aide et FAQ',
        'My Account': 'Mon Compte',
        'Login / Sign Up': 'Connexion / Inscription'
    },
    ru: { 
        'Home': 'Главная', 
        'Bridal Dress': 'Свадебное платье', 
        'Luxury Wear': 'Элитная одежда', 
        'Girls Collection': 'Коллекция для девочек', 
        'Traditional Wear': 'Традиционная одежда', 
        'Affiliate': 'Партнерская программа', 
        'Contact': 'Контакты', 
        'Search': 'Поиск...', 
        'Your Cart': 'Ваша корзина', 
        'Total': 'Итого', 
        'View Cart': 'Посмотреть корзину', 
        'Check Out': 'Оформить заказ',
        'Free shipping for orders over': 'Бесплатная доставка для заказов свыше',
        'Help & FAQs': 'Помощь и FAQ',
        'My Account': 'Мой аккаунт',
        'Login / Sign Up': 'Вход / Регистрация'
    }
};

// Currency symbols and rates relative to PKR
const currencies = {
    pkr: { symbol: '₨', rate: 1 },
    usd: { symbol: '$', rate: 0.0036 },
    aed: { symbol: 'د.إ', rate: 0.013 }
};

let currentLanguage = 'en';
let currentCurrency = 'pkr';

function changeLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT') {
                element.placeholder = translations[lang][key];
            } else {
                element.innerText = translations[lang][key];
            }
        }
    });
    
    // Update language selectors to show current selection
    document.querySelectorAll('#languageSelect, #languageSelectMobile').forEach(select => {
        select.value = lang;
    });
    
    localStorage.setItem('cinderella_language', lang);
    showLanguageChangeMessage(lang);
}

function changeCurrency(currency) {
    currentCurrency = currency;
    
    // Update all price elements on the page
    document.querySelectorAll('.stext-105').forEach(priceElement => {
        const priceText = priceElement.innerText.trim();
        
        // Extract numeric value from price text (handles $16.64, ₨1500, etc.)
        const numericMatch = priceText.match(/[\d,]+\.?\d*/);
        if (numericMatch) {
            let basePrice = parseFloat(numericMatch[0].replace(/,/g, ''));
            
            // If the current displayed currency is not PKR, convert back to PKR first
            if (priceElement.getAttribute('data-original-currency') && 
                priceElement.getAttribute('data-original-currency') !== 'pkr') {
                const originalCurrency = priceElement.getAttribute('data-original-currency');
                basePrice = basePrice / currencies[originalCurrency].rate;
            } else if (!priceElement.getAttribute('data-base-price-pkr')) {
                // Store the original PKR price if not already stored
                priceElement.setAttribute('data-base-price-pkr', basePrice);
            } else {
                // Use the stored PKR price
                basePrice = parseFloat(priceElement.getAttribute('data-base-price-pkr'));
            }
            
            // Convert to new currency
            const newPrice = basePrice * currencies[currency].rate;
            const formattedPrice = newPrice.toFixed(2);
            
            // Update the price display
            priceElement.innerText = `From ${currencies[currency].symbol}${formattedPrice}`;
            priceElement.setAttribute('data-original-currency', currency);
        }
    });
    
    // Update cart total if present
    document.querySelectorAll('.header-cart-total').forEach(totalElement => {
        const totalText = totalElement.innerText.trim();
        const totalMatch = totalText.match(/[\d,]+\.?\d*/);
        if (totalMatch) {
            let baseTotal = parseFloat(totalMatch[0].replace(/,/g, ''));
            
            // Convert from current currency back to PKR if needed
            if (totalElement.getAttribute('data-original-currency') && 
                totalElement.getAttribute('data-original-currency') !== 'pkr') {
                const originalCurrency = totalElement.getAttribute('data-original-currency');
                baseTotal = baseTotal / currencies[originalCurrency].rate;
            } else if (!totalElement.getAttribute('data-base-total-pkr')) {
                totalElement.setAttribute('data-base-total-pkr', baseTotal);
            } else {
                baseTotal = parseFloat(totalElement.getAttribute('data-base-total-pkr'));
            }
            
            // Convert to new currency
            const newTotal = baseTotal * currencies[currency].rate;
            const formattedTotal = newTotal.toFixed(2);
            
            // Update the total display
            totalElement.innerHTML = `<span data-translate="Total">Total</span>: ${currencies[currency].symbol}${formattedTotal}`;
            totalElement.setAttribute('data-original-currency', currency);
        }
    });
    
    // Update modal prices if present
    document.querySelectorAll('.mtext-106').forEach(modalPriceElement => {
        const priceText = modalPriceElement.innerText.trim();
        const numericMatch = priceText.match(/[\d,]+\.?\d*/);
        if (numericMatch) {
            let basePrice = parseFloat(numericMatch[0].replace(/,/g, ''));
            
            if (modalPriceElement.getAttribute('data-original-currency') && 
                modalPriceElement.getAttribute('data-original-currency') !== 'pkr') {
                const originalCurrency = modalPriceElement.getAttribute('data-original-currency');
                basePrice = basePrice / currencies[originalCurrency].rate;
            } else if (!modalPriceElement.getAttribute('data-base-price-pkr')) {
                modalPriceElement.setAttribute('data-base-price-pkr', basePrice);
            } else {
                basePrice = parseFloat(modalPriceElement.getAttribute('data-base-price-pkr'));
            }
            
            const newPrice = basePrice * currencies[currency].rate;
            const formattedPrice = newPrice.toFixed(2);
            
            modalPriceElement.innerText = `${currencies[currency].symbol}${formattedPrice}`;
            modalPriceElement.setAttribute('data-original-currency', currency);
        }
    });
    
    // Update currency selectors to show current selection
    document.querySelectorAll('#currencySelect, #currencySelectMobile').forEach(select => {
        select.value = currency;
    });
    
    localStorage.setItem('cinderella_currency', currency);
    showCurrencyChangeMessage(currency);
}

function showCurrencyChangeMessage(currency) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
    `;
    notification.innerText = `Currency changed to ${currency.toUpperCase()}`;
    
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

function showLanguageChangeMessage(lang) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: opacity 0.3s ease;
    `;
    notification.innerText = `Language changed to ${lang.toUpperCase()}`;
    
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

function initializePrices() {
    // Store original PKR prices on page load
    document.querySelectorAll('.stext-105').forEach(priceElement => {
        const priceText = priceElement.innerText.trim();
        const numericMatch = priceText.match(/[\d,]+\.?\d*/);
        if (numericMatch && !priceElement.getAttribute('data-base-price-pkr')) {
            const basePrice = parseFloat(numericMatch[0].replace(/,/g, ''));
            priceElement.setAttribute('data-base-price-pkr', basePrice);
            priceElement.setAttribute('data-original-currency', 'pkr');
        }
    });
    
    document.querySelectorAll('.header-cart-total').forEach(totalElement => {
        const totalText = totalElement.innerText.trim();
        const totalMatch = totalText.match(/[\d,]+\.?\d*/);
        if (totalMatch && !totalElement.getAttribute('data-base-total-pkr')) {
            const baseTotal = parseFloat(totalMatch[0].replace(/,/g, ''));
            totalElement.setAttribute('data-base-total-pkr', baseTotal);
            totalElement.setAttribute('data-original-currency', 'pkr');
        }
    });
    
    document.querySelectorAll('.mtext-106').forEach(modalPriceElement => {
        const priceText = modalPriceElement.innerText.trim();
        const numericMatch = priceText.match(/[\d,]+\.?\d*/);
        if (numericMatch && !modalPriceElement.getAttribute('data-base-price-pkr')) {
            const basePrice = parseFloat(numericMatch[0].replace(/,/g, ''));
            modalPriceElement.setAttribute('data-base-price-pkr', basePrice);
            modalPriceElement.setAttribute('data-original-currency', 'pkr');
        }
    });
}

// Initialize dropdown functionality for desktop
function initializeDesktopDropdowns() {
    // Language dropdown functionality
    document.querySelectorAll('.language-panel a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const langText = this.innerText.trim();
            let langCode = 'en';
            
            switch(langText) {
                case 'English': langCode = 'en'; break;
                case 'العربية': langCode = 'ar'; break;
                case '中国人': langCode = 'zh'; break;
                case 'français': langCode = 'fr'; break;
                case 'русский язык': langCode = 'ru'; break;
            }
            
            changeLanguage(langCode);
        });
    });
    
    // Currency dropdown functionality
    document.querySelectorAll('.currency-panel a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const currencyCode = this.innerText.trim().toLowerCase();
            changeCurrency(currencyCode);
        });
    });
    
    // Dropdown toggle functionality
    document.querySelectorAll('.trigger-with-icon').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const panel = this.nextElementSibling;
            if (panel && panel.classList.contains('expand-panel')) {
                panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
}

// Initialize mobile dropdown functionality
function initializeMobileDropdowns() {
    // Mobile account toggle
    document.querySelectorAll('.js-toggle-account-mobile').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const accountMenu = document.querySelector('.js-submenu-mobile-account');
            if (accountMenu) {
                accountMenu.style.display = accountMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Mobile language toggle
    document.querySelectorAll('.js-toggle-language').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = document.querySelector('.js-submenu-language');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Mobile currency toggle
    document.querySelectorAll('.js-toggle-currency').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const submenu = document.querySelector('.js-submenu-currency');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Mobile language selection
    document.querySelectorAll('.js-submenu-language a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const langText = this.innerText.trim();
            let langCode = 'en';
            
            switch(langText) {
                case 'English': langCode = 'en'; break;
                case 'العربية': langCode = 'ar'; break;
                case '中国人': langCode = 'zh'; break;
                case 'français': langCode = 'fr'; break;
                case 'русский язык': langCode = 'ru'; break;
            }
            
            changeLanguage(langCode);
            
            // Hide the submenu after selection
            const submenu = document.querySelector('.js-submenu-language');
            if (submenu) {
                submenu.style.display = 'none';
            }
        });
    });
    
    // Mobile currency selection
    document.querySelectorAll('.js-submenu-currency a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const currencyCode = this.innerText.trim().toLowerCase();
            changeCurrency(currencyCode);
            
            // Hide the submenu after selection
            const submenu = document.querySelector('.js-submenu-currency');
            if (submenu) {
                submenu.style.display = 'none';
            }
        });
    });
}

// Initialize header template selectors
function initializeHeaderTemplateSelectors() {
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    const languageSelectMobile = document.getElementById('languageSelectMobile');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    if (languageSelectMobile) {
        languageSelectMobile.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Currency selector
    const currencySelect = document.getElementById('currencySelect');
    const currencySelectMobile = document.getElementById('currencySelectMobile');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            changeCurrency(this.value);
        });
    }
    
    if (currencySelectMobile) {
        currencySelectMobile.addEventListener('change', function() {
            changeCurrency(this.value);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize prices with PKR as base
    initializePrices();
    
    // Initialize all dropdown functionalities
    initializeDesktopDropdowns();
    initializeMobileDropdowns();
    initializeHeaderTemplateSelectors();
    
    // Load saved preferences
    const savedLanguage = localStorage.getItem('cinderella_language');
    if (savedLanguage && translations[savedLanguage]) {
        changeLanguage(savedLanguage);
    }

    const savedCurrency = localStorage.getItem('cinderella_currency');
    if (savedCurrency && currencies[savedCurrency]) {
        changeCurrency(savedCurrency);
    }
});

