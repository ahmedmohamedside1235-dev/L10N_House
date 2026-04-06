// * Get data from API
async function getData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

// * update Active Link
function updateActive(that) {
    $("nav .nav-link.active").removeClass("active");
    $(that).addClass("active");
}

// * update Local Storage
function updateLocalStorage() {
    localStorage.setItem("linkId", linkId);
}

// * prepare description to add colors to the name of the company in the description
function prepareDescription(description) {
    return description.replace(/L10N House/gmi, `<span class="fw-medium"><span class="firstColor">L10N</span> <span class="secondColor">House</span></span>`);
}

// * Show data of services in the section of services
function showDataServices(servicesData) {
    servicesData.forEach((serviceData, index) => {
        servicesContent.append(
            `
            <div class="col-md-6 mb-4 wow ${((index + 1) % 2 == 0 ? "animate__backInRight" : "animate__backInLeft")}" data-wow-duration="1s" data-wow-delay="${(index + 1) * 0.2}s">
                <div class="item text-center">
                    <img src="images/${serviceData.icon}" alt="">
                        <h5 class="my-3">${serviceData.title}</h5>
                        <p>${prepareDescription(serviceData.description.substring(0, 152))}... <span onclick="showServicesDataPopup(${index})" class="firstColor fw-bold read">Read More</span>
                        </p>
                </div>
            </div>
        `);
    });
}

// * Open popup and show data
function openPopup(popupName, bool = false) {
    let $popupEle = $(`.popup[data-popup-name="${popupName}"]`),
        $body = $("body");

    $popupEle.fadeIn(1000);
    if (bool) {
        $popupEle.css("display", "flex");
    }

    if (popupName == "language") {
        setTimeout(() => {
            $(".popup[data-popup-name='language'] .box").css("transform", "translateX(0)");
        }, 1000);
    }

    $body.addClass("overflow-hidden");
}

// * Close popup
function closePopup() {
    let $body = $("body");
    $(".popup").fadeOut(1000);
    setTimeout(() => {
        $body.removeClass("overflow-hidden");
    }, 500);
}

// * close pupup Language
function closePopupLang() {
    $(".popup[data-popup-name='language'] .box").css("transform", "translateX(100%)");
    $(".popup[data-popup-name='language']").fadeOut(1000);
    setTimeout(() => {
        $("body").removeClass("overflow-hidden");
    }, 800);
}

// * Show sections of services in the popup
function showSectionService(sections) {
    let sectionHtml = "";
    sections.forEach((section, index) => {
        sectionHtml += `
            <div class="section ${(index != 0 ? "mt-4" : "")}">
                <h5>${section.title}</h5>
                <ol>
                    ${showPointsOfServices(section.points)}
                </ol>
            </div>
        `
    });
    return sectionHtml;
}

// * Show points of services in the popup
function showPointsOfServices(points) {
    let pointsHtml = "";
    points.forEach(point => {
        pointsHtml += `
            <li>${point}</li>
        `
    });
    return pointsHtml;
}

// * Show data of services in the popup
function showServicesDataPopup(servicesIndex) {
    let $popupBody = $(".popup[data-popup-name='services'] .box .body"),
        serviceData = servicesData[servicesIndex];
    $popupBody.html("");
    $popupBody.append(`
        <h4 class="secondColor text-center mb-3 mb-lg-5">${serviceData.title}</h4>
        <div class="content">
            <div class="row mb-4">
                <div class="col-lg-6">
                    <div class="item">
                        <p>
                            ${prepareDescription(serviceData.description)}
                        </p>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="item">
                        <img src="images/${serviceData.img}" class="img-fluid rounded-4" alt="">
                    </div>
                </div>
            </div>
            ${showSectionService(serviceData.sections)}
        </div>
    `);
    openPopup('services');
}

// * show data sector in popup
function showDataSectorsInPopup() {
    sectorData.forEach((sector) => {
        sectorContent.append(`
            <div class="col-12 col-sm-6 col-lg-3 mb-4">
                <div class="item">
                    <img src="images/sec/${sector.icon}" class="mb-3" alt="">
                    <p>${sector.name}</p>
                </div>
            </div>
        `)
    });
    openPopup('sector');
}

// * show li Language
function showLiLanguagesInPopup(arrayLang) { 
    let langLi = "";
    arrayLang.forEach(lang => {
        langLi += `<li><i class="far fa-dot-circle"></i> ${lang} </li>`;
    });
    return langLi;
}

// * show data Language in popup
function showDataLanguagesInPopup() {
    languageContent.html("");
    languageData.forEach((language) => {
        languageContent.append(`
            <div class="col-12 mb-3 special">
                <div class="item">
                    <h4>${language.continent}</h4>
                    <ul class="lang list-unstyled">
                        ${showLiLanguagesInPopup(language.languages)}
                    </ul>
                </div>
            </div>
        `);
    });
    openPopup('language');
}

// * Reset To Top
function goToTop() {
    $window.scrollTop(0);
}