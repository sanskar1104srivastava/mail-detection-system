from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)


@app.route('/detect', methods=['POST'])
def detect():
    data = request.get_json()
    email = data.get('email', '')

    model = joblib.load('phishing_model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')

    email_vec = vectorizer.transform([email])
    prediction = model.predict(email_vec)

    result = 'unsafe' if prediction[0] == 1 else 'safe'
    return jsonify({ 'result': result })

if __name__ == '__main__':
    app.run(debug=True)
