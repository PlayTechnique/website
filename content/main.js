document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function () {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
    addMermaid();
});

function addCodeHighlightingToHeader(callback) {
    // Add the CSS file to the <head>
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css';
    document.head.appendChild(link); // Append the stylesheet to the <head>

    // Add the JavaScript file to the <body>
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
    script.defer = true
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
    const octoDiv = document.getElementById("emailOctopusDocumentationLink")
    if (!octoDiv) return;
    const script = document.createElement("script");
script.src = "https://eomail5.com/form/68ad9912-4952-11f1-9ee0-035341c752a0.js";
script.async = true;
script.setAttribute("data-form", '68ad9912-4952-11f1-9ee0-035341c752a0');
    octoDiv.append(script)

}

document.addEventListener('DOMContentLoaded', function () {
    addAnalytics();
    emailOctopusDocumentationLink();
});
