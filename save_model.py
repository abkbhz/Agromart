import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pandas as pd

# Assuming you have your training data ready (X, y)
# X = ...  # Your feature data
# y = ...  # Your target variable (labels)

# Train your model (this part is just an example)
rf_classifier = RandomForestClassifier()
rf_classifier.fit(X, y)

# Assuming you've set up your scaler and label encoder
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Save the model, scaler, and label encoder
joblib.dump(rf_classifier, 'rf_classifier.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(label_encoder, 'label_encoder.pkl')

print("Model and scalers saved successfully!")
