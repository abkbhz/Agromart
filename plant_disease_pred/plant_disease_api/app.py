from flask import Flask, request, jsonify, render_template
import numpy as np
from tensorflow import lite
from PIL import Image

app = Flask(__name__)

# Load your TFLite model
model = lite.Interpreter(model_path="model.tflite")
model.allocate_tensors()

# Define class labels from the training data
class_labels = {
    'Apple___Apple_scab': 0,
    'Apple___Black_rot': 1,
    'Apple___Cedar_apple_rust': 2,
    'Apple___healthy': 3,
    'Blueberry___healthy': 4,
    'Cherry_(including_sour)___Powdery_mildew': 5,
    'Cherry_(including_sour)___healthy': 6,
    'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot': 7,
    'Corn_(maize)___Common_rust_': 8,
    'Corn_(maize)___Northern_Leaf_Blight': 9,
    'Corn_(maize)___healthy': 10,
    'Grape___Black_rot': 11,
    'Grape___Esca_(Black_Measles)': 12,
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 13,
    'Grape___healthy': 14,
    'Orange___Haunglongbing_(Citrus_greening)': 15,
    'Peach___Bacterial_spot': 16,
    'Peach___healthy': 17,
    'Pepper,_bell___Bacterial_spot': 18,
    'Pepper,_bell_healthy': 19,
    'Potato_Early_blight': 20,
    'Potato_Late_blight': 21,
    'Potato_healthy': 22,
    'Raspberry_healthy': 23,
    'Soybean_healthy': 24,
    'Squash_Powdery_mildew': 25,
    'Strawberry_Leaf_scorch': 26,
    'Strawberry_healthy': 27,
    'Tomato_Bacterial_spot': 28,
    'Tomato_Early_blight': 29,
    'Tomato_Late_blight': 30,
    'Tomato_Leaf_Mold': 31,
    'Tomato_Septoria_leaf_spot': 32,
    'Tomato_Spider_mites_Two-spotted_spider_mite': 33,
    'Tomato_Target_Spot': 34,
    'Tomato_Yellow_Leaf_Curl_Virus': 35,
    'Tomato_mosaic_virus': 36,
    'Tomato_healthy': 37
}

# Solutions dictionary for remedies and tips
solutions_dict = {
    'Apple___Apple_scab': {
        'remedies': "Use a fungicide, improve air circulation.",
        'tips': "Water early in the morning."
    },
    'Apple___Black_rot': {
        'remedies': "Remove infected parts, apply fungicide.",
        'tips': "Keep foliage dry, avoid overhead watering."
    },
    'Apple___Cedar_apple_rust': {
        'remedies': "Use fungicides during wet weather.",
        'tips': "Ensure good air circulation."
    },
    'Apple___healthy': {
        'remedies': "No treatment needed.",
        'tips': "Maintain healthy practices."
    },
    'Blueberry___healthy': {
        'remedies': "No treatment needed.",
        'tips': "Provide adequate sunlight."
    },
    'Cherry_(including_sour)___Powdery_mildew': {
        'remedies': "Apply sulfur or fungicides.",
        'tips': "Ensure proper air circulation."
    },
    'Cherry_(including_sour)___healthy': {
        'remedies': "No treatment needed.",
        'tips': "Regular pruning helps."
    },
    'Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot': {
        'remedies': "Use fungicides as needed.",
        'tips': "Rotate crops to prevent recurrence."
    },
    'Corn_(maize)___Common_rust_': {
        'remedies': "Fungicide application.",
        'tips': "Plant resistant varieties."
    },
    'Corn_(maize)___Northern_Leaf_Blight': {
        'remedies': "Remove infected leaves.",
        'tips': "Practice crop rotation."
    },
    'Corn_(maize)___healthy': {
        'remedies': "No treatment needed.",
        'tips': "Healthy soil management."
    },
    'Grape___Black_rot': {
        'remedies': "Use fungicides during wet periods.",
        'tips': "Remove mummies and debris."
    },
    'Grape___Esca_(Black_Measles)': {
        'remedies': "No chemical treatment; remove infected vines.",
        'tips': "Avoid excessive nitrogen."
    },
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': {
        'remedies': "Apply fungicide as necessary.",
        'tips': "Maintain good air circulation."
    },
    'Grape___healthy': {
        'remedies': "No treatment needed.",
        'tips': "Ensure balanced fertilization."
    },
    'Orange___Haunglongbing_(Citrus_greening)': {
        'remedies': "Remove infected trees, no cure available.",
        'tips': "Maintain tree health."
    },
    'Peach___Bacterial_spot': {
        'remedies': "Use copper-based fungicides.",
        'tips': "Thin fruit for better air flow."
    },
    'Peach___healthy': {
        'remedies': "No treatment needed.",
        'tips': "Regular pruning helps."
    },
    'Pepper,_bell___Bacterial_spot': {
        'remedies': "Remove infected plants.",
        'tips': "Avoid overhead irrigation."
    },
    'Pepper,_bell_healthy': {
        'remedies': "No treatment needed.",
        'tips': "Good airflow is essential."
    },
    'Potato_Early_blight': {
        'remedies': "Apply fungicides as needed.",
        'tips': "Rotate crops annually."
    },
    'Potato_Late_blight': {
        'remedies': "Use resistant varieties, apply fungicides.",
        'tips': "Plant in well-drained soil."
    },
    'Potato_healthy': {
        'remedies': "No treatment needed.",
        'tips': "Healthy growing conditions."
    },
    'Raspberry_healthy': {
        'remedies': "No treatment needed.",
        'tips': "Regular pruning and care."
    },
    'Soybean_healthy': {
        'remedies': "No treatment needed.",
        'tips': "Maintain good soil health."
    },
    'Squash_Powdery_mildew': {
        'remedies': "Apply sulfur or baking soda solutions.",
        'tips': "Increase airflow around plants."
    },
    'Strawberry_Leaf_scorch': {
        'remedies': "Remove affected leaves.",
        'tips': "Water plants at the base."
    },
    'Strawberry_healthy': {
        'remedies': "No treatment needed.",
        'tips': "Mulch to retain moisture."
    },
    'Tomato_Bacterial_spot': {
        'remedies': "Use copper fungicide.",
        'tips': "Avoid wet foliage."
    },
    'Tomato_Early_blight': {
        'remedies': "Apply fungicides, remove affected leaves.",
        'tips': "Rotate crops annually."
    },
    'Tomato_Late_blight': {
        'remedies': "Fungicide application, remove debris.",
        'tips': "Avoid wet conditions."
    },
    'Tomato_Leaf_Mold': {
        'remedies': "Improve ventilation, use fungicides.",
        'tips': "Water at the base."
    },
    'Tomato_Septoria_leaf_spot': {
        'remedies': "Remove infected leaves, apply fungicide.",
        'tips': "Avoid wet foliage."
    },
    'Tomato_Spider_mites_Two-spotted_spider_mite': {
        'remedies': "Use miticides or insecticidal soap.",
        'tips': "Increase humidity."
    },
    'Tomato_Target_Spot': {
        'remedies': "Remove affected leaves, apply fungicide.",
        'tips': "Practice crop rotation."
    },
    'Tomato_Yellow_Leaf_Curl_Virus': {
        'remedies': "Remove infected plants, no cure available.",
        'tips': "Control aphid populations."
    },
    'Tomato_mosaic_virus': {
        'remedies': "Remove infected plants, no cure available.",
        'tips': "Practice good sanitation."
    },
    'Tomato_healthy': {
        'remedies': "No treatment needed.",
        'tips': "Maintain proper care."
    }
}

# Define a route for the root URL
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', prediction=None, solutions=None)  # Render the HTML form

# Define your predict route
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    
    # Process the image
    img = Image.open(file.stream)
    img = img.resize((224, 224))  # Adjust size according to your model input
    img_array = np.array(img) / 255.0  # Normalize the image
    img_array = np.expand_dims(img_array, axis=0).astype(np.float32)  # Add batch dimension and convert to float32

    # Make prediction
    input_details = model.get_input_details()
    output_details = model.get_output_details()
    model.set_tensor(input_details[0]['index'], img_array)
    model.invoke()
    output_data = model.get_tensor(output_details[0]['index'])

    # Assume output_data gives class probabilities
    prediction_index = np.argmax(output_data)
    predicted_label = list(class_labels.keys())[prediction_index]

    # Retrieve remedies and tips from the local solutions dictionary
    if predicted_label in solutions_dict:
        remedies = solutions_dict[predicted_label]['remedies']
        tips = solutions_dict[predicted_label]['tips']
    else:
        remedies = "No solutions available"
        tips = "No tips available"

    return render_template('index.html', prediction=predicted_label, solutions={"remedies": remedies, "tips": tips})

if __name__ == "__main__":
    app.run(debug=True)
