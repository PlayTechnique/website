document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function () {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
});

function addCodeHighlightingToHeader(callback) {
    document.getElementById("playtechnique-header").innerHTML = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"/>`;

    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    script.onload = function () {
        if (callback) callback(); // Call callback function when script is loaded
    };
    document.body.appendChild(script);
}

// Function to render the new navigation
function renderNavigation() {
    const navHTML = `
        <nav class="navigation">
            <a href="/"><img src="images/logo.png" alt="Logo"></a>
            <div id="links-group">
                <a href="/blog/index.html" class="link">blog</a>
                <a href="/projects/index.html" class="link">projects</a>
                <a href="/social/index.html" class="link">social links</a>
                <a href="/rss.xml" class="link"><img src="images/rss.png" alt="RSS"></a>
            </div>
        </nav>
    `;

    // Inject the navHTML into the new container with an ID 'playtechnique-nav'
    const navElement = document.getElementById('playtechnique-nav');
    if (navElement) {
        navElement.innerHTML = navHTML;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    addGoogleTagToHead();
});

document.addEventListener('DOMContentLoaded', function () {
    addGoogleTagToHead();
});

function addGoogleTagToHead() {
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {

        // Create the script tag for gtag.js
        var gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-B7K8ZDE6MK';

        // Append the gtag.js script to the <head>
        document.head.appendChild(gtagScript);

        // Inline script to initialize gtag
        var inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-B7K8ZDE6MK');
    `;

        // Append the inline script after the gtag.js script
        document.head.appendChild(inlineScript);
    } else {
        console.log('Google Analytics is not loaded in local environment.');
    }
}