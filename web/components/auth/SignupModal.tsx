'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { showSuccess, showError } from '@/lib/toast';

const GOOGLE_CLIENT_ID =
  '164350739467-0nn2q915pvsambvg2noh6g4tvul3rngl.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (el: HTMLElement, opts: any) => void;
        };
      };
    };
  }
}

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
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    if (!googleBtnRef.current) return;

    const renderGoogle = () => {
      if (!window.google || !googleBtnRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          try {
            const res = await api.post('/auth/google', {
              idToken: response.credential,
            });

            const data = res.data;
            setAuth(
              {
                id: data.user?.sub ?? data.user?.email ?? 'user',
                username: data.user?.username ?? 'user',
                email: data.user?.email,
                avatar: data.user?.picture,
                role: (data.user?.role as 'admin' | 'user') || 'user',
                provider: 'google',
              },
              data.accessToken,
            );

            showSuccess('Welcome!', `Signed in as ${data.user?.email}`);
            close();
          } catch (err: any) {
            setError(err?.message || 'Google login failed');
            showError('Google login failed', err?.message);
          }
        },
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        width: 360,
        text: 'signup_with',
        shape: 'pill',
      });
    };

    if (window.google) {
      renderGoogle();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = renderGoogle;
      document.head.appendChild(script);
    }
  }, [open, setAuth, close]);

  if (!open) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signin') {
        const res = await api.post('/auth/login', {
          username: email || username,
          password,
        });

        const backendRole = (res.data.user?.role as 'admin' | 'user') || 'user';

        setAuth(
          {
            id: res.data.user?.id ?? res.data.user?.username ?? 'user',
            username: res.data.user?.username ?? email.split('@')[0],
            email: res.data.user?.email ?? email,
            role: backendRole,
            provider: 'email',
          },
          res.data.accessToken,
        );
        showSuccess('Welcome back!', 'Signed in successfully');
      } else {
        const res = await api.post('/auth/signup', {
          username,
          email,
          password,
        });
        setAuth(
          {
            id: res.data.user?.id ?? res.data.user?.username ?? 'user',
            username: res.data.user?.username ?? username,
            email: res.data.user?.email ?? email,
            role: 'user',
            provider: 'email',
          },
          res.data.accessToken,
        );
        showSuccess('Account created!', 'Welcome aboard');
      }
      close();
    } catch (e: any) {
      setError(e?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
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

        <h2 className="text-center text-3xl font-bold tracking-tight">
          {mode === 'signup' ? 'Join Medium.' : 'Welcome back.'}
        </h2>

        <div className="mt-6 flex justify-center">
          <div ref={googleBtnRef} />
        </div>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-xs text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <Label htmlFor="username" className="text-xs font-medium">
                Username
              </Label>
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
            <Label htmlFor="email" className="text-xs font-medium">
              {mode === 'signup' ? 'Email' : 'Username or Email'}
            </Label>
            <Input
              id="email"
              type={mode === 'signup' ? 'email' : 'text'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={mode === 'signup' ? 'you@example.com' : 'admin or you@example.com'}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-xs font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="mt-1"
            />
          </div>

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
      </div>
    </div>
  );
}