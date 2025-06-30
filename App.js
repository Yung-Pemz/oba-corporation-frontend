import React, { useState } from 'react';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'https://your-backend-url.com'; // Update this when backend is ready

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const res = await fetch(API_URL + endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isLogin ? 'Admin Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <br /><br />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <br /><br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
        {isLogin ? 'Need to register?' : 'Back to login'}
      </button>
    </div>
  );
}