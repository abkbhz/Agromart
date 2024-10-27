from flask import Flask, request, render_template, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# Load the pre-trained model and other necessary objects
rf_classifier = joblib.load("rf_classifier.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Define a route for the homepage (optional if you want to keep a front-end page)
@app.route('/')
def index():
    return render_template('index.html')

# Define a route to handle crop prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Check if request data is JSON or form
        if request.is_json:
            input_data = request.get_json()
        else:
            input_data = request.form

        # Parse the input data
        N = float(input_data['N'])
        P = float(input_data['P'])
        K = float(input_data['K'])
        temperature = float(input_data['temperature'])
        humidity = float(input_data['humidity'])
        pH = float(input_data['ph'])
        rainfall = float(input_data['rainfall'])
        
        # Create a DataFrame for the input and scale it
        user_input = pd.DataFrame([[N, P, K, temperature, humidity, pH, rainfall]], 
                                  columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])
        user_input_scaled = scaler.transform(user_input)
        
        # Predict the crop
        crop_prediction = rf_classifier.predict(user_input_scaled)
        crop_name = label_encoder.inverse_transform(crop_prediction)[0]
        
        return jsonify({'recommended_crop': crop_name})
    except Exception as e:
        return jsonify({'error': str(e)})

# Optional health-check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "API is running"})

if __name__ == '__main__':
    app.run(debug=True)
