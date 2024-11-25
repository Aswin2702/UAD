import axios from 'axios';
import React, { useState } from 'react';
import './styles.css';

function PredictionPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (file) data.append('file', file);
    try {
      const response = await axios.post(
        'http://localhost:5000/upload_train',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log(response);
      setResult(response.data.message);
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Train Model</h2>
      <label>
        Please upload the file
        <select value={'Upload CSV'}>
          <option value='csv'>Upload CSV</option>
        </select>
      </label>

      <div>
        <input
          type='file'
          accept='.csv'
          onChange={handleFileChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div>
        <center>
          <h3>{result || 'Loading...'}</h3>
        </center>
      </div>
    </div>
  );
}

export default PredictionPage;
