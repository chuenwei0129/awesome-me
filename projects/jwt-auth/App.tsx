import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4396/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Login successful! Token: ${data.token}`);

        // 使用 token 访问受保护路由
        const protectedResponse = await fetch(
          'http://localhost:4396/protected',
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          },
        );

        if (protectedResponse.ok) {
          const protectedData = await protectedResponse.json();
          console.log('🚀 ~ handleLogin ~ protectedData:', protectedData);
        }
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="overflow-scroll">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {message && <p className="text-wrap">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
