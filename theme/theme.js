/**
 * Web-presenter example theme design
 * @author Beau Harrison <beauharrison@gmail.com>
 */

document.addEventListener('DOMContentLoaded', buildElements);

function buildElements() {
    const header = buildHeader();
    const footer = buildFooter();

    let slides = document.querySelectorAll('.slide');
    if (!slides.length) { // .slides don't exist
        buildSlides();
        slides = document.querySelectorAll('.slide');
        exampleFiller();
    }

    slides[0].insertBefore(header, slides[0].firstChild);
    document.querySelector('body').appendChild(footer);

    fillMetadata();

    document.addEventListener('slideChange', showFooter);
}

function buildHeader() {
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

    return header;
}

function buildFooter() {
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

    return footer;
}

function buildSlides() {
    const bodySlide = document.createElement('div');
    bodySlide.classList = 'slide hidden';

    const titleSlide = bodySlide.cloneNode(true);
    titleSlide.classList.remove('hidden');

    const body = document.querySelector('body');
    body.insertBefore(bodySlide, body.firstChild);
    body.insertBefore(titleSlide, body.firstChild);
}

function exampleFiller() {
    const title = document.querySelector('meta[name="title"]') ? document.querySelector('meta[name="title"]').content : '';
    const author = document.querySelector('meta[name="author"]') ? document.querySelector('meta[name="author"]').content : '';
    const meeting = document.querySelector('meta[name="meeting"]') ? document.querySelector('meta[name="meeting"]').content : '';
    const titleBody = document.createElement('div');
    titleBody.classList = 'content';
    titleBody.innerHTML = `<div class="title">
        ${title}
    </div>
    <div class="author">
        ${author}
    </div>
    <div class="meeting">
        ${meeting}
    </div>
    <div class="date">
        ${currentDateString()}
    </div>`;
    document.querySelectorAll('.slide')[0].appendChild(titleBody);
}

function fillMetadata() {
    // Retrieve metadata
    let author = document.querySelector('meta[name="author"]');
    if (author) author = author.content;
    const title = document.querySelector('meta[name="title"]').content || '';
    const meeting = document.querySelector('meta[name="meeting"]').content || '';
    const date = currentDateString();
    const humanDate = currentDateString('human');
    // Hide footer. Starts on title slide
    document.querySelector('footer').classList.add('hidden');
    // Add metadata to footer
    document.querySelector('footer .date').textContent = date;
    document.querySelector('footer .authorTitle').textContent = `${author} | ${title}`;
    // Add metadata to title slide
    const firstSlide = document.querySelector('.slide');
    const firstSlideTitle = firstSlide.querySelector('.title');
    const firstSlideAuthor = firstSlide.querySelector('.author');
    const firstSlideMeeting = firstSlide.querySelector('.meeting');
    const firstSlideDate = firstSlide.querySelector('.date');
    if (firstSlideTitle) firstSlideTitle.textContent = title;
    if (firstSlideAuthor) firstSlideAuthor.textContent = author;
    if (firstSlideMeeting) firstSlideMeeting.textContent = meeting;
    if (firstSlideDate) firstSlideDate.textContent = humanDate;
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

function currentDateString(dateType) {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const now = new Date();
    const day = days[ now.getDay() ];
    const month = months[ now.getMonth() ];

    if (dateType === 'human') {
        return `${day} ${month} ${now.getDate()}, ${now.getFullYear()}`;
    } else {
        return `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear().toString().substr(2,2)}`;
    }
}
