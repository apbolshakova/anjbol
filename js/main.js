function portfolioTabsInit() {
    var tabLinks = document.querySelectorAll(".b-categories-container__item");
    var tabContent = document.querySelectorAll(".b-projects-wrapper__projects-container");

    tabLinks.forEach(function (el) {
        el.addEventListener("click", openTabs);
    });


    function openTabs(el) {
        var btnTarget = el.currentTarget;

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

portfolioTabsInit();