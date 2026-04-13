document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function () {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
    addMermaid();
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

function addMermaid() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    script.onload = function () {
        mermaid.initialize({flowchart:
            {
                wrappingWidth: 290
            }});
        mermaid.run();
    };
    document.body.appendChild(script);
}

function renderNavigation() {
    // Common base navigation structure
    let navHTML = `
        <nav class="navigation">
            <a href="/" class="brand-link">
                <img src="/images/dolphint.png" alt="Logo">
                <span class="brand-name"><span class="big-bold">play</span>technique</span>
                <span class="tagline">Professional DevOps Consultancy</span>
            </a>
            <div id="links-group">
    `;

    // Add the closing part of the navigation
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/index.html';
    if (!isHomePage) {
        navHTML += `<a href="/" class="button">Home</a>`;
    }
    navHTML += `
                <a href="/contact/index.html" class="button">Book 30 Minutes</a>
                <a href="/blog/index.html" class="button">Tech Blog</a>
                <a href="/public-speaking/index.html" class="button">Public Speaking</a>
    `;

    navHTML += `
            </div>
        </nav>
        <section id="preamble">Reliability is built by habits, not hope.</section>
    `;

    // Inject the navHTML into the container
    const navElement = document.getElementById('playtechnique-nav-bar');
    if (navElement) {
        navElement.innerHTML = navHTML;
    } else {
        console.error("Element with ID 'playtechnique-nav-bar' not found");
    }
}



function addAnalytics() {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        // Create the script tag for analytics
        var analyticsScript = document.createElement('script');
        analyticsScript.async = true;
        analyticsScript.src = 'https://scripts.simpleanalyticscdn.com/latest.js';
        
        // Append the analytics.js script to the <head>
        document.body.appendChild(analyticsScript);
    } else {
        console.log('Analytics is not loaded in local environment.');
    }
}

function emailOctopusDocumentationLink() {
    emaildiv = `
    <p>I wrote a free e-book about changing your team's documentation culture from the inside. This embodies my approach of building the habits that make systems work.</p>
    `
    const octoDiv = document.getElementById("emailOctopusDocumentationLink")
    octoDiv.innerHTML = emaildiv
    const script = document.createElement("script");
script.src = "https://eocampaign1.com/form/a99baade-33f7-11f0-8426-91cf9687b89a.js";
script.async = true;
script.setAttribute("data-form", "a99baade-33f7-11f0-8426-91cf9687b89a");
    octoDiv.append(script)

}


document.addEventListener('DOMContentLoaded', function () {
    addAnalytics();
    emailOctopusDocumentationLink();
});
