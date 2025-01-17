document.addEventListener('DOMContentLoaded', () => {
    // مدیریت سبد خرید
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // انیمیشن اضافه شدن به سبد
            button.innerHTML = '✓ اضافه شد';
            button.style.background = '#22c55e';
            
            setTimeout(() => {
                button.innerHTML = 'افزودن به سبد خرید';
                button.style.background = '';
            }, 2000);
        });
    });

    // منوی کشویی دسته‌بندی‌ها
    const submenuParent = document.querySelector('.has-submenu');
    
    submenuParent?.addEventListener('mouseenter', () => {
        const submenu = submenuParent.querySelector('.submenu');
        submenu.style.display = 'block';
        submenu.style.opacity = '1';
    });

    submenuParent?.addEventListener('mouseleave', () => {
        const submenu = submenuParent.querySelector('.submenu');
        submenu.style.opacity = '0';
        setTimeout(() => {
            submenu.style.display = 'none';
        }, 200);
    });

    // بهبود عملکرد منوی کشویی
    const megamenuParents = document.querySelectorAll('.megamenu-parent');
    
    megamenuParents.forEach(parent => {
        const megamenu = parent.querySelector('.megamenu');
        let isHovered = false;
        let timeoutId = null;

        const showMenu = () => {
            clearTimeout(timeoutId);
            megamenu.style.opacity = '1';
            megamenu.style.visibility = 'visible';
            isHovered = true;
        };

        const hideMenu = () => {
            timeoutId = setTimeout(() => {
                if (!isHovered) {
                    megamenu.style.opacity = '0';
                    megamenu.style.visibility = 'hidden';
                }
            }, 100);
        };

        // رویدادهای مربوط به منوی اصلی
        parent.addEventListener('mouseenter', () => {
            isHovered = true;
            showMenu();
        });

        parent.addEventListener('mouseleave', (e) => {
            isHovered = false;
            // بررسی اینکه آیا ماوس به سمت مگامنو حرکت می‌کند
            const megamenuRect = megamenu.getBoundingClientRect();
            if (e.clientY > megamenuRect.top || 
                (e.clientY > parent.getBoundingClientRect().bottom && 
                 e.clientX >= megamenuRect.left && 
                 e.clientX <= megamenuRect.right)) {
                return;
            }
            hideMenu();
        });

        // رویدادهای مربوط به مگامنو
        megamenu.addEventListener('mouseenter', () => {
            isHovered = true;
            showMenu();
        });

        megamenu.addEventListener('mouseleave', (e) => {
            isHovered = false;
            // بررسی اینکه آیا ماوس به سمت منوی اصلی حرکت می‌کند
            const parentRect = parent.getBoundingClientRect();
            if (e.clientY <= parentRect.bottom && 
                e.clientX >= parentRect.left && 
                e.clientX <= parentRect.right) {
                return;
            }
            hideMenu();
        });

        // حذف تایمر هنگام کلیک روی مگامنو
        megamenu.addEventListener('click', (e) => {
            e.stopPropagation();
            clearTimeout(timeoutId);
        });
    });

    // بهبود عملکرد در موبایل
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.megamenu-parent > a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const megamenu = link.nextElementSibling;
                megamenu.style.visibility = 
                    megamenu.style.visibility === 'visible' ? 'hidden' : 'visible';
                megamenu.style.opacity = 
                    megamenu.style.opacity === '1' ? '0' : '1';
            });
        });
    }

    // افکت اسکرول نرم برای لینک‌ها
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // نمایش/مخفی کردن هدر هنگام اسکرول
    let lastScroll = 0;
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // عملکرد سوالات متداول
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', () => {
            // بستن سایر آیتم‌های باز
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تغییر وضعیت آیتم فعلی
            item.classList.toggle('active');
        });
    });
});
