# File: app.py
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from datetime import datetime

app = Flask(__name__)

API_KEY = "AIzaSyBUISeOrDh1C2Yir4JnAkcwth2skb7mHwc"  # Add your API key here
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json['message']
        chat = model.start_chat(history=[])
        response = chat.send_message(user_message)
        return jsonify({'response': response.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)