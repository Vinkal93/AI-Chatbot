document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const chips = document.querySelectorAll('.chip');

    // Auto-resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // NEW UPDATE JS START
    function formatMessage(text) {
        // Convert line breaks to <br> tags if not already HTML
        if (!text.includes('<br>') && !text.includes('</h')) {
            text = text.replace(/\n/g, '<br>');
        }
        return text;
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        // Use innerHTML instead of textContent to render HTML formatting
        messageDiv.innerHTML = formatMessage(text);
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function addMessageWithTyping(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        chatContainer.appendChild(messageDiv);

        // Split text into HTML tags and content
        const parts = text.split(/(<[^>]*>)/);
        let currentIndex = 0;

        function typeText() {
            if (currentIndex < parts.length) {
                const part = parts[currentIndex];
                if (part.startsWith('<')) {
                    // If it's an HTML tag, add it immediately
                    messageDiv.innerHTML += part;
                } else {
                    // If it's content, type it character by character
                    let charIndex = 0;
                    function typeCharacter() {
                        if (charIndex < part.length) {
                            messageDiv.innerHTML += part.charAt(charIndex);
                            charIndex++;
                            chatContainer.scrollTop = chatContainer.scrollHeight;
                            setTimeout(typeCharacter, 20);
                        } else {
                            currentIndex++;
                            typeText();
                        }
                    }
                    typeCharacter();
                    return;
                }
                currentIndex++;
                typeText();
            }
        }
        typeText();
    }
    // NEW UPDATE JS END

    // Handle sending messages
    function sendMessage(message) {
        if (!message.trim()) return;

        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                addMessage('Sorry, an error occurred. Please try again.', 'bot');
            } else {
                const customizedResponse = data.response
                    .replace(/Gemini/g, 'Vinkal041')
                    .replace(/Google/g, 'Vinkal Prajapati');
                addMessageWithTyping(customizedResponse, 'bot');
            }
        })
        .catch(error => {
            addMessage('Sorry, an error occurred. Please try again.', 'bot');
            console.error('Error:', error);
        });
    }

    // Event listeners
    sendButton.addEventListener('click', () => sendMessage(userInput.value));

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(userInput.value);
        }
    });

    // Handle suggestion chips
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            sendMessage(chip.textContent);
        });
    });
});









// new update






// Add these variables at the top of your script.js
let currentController = null;
const stopButton = document.createElement('button');
stopButton.className = 'stop-button';
stopButton.innerHTML = '<i class="fas fa-stop"></i> Stop';
stopButton.style.display = 'none';

// Add this after your existing button declarations
document.querySelector('.button-group').appendChild(stopButton);

// Update your sendMessage function
async function sendMessage(message) {
    if (!message.trim()) return;

    // Hide stop button if it was visible from previous interaction
    stopButton.style.display = 'none';
    
    // Add user message
    addMessage(message, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';

    // Show stop button
    stopButton.style.display = 'block';

    // Create new AbortController for this request
    currentController = new AbortController();

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message }),
            signal: currentController.signal
        });

        const data = await response.json();
        
        if (data.error) {
            addMessage('Sorry, an error occurred. Please try again.', 'bot');
        } else {
            const customizedResponse = data.response
                .replace(/Gemini/g, 'Vinkal041')
                .replace(/Google/g, 'Vinkal Prajapati');
            addMessageWithTyping(customizedResponse, 'bot');
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            addMessage('Response generation was stopped.', 'bot');
        } else {
            addMessage('Sorry, an error occurred. Please try again.', 'bot');
            console.error('Error:', error);
        }
    } finally {
        // Hide stop button after completion or error
        stopButton.style.display = 'none';
        currentController = null;
    }
}

// Add stop button event listener
stopButton.addEventListener('click', () => {
    if (currentController) {
        currentController.abort();
        stopButton.style.display = 'none';
    }
});