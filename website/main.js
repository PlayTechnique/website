document.addEventListener('DOMContentLoaded', function () {
    header(function() {
        // Call hljs.highlightAll(); after highlight.js has loaded
        hljs.highlightAll();
    });
});

function header(callback) {
    var isNotFrontPage = window.location.pathname !== "/"; // Check if the current page is not the front page
    document.getElementById("header").innerHTML = `
        <nav class="navigation">` +
            (isNotFrontPage ? `<a href="/" class="link">front page</a> ` : "") + // Conditionally include front page link
            `<a href="/articles/index.html" class="link">articles</a>
            <a href="/projects/index.html" class="link">projects</a>
        </nav>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"/>`;

    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js";
    script.onload = function() {
        if (callback) callback(); // Call callback function when script is loaded
    };
    document.body.appendChild(script);
}




