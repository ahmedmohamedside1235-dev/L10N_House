new WOW({
    animateClass: 'animate__animated'
}).init();

let $window = $(window),
    servicesData = null,
    servicesContent = $("#Services .container .row"),
    sectorData = null,
    sectorContent = $(".popup[data-popup-name*='sector'] .row"),
    languageData = null,
    languageContent = $(".popup[data-popup-name*='language'] .row"),
    sections = $("section,header"),
    navLinks = $("nav .nav-link"),
    linkId = "Home",
    loadpadge = $(".loadingPadge");

(function () {
    if (localStorage.getItem("linkId") == null) {
        localStorage.setItem("linkId", "Home");
    } else {
        linkId = localStorage.getItem("linkId");
    }
})();

// * Get data from API and show it
(async function () {
    servicesData = await getData("https://semicode.tech/api/v1/l10nhouse/services");
    showDataServices(servicesData);
    sectorData = await getData("https://semicode.tech/api/v1/l10nhouse/sectors");
    languageData = await getData("https://semicode.tech/api/v1/l10nhouse/languages");
})();

// * Change the width of the image navbar 
$window.scroll(function () {
    let nav = $("nav"),
        heightNav = nav.outerHeight(true),
        imageHead = $("nav .navbar-brand"),
        scrollWindow = $window.scrollTop();

    // * add classes for nav and logo
    if ($window.scrollTop() >= 15) {
        nav.addClass("scroll");
        imageHead.addClass("scroll");
    } else {
        nav.removeClass("scroll");
        imageHead.removeClass("scroll");
    }

    // * update Active Link in Navigation bar
    sections.each(function (index, section) {
        let heightSection = $(section).offset().top,
            sectionId = section.id;

        if (scrollWindow >= (heightSection - (heightNav))) {
            let anchor = $(`nav .nav-link[href='#${sectionId}']`);
            updateActive(anchor);
            linkId = sectionId;
            updateLocalStorage();
        }
    });

    //* add class for top button
    if (scrollWindow > 500) {
        $("#Top").addClass("active");
    } else {
        $("#Top").removeClass("active");
    }

});

$(window).on("load", function () {
    let navLink = $(`nav .nav-link[href='#${linkId}']`);
    updateActive(navLink);

    // * add classes for nav and logo
    if ($window.scrollTop() >= 15) {
        if (!($("nav").hasClass("scroll"))) {
            $("nav").addClass("scroll");
        }

        if (!($("nav .navbar-brand").hasClass("scroll"))) {
            $("nav .navbar-brand").addClass("scroll");
        }
    }

    //* hide loading padge after window loaded 
    setTimeout(() => {
        loadpadge.addClass("hide");
        $("body").removeClass("overflow-hidden");
    }, 500);

});

navLinks.click(function (e) {
    e.preventDefault();
    let sectionId = $(this).attr("href"),
        $sectionEle = $(sectionId),
        sectionTop = $sectionEle.offset().top,
        heightNav = $("nav").outerHeight(true);
    $window.scrollTop(sectionTop - (heightNav - 29));
});

// * Close popup when click on the popup background
$(".popup.act").click(function (e) {
    closePopup();
});

// * close popup Language
$(".popup.lang").click(function (e) {
    closePopupLang();
});

$(".popup .box").click(function (e) {
    e.stopPropagation();
});