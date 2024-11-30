'use client';

// library imports
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SignIn() {
  const searchParams = useSearchParams();
  const googleLogin =
    'Your google login url which will contain your client id and redirectURI';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // console.log('auth secret', process.env.AUTH_SECRET);
    // if (authenticated) {
    //   // Redirect to previous page or home page
    //   const next = searchParams.get('next') || '/';
    //   window.location.href = next;
    // }
  }, [authenticated]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        // handle error state here
        setError('Invalid credentials');
      }
    } catch (error) {
      // handle error state here
      console.error('Error during sign-in', error);
      setError('Internal server error');
    }
  };

  return (
    <div className="mx-auto w-[200px] h-full border-red-100">
      <div>
        <p className="flex justify-center w-full mt-3 mb-5 text-xl">Sign In</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            type="submit"
          >
            Sign In
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
