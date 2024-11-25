import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Metrics.css';

const MetricsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/metrics');
      setMetrics(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching metrics. Please try again.');
    }
  };

  const trainModel = async () => {
    navigate('/train-model');
  };

  const makePrediction = () => {
    navigate('/predict');
  };

  return (
    <div>
      <header>Model Performance Metrics</header>
      <div className='main'>
        <div className='metrics-container'>
          <h1>Model Performance Metrics</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {metrics ? (
            <div className='metrics-content'>
              <p>
                <strong>Accuracy:</strong> {metrics.accuracy}
              </p>
              <p>
                <strong>F1 Score:</strong> {metrics.f1_score}
              </p>
              <p>
                <strong>Precision:</strong> {metrics.precision}
              </p>
              <p>
                <strong>Recall:</strong> {metrics.recall}
              </p>
            </div>
          ) : (
            <p>Click "Get Metrics" to view model performance.</p>
          )}
          <button onClick={fetchMetrics}>Get Metrics</button>
          <div className='small-button'>
            <button
              onClick={trainModel}
              className='small'
            >
              Train Model
            </button>
            <button
              onClick={makePrediction}
              className='small'
            >
              Make Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPage;
