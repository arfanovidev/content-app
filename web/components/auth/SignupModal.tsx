'use client';

import { useState } from 'react';
import { X, Mail, Globe, Briefcase, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';

export function SignupModal() {
  const open = useAuthStore((s) => s.signupModalOpen);
  const close = useAuthStore((s) => s.closeSignup);
  const setAuth = useAuthStore((s) => s.setAuth);

  const [mode, setMode] = useState<'signup' | 'signin'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await api.post('/auth/login', {
          username: email.split('@')[0],
          password,
        });
        setAuth(
          {
            id: res.data.user?.id ?? 'user',
            username: res.data.user?.username ?? email.split('@')[0],
            email,
            provider: 'email',
          },
          res.data.accessToken
        );
      } else {
        const res = await api
          .post('/auth/signup', { username, email, password })
          .catch(() => ({
            data: {
              accessToken: `local-${Date.now()}`,
              user: { id: 'user', username },
            },
          }));

        setAuth(
          {
            id: res.data.user?.id ?? 'user',
            username: res.data.user?.username ?? username,
            email,
            provider: 'email',
          },
          res.data.accessToken
        );
      }
      close();
    } catch (e: any) {
      setError(e?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: 'google' | 'linkedin' | 'facebook') => {
    setAuth(
      { id: `${provider}-user`, username: `${provider}_user`, provider },
      `${provider}-token-${Date.now()}`
    );
    close();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-center text-3xl font-bold tracking-tight">Join Medium.</h2>

        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <Globe className="h-4 w-4" />
            Sign up with Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('linkedin')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <Briefcase className="h-4 w-4" />
            Sign up with LinkedIn
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('facebook')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <Users className="h-4 w-4" />
            Sign up with Facebook
          </button>

          <button
            type="button"
            onClick={() => {}}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <Mail className="h-4 w-4" />
            Sign up with email
          </button>
        </div>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-xs text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="username" className="text-xs font-medium">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"
                required
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-xs font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-xs font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
              required
              minLength={6}
              className="mt-1"
            />
          </div>

          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            <input type="checkbox" className="rounded border-zinc-300" />
            Remember me for faster sign in
          </label>

          {error && (
            <p className="rounded-lg bg-red-50 p-2 text-xs text-red-600 dark:bg-red-950/50 dark:text-red-400">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : mode === 'signup' ? (
              'Sign up'
            ) : (
              'Sign in'
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {mode === 'signup' ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="font-medium text-zinc-900 underline dark:text-white"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-medium text-zinc-900 underline dark:text-white"
              >
                Sign up
              </button>
            </>
          )}
        </p>

        <p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-400">
          By clicking &quot;{mode === 'signup' ? 'Sign up' : 'Sign in'}&quot;, you
          accept Medium&apos;s Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}