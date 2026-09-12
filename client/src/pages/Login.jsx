import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const inputCls =
  'block w-full rounded-lg border border-line bg-white px-4 py-2.5 text-ink placeholder:text-slate-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:opacity-50';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/dreams');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-center text-sm text-muted">Log in to your dream journal</p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-accent px-4 py-2.5 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
                  Logging in...
                </>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-accent hover:text-violet-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;