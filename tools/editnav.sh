#!/bin/bash

for file in "$@"; do
    if ! grep -q '<img src="/images/logo.png">' "$file"; then
        tmp=$(mktemp)
        # Ensure we handle the success of the pipeline correctly
        if tr '\n' '\r' < "$file" | sed -E "s#(<nav class=\"navigation\">[^<]*<a href=\"\/\" class=\"link\">front page</a>)#\1\r        <img src=\"/images/logo.png\">#" | tr '\r' '\n' > "$tmp"; then
            # Only move the temporary file if the previous commands were successful
            mv "$tmp" "$file"
        else
            echo "An error occurred processing $file. No changes made."
            rm "$tmp"  # Remove the temporary file if the operation failed
        fi
    fi
done
