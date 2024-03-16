document.addEventListener('DOMContentLoaded', function () {
    addCodeHighlightingToHeader(function() {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
});

function addCodeHighlightingToHeader(callback) {
    document.getElementById("header").innerHTML = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"/>`;

    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    script.onload = function() {
        if (callback) callback(); // Call callback function when script is loaded
    };
    document.body.appendChild(script);
}




