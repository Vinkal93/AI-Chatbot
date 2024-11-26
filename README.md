# 🌟 AI Chatbot with Flask and Gemini Model 🌟

Welcome to the **AI Chatbot** project! This chatbot is powered by **Flask** for the backend and **Google's Gemini Pro Generative AI Model** for intelligent, human-like conversations. 🧠✨

---

## 🛠️ Features

- 🤖 **Intelligent Responses**: Utilizes the Gemini Pro Generative Model to provide accurate and engaging responses.
- 🖼️ **HTML Formatted Output**: Formats responses into clean HTML for better readability and integration.
- 🔐 **Secure API Integration**: Keeps API keys secure using environment variables (`dotenv`).
- 🔄 **Dynamic Formatting**:
  - Supports **headings** (`#`, `##`, `###`), **numbered lists**, and **bullet points**.
  - Converts markdown-style input into structured HTML output for web use.

---

## 🚀 How It Works

1. **Flask Backend**: Hosts the chatbot service and handles user requests via POST endpoints.
2. **Gemini Model Integration**:
   - Accepts user input.
   - Generates AI-powered responses.
3. **Response Formatting**:
   - Converts markdown-style AI responses into well-structured HTML.
4. **Web Interface**: Designed to render user input and AI responses interactively.

---

## 📂 Project Structure

. ├── app.py # Main Flask application ├── templates/ │ └── index.html # Frontend for the chatbot ├── .env # API key storage (secure) ├── requirements.txt # Python dependencies └── README.md # This file





---

## 🧑‍💻 Technologies Used

- **Flask**: Backend framework.
- **Google Generative AI (Gemini Pro)**: AI model for generating responses.
- **Python**: Core programming language.
- **dotenv**: For environment variable management.
- **HTML + CSS**: Frontend structure and styling.

---

## 🛠️ Setup Instructions

### 1. Clone the Repository  
```bash
git clone https://github.com/Vinkal93/Ai-chatbot.git
cd Ai-chatbot


2. Install Dependencies
Make sure you have Python installed. Install required libraries using:

bash
Copy code
pip install -r requirements.txt
3. Configure Environment Variables
Create a .env file in the root directory.
Add your API key:
env
Copy code
API_KEY=your_google_genai_api_key
4. Run the Application
Start the Flask server:

bash
Copy code
python app.py
The server will run at http://127.0.0.1:5000.

5. Access the Chatbot
Open a browser and go to http://127.0.0.1:5000.

🎨 API Workflow
User Input: The user sends a message via the chatbot interface.
Formatted Prompt:
The message is sent to Gemini Pro with guidelines for structured responses (e.g., headings, lists).
AI Response: The AI generates a structured response.
HTML Formatting: The response is formatted into readable HTML for display.
📋 Example Use Case
User Input:
"Explain how photosynthesis works."

AI Response:
html
Copy code
<h1 class="heading-1">Photosynthesis</h1>
<p>Photosynthesis is the process by which green plants convert sunlight into energy.</p>
<h2 class="heading-2">Steps:</h2>
<div class="numbered-item"><span class="number">1.</span> Light energy is captured by chlorophyll.</div>
<div class="numbered-item"><span class="number">2.</span> Water molecules split to release oxygen.</div>
<div class="numbered-item"><span class="number">3.</span> Energy is stored as glucose.</div>
🔧 Future Enhancements
🌐 Add support for multi-language responses.
📊 Integrate analytics to track user interactions.
🖥️ Build a more interactive frontend using React or Vue.js.
✨ Contributing
Fork the repository.
Create a new branch for your feature/bug fix:
bash
Copy code
git checkout -b feature-name
Commit your changes:
bash
Copy code
git commit -m "Add your message here"
Push to your branch:
bash
Copy code
git push origin feature-name
Submit a pull request! 🎉
💻 Author
👤 Vinkal Prajapati

🌐 Website
📧 Email
🏆 Upwork Profile
📜 License
This project is licensed under the MIT License. 📝
