import tensorflow as tf
import numpy as np
from PIL import Image
import zipfile
import io

# Load the TFLite model and allocate tensors
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Load and preprocess the image
def load_image(image_data):
    img = Image.open(io.BytesIO(image_data)).resize((224, 224))  # Adjust size as needed
    img = np.array(img, dtype=np.float32) / 255.0  # Normalize the image
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Path to the ZIP file containing test images
zip_file_path = r"C:\Users\vishn\Documents\EVOLUMIN\PLANT DISEASES DATASET.zip"

# Open the ZIP file and process images
with zipfile.ZipFile(zip_file_path, 'r') as zip_file:
    test_folder = 'test/test/'  # Adjust this path if necessary
    for image_file in zip_file.namelist():
        if image_file.startswith(test_folder) and image_file.endswith(('.jpg', '.jpeg', '.png')):
            with zip_file.open(image_file) as image_data:
                input_data = load_image(image_data.read())

                # Set the input tensor
                interpreter.set_tensor(input_details[0]['index'], input_data)

                # Run the model
                interpreter.invoke()

                # Get the output tensor
                output_data = interpreter.get_tensor(output_details[0]['index'])
                print(f"Output for {image_file}:", output_data)
