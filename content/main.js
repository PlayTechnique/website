document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function () {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
});

document.addEventListener('DOMContentLoaded', renderNavigation);

function addCodeHighlightingToHeader(callback) {
    // Add the CSS file to the <head>
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css';
    document.head.appendChild(link); // Append the stylesheet to the <head>

    // Add the JavaScript file to the <body>
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    script.onload = function () {
        if (callback) callback(); // Call callback function when script is loaded
    };
    document.body.appendChild(script); // Append the script to the <body>
}


function renderNavigation() {
    // Common base navigation structure
    let navHTML = `
        <nav class="navigation">
            <div id="header" style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <a href="/"><img src="/images/dolphint.png" alt="Logo"></a>
                <header class="playtechnique" style="text-align: center; flex-grow: 1; color: #9ba7d9;">
                    <a href="/" style="font-size: 1.5em;"><span class="big-bold">play</span>technique</a>
                    <p>Friendly DevOps and Software Development Consultancy.</p>
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
                    <a href="/contact/index.html" class="link">contact me</a>
                    <a href="/rss.xml" class="link"><img src="/images/rss.png" alt="RSS"></a>
                </div>
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
        // Create the script tag for analytics
        var analyticsScript = document.createElement('script');
        analyticsScript.async = true;
        analyticsScript.src = 'https://scripts.simpleanalyticscdn.com/latest.js';

        // Append the analytics.js script to the <head>
        document.body.appendChild(analyticsScript);
    } else {
        console.log('Tiny Analytics is not loaded in local environment.');
    }
}