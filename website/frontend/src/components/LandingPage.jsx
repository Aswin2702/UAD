import React from 'react';
import img from '../assets/key7.jpg';
import './LandingPage.css';

function LandingPage() {
  return (
    <div>
      <header>Unauthorized Access Detection System</header>
      <div className='landing-container'>
        <img
          className='cover'
          src={img}
          alt='cover'
        />
        <div className='overlay-content'>
          <h1>Welcome to Our System</h1>
          <p>
            Empower your organization with advanced solutions to detect and
            prevent unauthorized access.
          </p>
          <p>
            Our system leverages machine learning and honeypot integration to
            proactively monitor, analyze, and secure your network
            infrastructure, ensuring safety from malicious actors.
          </p>
          <button>
            <a href='/signin'>Get Started</a>
          </button>
        </div>
      </div>
      <footer>© 2024 SecureAccess Systems</footer>
    </div>
  );
}

export default LandingPage;
