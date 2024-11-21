import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SigninPage from './components/SigninPage';
import PredictionPage from './components/PredictionPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/predict" element={<PredictionPage />} />
            </Routes>
        </Router>
    );
};

export default App;
