import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SigninPage from './components/SigninPage';
import PredictionPage from './components/PredictionPage';
import MetricsPage from './components/MetricsPage';
import TrainModelPage from './components/TrainModelPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<LandingPage />}
        />
        <Route
          path='/signin'
          element={<SigninPage />}
        />
        <Route
          path='/metrics'
          element={<MetricsPage />}
        />
        <Route
          path='/predict'
          element={<PredictionPage />}
        />
        <Route
          path='/train-model'
          element={<TrainModelPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
