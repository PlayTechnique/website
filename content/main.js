document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function () {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
});

document.addEventListener('DOMContentLoaded', renderNavigation);

function addCodeHighlightingToHeader(callback) {
    document.getElementById("playtechnique-header").innerHTML = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"/>`;

    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    script.onload = function () {
        if (callback) callback(); // Call callback function when script is loaded
    };
    document.body.appendChild(script);
}

function renderNavigation() {
    // Common base navigation structure
    let navHTML = `
        <nav class="navigation">
            <a href="/"><img src="/images/dolphint.png" alt="Logo"></a>
            <header class="playtechnique">
                <a href="/"><span class="big-bold">play</span>technique</a>
            </header>
            <div id="links-group">
    `;

    // Check if we're not on the front page
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        // Add sub-page-specific link
        navHTML += `
                <a href="/" class="link">front page</a>
        `;
    }

    // Add the closing part of the navigation
    navHTML += `
                
                <a href="/blog/index.html" class="link">blog</a>
                <a href="/projects/index.html" class="link">projects</a>
                <a href="/social/index.html" class="link">social links</a>
                <a href="/rss.xml" class="link"><img src="/images/rss.png" alt="RSS"></a>
            </div>
        </nav>
    `;

    // Inject the navHTML into the container
    const navElement = document.getElementById('playtechnique-nav-bar');
    if (navElement) {
        navElement.innerHTML = navHTML;
    } else {
        console.error("Element with ID 'playtechnique-nav-bar' not found");
    }
}



document.addEventListener('DOMContentLoaded', function () {
    addTinyAnalytics();
});

function addTinyAnalytics() {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Create the script tag for gtag.js
        var gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://tinylytics.app/embed/FqCn55_LssFjprzeatQ1.js';

        // Append the gtag.js script to the <head>
        document.body.appendChild(gtagScript);
    } else {
        console.log('Tiny Analytics is not loaded in local environment.');
    }
}