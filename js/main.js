function portfolioTabsInit() {
    let tabLinks = document.querySelectorAll(".b-categories-container__item");
    let tabContent = document.querySelectorAll(".b-projects-wrapper__projects-container");

    tabLinks.forEach(function (el) {
        el.addEventListener("click", openTabs);
    });

    function openTabs() {
        tabContent.forEach(function (el) {
            if (el.classList.contains("active")) {
                el.classList.remove("active");
            }
            else {
                el.classList.add("active");
            }
        });

        tabLinks.forEach(function (el) {
            if (el.classList.contains("active")) {
                el.classList.remove("active");
            }
            else {
                el.classList.add("active");
            }
        });
    }
}

function mobileMenuInit() {
    let toggleBtn = document.querySelector(".b-header-wrapper__icon_mobile-menu");
    let menuWrapper = document.querySelector(".b-main-container__nav-wrapper");
    let menuLinks = document.querySelectorAll(".b-nav-menu-item__link");

    toggleBtn.addEventListener("click", toggleMenu);

    menuLinks.forEach(function (el) {
        el.addEventListener("click", closeMenuOnLinkClick);
    });

    function toggleMenu(e) {
        if (menuWrapper.classList.contains("active")) {
            e.target.innerHTML = "menu";
            menuWrapper.classList.remove("active");

        }
        else {
            e.target.innerHTML = "close";
            menuWrapper.classList.add("active");
        }
        
    }

    function closeMenuOnLinkClick() {
        toggleBtn.innerHTML = "menu";
        menuWrapper.classList.remove("active");
    }
}

portfolioTabsInit();
mobileMenuInit();