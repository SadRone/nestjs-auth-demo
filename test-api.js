// test-api.js
import fetch from 'node-fetch';

async function main() {
  // 1) Register
  let r = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'bob@example.com',
      username: 'bob',
      password: 'pw123',
      confirmPassword: 'pw123',
    }),
  });
  console.log('Register status:', r.status, await r.json());

  // 2) Login
  r = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'bob@example.com', password: 'pw123' }),
  });
  const { access_token } = await r.json();
  console.log('Token:', access_token);

  // 3) Protected
  r = await fetch('http://localhost:3000/auth/profile', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  console.log('Profile:', await r.json());
}

main();
