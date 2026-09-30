// ==UserScript==
// @name         Live Chat on YouTube Mobile
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Integrates the live chat into the mobile version of YouTube
// @match        https://m.youtube.com/*
// @grant        none
// @license       MIT
// @downloadURL https://update.greasyfork.org/scripts/519614/Live%20Chat%20on%20YouTube%20Mobile.user.js
// @updateURL https://update.greasyfork.org/scripts/519614/Live%20Chat%20on%20YouTube%20Mobile.meta.js
// ==/UserScript==

(function() {
    'use strict';

    // Create a button to show/hide the chat
    const button = document.createElement('button');
    button.innerText = 'Show Live Chat';
    button.style.position = 'fixed';
    button.style.bottom = '64px'; // Adjust the position
    button.style.right = '20px';
    button.style.zIndex = '9999'; // Ensures the button is always on top
    button.style.padding = '10px';
    button.style.backgroundColor = '#ff0000';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Add the button to the document body
    document.body.appendChild(button);

    // Create a container for the chat
    const chatContainer = document.createElement('div');
    chatContainer.style.display = 'none'; // Hidden by default
    chatContainer.style.position = 'absolute'; // Use absolute positioning to place it below the video
    chatContainer.style.width = 'calc(100% - 4px)'; // Adjust width to fill the screen minus the margin
    chatContainer.style.height = '400px'; // Adjust height
    chatContainer.style.border = '1px solid #ccc';
    chatContainer.style.backgroundColor = '#fff';
    chatContainer.style.zIndex = '1000'; // Ensure the chat is below the button
    chatContainer.style.overflow = 'auto'; // Allow scrolling if the chat is long
    chatContainer.style.marginLeft = '2px'; // 2px margin on the left
    chatContainer.style.marginRight = '2px'; // 2px margin on the right

    // Create the iframe for the chat
    const chatIframe = document.createElement('iframe');
    chatIframe.style.width = '100%';
    chatIframe.style.height = '100%';
    chatIframe.style.border = 'none';
    chatIframe.style.maxWidth = '100%'; // Ensure the iframe doesn't overflow the container

    // Function to toggle the chat visibility
    button.onclick = function() {
        if (chatContainer.style.display === 'none') {
            const videoIdMatch = window.location.search.match(/v=([^&]+)/);
            if (videoIdMatch) {
                const videoId = videoIdMatch[1];
                chatIframe.src = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${window.location.hostname}`;
                chatContainer.appendChild(chatIframe);
                document.body.appendChild(chatContainer); // Append the chat container to the body

                // Position the chat below the video player
                const videoPlayer = document.querySelector('video');
                if (videoPlayer) {
                    const videoRect = videoPlayer.getBoundingClientRect();
                    chatContainer.style.top = `${videoRect.bottom + window.scrollY}px`; // Position the chat just below the video
                }

                chatContainer.style.display = 'block'; // Show the chat container
                button.innerText = 'Hide Live Chat'; // Change the button text to "Hide Live Chat"

                // Adjust the text size of the chat messages
                chatIframe.onload = function() {
                    const iframeDocument = chatIframe.contentWindow.document;
                    const style = iframeDocument.createElement('style');
                    style.textContent = `
                        .style-scope.yt-live-chat-text-message-renderer {
                            font-size: 12px !important; /* Reduce the text size */
                        }
                        .style-scope.yt-live-chat-text-message-renderer #author-name {
                            font-size: 12px !important; /* Reduce the author name size */
                        }
                    `;
                    iframeDocument.head.appendChild(style);
                };
            } else {
                alert('Could not find the video ID.');
            }
        } else {
            chatContainer.style.display = 'none'; // Hide the chat container
            button.innerText = 'Show Live Chat'; 
        }
    };

})();
