import React from 'react';

function LandingPage() {
  return (
    <div>
      <header>
        Unauthorized Access Detection System
      </header>
      <div className="container">
        <h1>Welcome to Our System</h1>
        <p>
          Leverage advanced machine learning to detect unauthorized access and
          secure your infrastructure.
        </p>
        <a href="/signin">
          <button>Get Started</button>
        </a>
      </div>
      <footer>© 2024 SecureAccess Systems</footer>
    </div>
  );
}

export default LandingPage;
