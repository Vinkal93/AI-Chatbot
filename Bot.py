from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from datetime import datetime
from dotenv import load_dotenv
import os
import re
import html

app = Flask(__name__)

# Load environment variables
load_dotenv()
API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')

def format_response(text):
    # Safety: Escape HTML first, then selectively unescape our own tags
    text = html.escape(text)
    
    # Format numbered lists
    text = re.sub(r'^\s*(\d+)\.\s+(.+)$', r'<div class="numbered-item"><span class="number">\1.</span>\2</div>', text, flags=re.MULTILINE)
    
    # Format bullet points
    text = re.sub(r'^\s*[\-\*]\s+(.+)$', r'<div class="bullet-item">• \1</div>', text, flags=re.MULTILINE)
    
    # Convert markdown headings to HTML with classes
    text = re.sub(r'^###\s+(.+)$', r'<h3 class="heading-3">\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^##\s+(.+)$', r'<h2 class="heading-2">\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^#\s+(.+)$', r'<h1 class="heading-1">\1</h1>', text, flags=re.MULTILINE)
    
    # Format paragraphs (text between blank lines)
    text = re.sub(r'([^\n])\n([^\n])', r'\1<br>\2', text)
    text = re.sub(r'\n\n+', '</p><p>', text)
    
    # Wrap in paragraph if not already wrapped
    if not text.startswith('<'):
        text = f'<p>{text}</p>'
    
    return text

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json['message']
        
        # Enhanced prompt for better formatting
        formatted_prompt = f"""
        Please provide your response in a well-structured format using these guidelines:
        - Use '#', '##', or '###' for different heading levels
        - Use numbers (1., 2., etc.) for sequential steps or lists
        - Use bullet points (- or *) for non-sequential items
        - Use clear paragraphs with line breaks for better readability
        - Maintain clear hierarchy in the response structure
        
        User question: {user_message}
        """
        
        chat = model.start_chat(history=[])
        response = chat.send_message(formatted_prompt)
        
        # Format the response
        formatted_response = format_response(response.text)
        
        return jsonify({'response': formatted_response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)