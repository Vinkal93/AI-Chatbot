// File: static/js/script.js
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

    // Handle sending messages
    function sendMessage(message) {
        if (!message.trim()) return;

        // Add user message
        addMessage(message, 'user');
        userInput.value = '';
        userInput.style.height = 'auto';

        // Send to backend
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
                // Replace "Gemini" with "Vinkal041" in the response
                const customizedResponse = data.response.replace(/Gemini/g, 'Vinkal041')
                                                      .replace(/Google/g, 'Vinkal Prajapati');
                addMessageWithTyping(customizedResponse, 'bot');
            }
        })
        .catch(error => {
            addMessage('Sorry, an error occurred. Please try again.', 'bot');
            console.error('Error:', error);
        });
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = text;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Add message with typing effect
    function addMessageWithTyping(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        chatContainer.appendChild(messageDiv);

        let index = 0;
        function typeText() {
            if (index < text.length) {
                messageDiv.textContent += text.charAt(index);
                index++;
                chatContainer.scrollTop = chatContainer.scrollHeight;
                setTimeout(typeText, 20);
            }
        }
        typeText();
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