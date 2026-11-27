
import { useState } from 'react';
import type { FormEvent } from 'react';
import { ShieldCheck, Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError('');

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError('Unable to sign in. Check your credentials.');
      }
    } catch {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#06152f] px-5 pb-16 pt-36">

      <div className="w-full max-w-md rounded-3xl border border-amber-400/30 bg-[#102747] p-8 shadow-2xl">

        <ShieldCheck
          size={55}
          className="mx-auto text-amber-400"
        />

        <h1 className="mt-5 text-center text-3xl font-black text-amber-400">
          GRK FASHION
        </h1>

        <p className="mt-2 text-center text-white">
          Administrator Login
        </p>

        <p className="mt-2 text-center text-xs text-slate-400">
          Authorized administrators only
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >

          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm text-amber-300"
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-amber-400"
              />

              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-amber-400/30 bg-[#06152f] py-3.5 pl-12 pr-4 text-white outline-none focus:border-amber-400"
              />

            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm text-amber-300"
            >
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-amber-400"
              />

              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-amber-400/30 bg-[#06152f] py-3.5 pl-12 pr-4 text-white outline-none focus:border-amber-400"
              />

            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-amber-200 to-amber-500 py-4 font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Secure Login'}
          </button>

        </form>

        <a
          href="/fashion"
          className="mt-6 block text-center text-sm text-amber-400"
        >
          Back to GRK Fashion
        </a>

      </div>
    </main>
  );
}
