from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load API Key from environment
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("Warning: GOOGLE_API_KEY not found in .env")
else:
    genai.configure(api_key=GOOGLE_API_KEY)


model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/generate-reply', methods=['POST'])
def generate_reply():
    data = request.json
    original_email = data.get('email', '')
    tone = data.get('tone', 'professional')

    if not original_email:
        return jsonify({"error": "No email content provided"}), 400

    prompt = f"Generate a {tone} reply for the following email:\n\n{original_email}\n\nStrictly provide only the reply text."

    try:
        response = model.generate_content(prompt)
        reply = response.text
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
