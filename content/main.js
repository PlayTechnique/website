document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function() {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
});

function addCodeHighlightingToHeader(callback) {
    document.getElementById("playtechnique-header").innerHTML = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"/>`;

    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    script.onload = function() {
        if (callback) callback(); // Call callback function when script is loaded
    };
    document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function () {
    addGoogleTagToHead();
});

document.addEventListener('DOMContentLoaded', function () {
    addGoogleTagToHead();
});

function addGoogleTagToHead() {
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
}