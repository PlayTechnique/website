sprint:
    #!/bin/bash
    lsof -ti:8081 | xargs kill 2>/dev/null

    DEBUG=true go run -C /Users/gwyn/Developer/andrew ./cmd/andrew --rssdir /Users/gwyn/Developer/playtechnique/website/content/blog /Users/gwyn/Developer/playtechnique/website/content localhost:8081 http://localhost:8081
run:
    #!/bin/bash
    lsof -ti:8081 | xargs kill 2>/dev/null

    DEBUG=true go run github.com/playtechnique/andrew/cmd/andrew@v0.3.13 --rssdir /Users/gwyn/Developer/playtechnique/website/content/blog /Users/gwyn/Developer/playtechnique/website/content localhost:8081 http://localhost:8081

# Bucket a day's website requests by User-Agent (default: today, UTC).

# Pass a date to look back: `just visitors 2026-07-05`
visitors DATE="":
    tools/visitor-report.sh {{ DATE }}

# Raw request log lines for a day (default: today, UTC) — for ad-hoc digging.
visitor-logs DATE="":
    #!/usr/bin/env bash
    DAY="{{ DATE }}"; DAY="${DAY:-$(date -u +%Y-%m-%d)}"
    ssh pwebsite "docker logs --since '${DAY}T00:00:00' --until '${DAY}T23:59:59' website 2>&1 | grep 'msg=request'"

# Generate table of contents from h1/h2/h3 headings with IDs
[no-cd]
toc ARTICLE:
    #!/usr/bin/env bash
    if [[ -z "{{ ARTICLE }}" ]] || [[ ! -f "{{ ARTICLE }}" ]]; then
        echo "{{ ARTICLE }} is not a file" >&2
        exit 1
    fi

    awk '/<article>/,/<\/article>/' "{{ ARTICLE }}" | awk '
        { doc = doc $0 "\n" }
        END {
            n = 0
            min = 9
            while (match(doc, /<h[1-3][^>]*>/)) {
                tag = substr(doc, RSTART, RLENGTH)
                level = substr(tag, 3, 1)
                doc = substr(doc, RSTART + RLENGTH)
                close_at = index(doc, "</h" level ">")
                if (close_at == 0) continue
                if (!match(tag, /[ \t\n]id="[^"]+"/)) continue
                n++
                ids[n] = substr(tag, RSTART + 5, RLENGTH - 6)
                text = substr(doc, 1, close_at - 1)
                gsub(/<[^>]*>/, "", text)
                gsub(/[ \t\n]+/, " ", text)
                gsub(/^ | $/, "", text)
                texts[n] = text
                levels[n] = level
                if (level < min) min = level
            }
            if (n == 0) exit
            print "    <nav style=\"margin-block: 1em; padding: 0.8em 1em; background: #f5f6fa; border-radius: 12px;\">"
            print "      <p style=\"margin: 0 0 0.4em; font-weight: 600;\">Contents</p>"
            print "      <ul style=\"margin: 0; padding-left: 1.2em;\">"
            for (i = 1; i <= n; i++) {
                indent = (levels[i] - min) * 1.5
                print "        <li style=\"margin-left: " indent "em;\"><a href=\"#" ids[i] "\">" texts[i] "</a></li>"
            }
            print "      </ul>"
            print "    </nav>"
        }
    '

[no-cd]
email-octopus ARTICLE:
    #!/usr/bin/env bash
    URL=$(echo "{{ ARTICLE }}" | sed 's/.*content\///' | sed 's/^/https:\/\/playtechnique.io\//')

    # Build a table of contents from every h1/h2/h3 that carries an id.
    # Entries are indented relative to the shallowest heading level found.
    TOC=$(awk '/<article>/,/<\/article>/' "{{ ARTICLE }}" | awk '
        { doc = doc $0 "\n" }
        END {
            n = 0
            min = 9
            while (match(doc, /<h[1-3][^>]*>/)) {
                tag = substr(doc, RSTART, RLENGTH)
                level = substr(tag, 3, 1)
                doc = substr(doc, RSTART + RLENGTH)
                close_at = index(doc, "</h" level ">")
                if (close_at == 0) continue
                if (!match(tag, /[ \t\n]id="[^"]+"/)) continue
                n++
                ids[n] = substr(tag, RSTART + 5, RLENGTH - 6)
                text = substr(doc, 1, close_at - 1)
                gsub(/<[^>]*>/, "", text)
                gsub(/[ \t\n]+/, " ", text)
                gsub(/^ | $/, "", text)
                texts[n] = text
                levels[n] = level
                if (level < min) min = level
            }
            if (n == 0) exit
            print "    <nav style=\"margin-block: 1em; padding: 0.8em 1em; background: #f5f6fa; border-radius: 12px;\">"
            print "      <p style=\"margin: 0 0 0.4em; font-weight: 600;\">Contents</p>"
            print "      <ul style=\"margin: 0; padding-left: 1.2em;\">"
            for (i = 1; i <= n; i++) {
                indent = (levels[i] - min) * 1.5
                print "        <li style=\"margin-left: " indent "em;\"><a href=\"#" ids[i] "\">" texts[i] "</a></li>"
            }
            print "      </ul>"
            print "    </nav>"
        }
    ')
    export TOC

    awk '/<article>/,/<\/article>/' {{ ARTICLE }} | sed 's/href="\//href="https:\/\/playtechnique.io\//' | \
    sed 's/src="\//src="https:\/\/playtechnique.io\//' | \
    sed 's/class="attribution"/class="attribution" style="margin-inline:2.5em; font-weight:400; font-size: 0.9em"/' | \
    sed 's|<blockquote>|<blockquote style="margin-inline: 2.5em; font-size:1.1em; background: #eaeefa; border-radius: 16px; padding: 0.8em;"><span style="color:#ccc; font-size:1.8em; line-height:0; vertical-align:-0.2em;">\&ldquo;</span>|' | \
    sed 's|<pre><code>|<pre style="border: black 1px solid; width: content-width;"><code>|' | \
    awk '
        {
            if (/<article>/) {
                print
                print "    <p style=\"font-size: 0.8em;\"> to share this email as a webpage, click <a href=\"{{ "{{" }}ShareURL{{ "}}" }}\">here</a>."
                print "    </p><p style=\"font-size: 0.8em;\">to let your friends sign up for this series, click <a href=\"https://playtechnique.eo.page/vdp15\">here</a>."
            } else {
                print
            }
        }
        /<\/h1>/ { if (ENVIRON["TOC"] != "") print ENVIRON["TOC"] }
    '
    echo "From: Gwyn James - PlayTechnique" >&2
    echo "Sending From: newsletter@playtechnique.io" >&2
    echo "Preview line: \"Title of the Paper\" by Author" >&2
