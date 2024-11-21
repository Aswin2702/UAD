import axios from 'axios';
import React, { useState } from 'react';
import "./styles.css"

function PredictionPage() {
  const [inputType, setInputType] = useState('manual');
  const [formData, setFormData] = useState({
    protocol_type: '',
    service: '',
    flag: '',
    src_bytes: '',
    dst_bytes: '',
    count: '',
    same_srv_rate: '',
    diff_srv_rate: '',
    dst_host_srv_count: '',
    dst_host_same_srv_rate: '',
  });
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    if (inputType === 'manual') {
      for (const key in formData) {
        data.append(key, formData[key]);
      }
    } else {
      data.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setPredictions( response.data.result);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className="container">
      <h2>Make Prediction</h2>
      <label>
        Choose input type:
        <select onChange={(e) => setInputType(e.target.value)} value={inputType}>
          <option value="manual">Manual Input</option>
          <option value="csv">Upload CSV</option>
        </select>
      </label>

      {inputType === 'manual' ? (
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={key}
              value={formData[key]}
              onChange={handleChange}
            />
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      {predictions && (
        <div>
          <h3>Prediction Result:</h3>
          {predictions.map(prediction => (
            <pre key={(predictions.indexOf(prediction) + 1)}>{prediction === 1 ? "Authorized"
            : "Unthorized"}</pre>            
          ))}
        </div>
      )}
    </div>
  );
}

export default PredictionPage;
