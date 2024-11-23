import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();   

  const handleSignIn = () => {
    // alert(`Signed in successfully as ${email}`);
    if (!email || !password) {
      alert('Please enter the credantials.')
      return
    }
    navigate('/metrics ');
  };

  return (
    <div>
      <header>Sign In</header>
      <div className="container">
        <h2>Welcome Back</h2>
        <p>Please sign in to continue.</p>
        <input
          type="text"
          placeholder="Username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignIn}>Sign In</button>
      </div>
      <footer>© 2024 SecureAccess Systems</footer>
    </div>
  );
}

export default SignInPage;
