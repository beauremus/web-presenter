/**
 * Web-presenter example theme design
 * @author Beau Harrison <beauharrison@gmail.com>
 */

document.addEventListener('DOMContentLoaded', buildElements);

function buildElements() {
    const header = document.createElement('header');
    header.innerHTML =
    `<div class="headerBar">
        <div id="headerBar"></div>
        <div class="imgContainer">
            <img src="../theme/assets/FNAL-Logo-White.png">
        </div>
        <div class="imgContainer">
            <img src="../theme/assets/DOE_OSC_White.png">
        </div>
    </div>
    <div id="titleImage">
        <img src="../theme/assets/FNAL-Scene-Header.png" class="fullWidth">
    </div>`;

    if (!document.querySelector('.slide')) {
        buildExample();
    }

    const footer = document.createElement('footer');
    footer.innerHTML =
    `<div class="fnal">
        <div id="bottomBar"></div>
        <div class="wrap">
            <img src="../theme/assets/FNAL-Logo-NAL-Blue.png" class="fullWidth">
        </div>
    </div>
    <div class="footerInfo">
        <span class="page">0</span>
        <span class="date">1/1/00</span>
        <span class="authorTitle">Presenter | Presentation Title or Meeting Title</span>
    </div>`;

    const slides = document.querySelector('.slide');
    slides.insertBefore(header, slides.firstChild);
    document.querySelector('body').appendChild(footer);
    init();
    document.addEventListener('slideChange', showFooter);
}

function init() {
    document.querySelector('footer').classList.add('hidden');
    document.querySelector('footer .date').textContent = currentDateString();
    document.querySelector('footer .authorTitle').textContent = `${document.querySelector('meta[name="author"]').content} | ${document.querySelector('meta[name="title"]').content}`;
}

function buildExample() {
    console.log('buildExample');
}

function showFooter(e) {
    const slides = document.querySelectorAll('.slide');
    const footer = document.querySelector('footer');

    document.querySelector('footer .page').textContent = e.detail.current+1;

    if ([...slides[0].classList].includes('hidden')) {
        footer.classList.remove('hidden');
    } else {
        footer.classList.add('hidden');
    }
}

function currentDateString() {
    const date = new Date();
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear().toString().substr(2,2)}`
}
