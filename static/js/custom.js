pangu.spacingPage();
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-123575709-1');

// 动态标题

var last_known_scroll_position = 0,
    ticking = false,
    currentTitle = document.getElementById("main-title").textContent;

function doSomething(scroll_pos) {
    let headerTitleHeight = document.getElementById("head").offsetHeight,
        postTitle = document.getElementById("post-title").textContent,
        navTitle = document.getElementById("main-title");
    // do something with the scroll position
    if (scroll_pos > headerTitleHeight) {
        navTitle.innerText = postTitle;
    } else {
        navTitle.innerText = currentTitle;
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