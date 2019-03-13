pangu.spacingPage();
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-123575709-1');


var last_known_scroll_position = 0,
    ticking = false,
    currentTitle = document.getElementById("main-title").textContent;

function doSomething(scroll_pos) {
    let headerTitleHeight = document.getElementById("head").offsetHeight / 2,
        nav = document.getElementById("main-nav"),
        postTitle = document.getElementById("post-title").textContent,
        navTitle = document.getElementById("main-title");
    if (scroll_pos > headerTitleHeight) {
        navTitle.innerText = postTitle;
        nav.setAttribute("style", "background: #448AFF;");
    } else {
        navTitle.innerText = currentTitle;
        nav.setAttribute("style", "background: transparent;");
    }
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });
    }
    ticking = true;
});