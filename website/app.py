from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.preprocessing import LabelEncoder, StandardScaler

app = Flask(__name__)
CORS(app)


model = joblib.load('model.joblib')

def preprocessing(df):
    def le(df):
            for col in df.columns:
               if df[col].dtype == 'object':
                label_encoder = LabelEncoder()
                df[col] = label_encoder.fit_transform(df[col])
    le(df)

    scale = StandardScaler()
    df = scale.fit_transform(df)

    return df
    

# Manual
def predict_manual(data):
    df = pd.DataFrame([data])

    expected_columns = [
            'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes',
            'count', 'same_srv_rate', 'diff_srv_rate',
            'dst_host_srv_count', 'dst_host_same_srv_rate'
        ]
        
    missing_columns = [col for col in expected_columns if col not in df.columns]
    if missing_columns:
      raise ValueError(f"Missing columns in input file: {missing_columns}")
        
    df = df[expected_columns]
    
    df = preprocessing(df)

    prediction = model.predict(df)
    return prediction.tolist()

# CSV file
def predict_csv(file):
    try:
        # Load CSV file into a DataFrame
        df = pd.read_csv(file)
        
        # Check for missing columns
        expected_columns = [
            'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes',
            'count', 'same_srv_rate', 'diff_srv_rate',
            'dst_host_srv_count', 'dst_host_same_srv_rate'
        ]

        df = df[expected_columns]
          
        missing_columns = [col for col in expected_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Missing columns in input file: {missing_columns}")

        numerical_columns = [
            'src_bytes', 'dst_bytes', 'count',
            'same_srv_rate', 'diff_srv_rate',
            'dst_host_srv_count', 'dst_host_same_srv_rate'
        ]
        df[numerical_columns] = df[numerical_columns].apply(pd.to_numeric, errors='coerce')

        # Handle missing or invalid numerical data
        if df[numerical_columns].isnull().any().any():
            raise ValueError("Numerical columns contain invalid or missing values.")
        
        df = preprocessing(df)

        # Make predictions
        predictions = model.predict(df)
        return predictions.tolist()

    except Exception as e:
        print(f"Error processing CSV file: {e}")
        return {"error": str(e)}

@app.route('/predict', methods=['POST'])
def predict():
    result = None
    try:
        if 'file' in request.files:
        # Handle file upload for prediction
          file = request.files['file']
          result = predict_csv(file)
        else:
        # Handle manual input for prediction
          data = {key: request.form[key] for key in request.form}
          result = predict_manual(data)
    
        return jsonify({'result': result})
    
    except Exception as e:
        return jsonify({'error': str(e)})
    
# Metrix
@app.route('/metrics', methods=['GET'])
def metrics():
    try:
        trn = pd.read_csv('Train_data.csv')
        tst = pd.read_csv('Test_data.csv')

        def le(df):
            for col in df.columns:
                if df[col].dtype == 'object':
                    label_encoder = LabelEncoder()
                    df[col] = label_encoder.fit_transform(df[col])
        le(trn)
        le(tst)

        trn_x = trn.drop(['class'], axis=1)
        trn_y= trn['class']
        selected_features = ['protocol_type',
        'service',
        'flag',
        'src_bytes',
        'dst_bytes',
        'count',
        'same_srv_rate',
        'diff_srv_rate',
        'dst_host_srv_count',
        'dst_host_same_srv_rate'
        ]
        trn_x = trn_x[selected_features]
        scale = StandardScaler()
        trn_x = scale.fit_transform(trn_x)
        tst = scale.fit_transform(tst)

        x_train, x_test, y_train, y_test = train_test_split(trn_x, trn_y, train_size=0.80)
        
        y_pred = model.predict(x_test)

        # Calculate metrics
        accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred, average='weighted')
        precision = precision_score(y_test, y_pred, average='weighted')
        recall = recall_score(y_test, y_pred, average='weighted')


        return jsonify({
            "accuracy": accuracy,
            "f1_score": f1,
            "precision": precision,
            "recall": recall
        })
    except Exception as e:
        return jsonify({"error": str(e)})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
