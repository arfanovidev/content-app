'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Mail, Briefcase, Users, Loader2 } from 'lucide-react';
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
          prompt: () => void;
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

  // Load Google Identity Services + render button
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
                provider: 'google',
              },
              data.accessToken
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

    // Load script if not present
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
          username: email.split('@')[0] || username,
          password,
        });
        setAuth(
          {
            id: res.data.user?.username ?? 'user',
            username: res.data.user?.username ?? email.split('@')[0],
            email,
            provider: 'email',
          },
          res.data.accessToken
        );
        showSuccess('Welcome back!', 'Signed in successfully');
      } else {
        // Backend signup not implemented — use fallback
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
        showSuccess('Account created!', 'Welcome aboard');
      }
      close();
    } catch (e: any) {
      setError(e?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthPlaceholder = (provider: 'linkedin' | 'facebook') => {
    showError(
      `${provider} login`,
      'Coming soon — use Google or email for now'
    );
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
          Join Medium.
        </h2>

        {/* Google button — REAL */}
        <div className="mt-6 flex justify-center">
          <div ref={googleBtnRef} />
        </div>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          <span className="text-xs text-zinc-400">or</span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Other OAuth — placeholder */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleOAuthPlaceholder('linkedin')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <Briefcase className="h-4 w-4" />
            Sign up with LinkedIn
          </button>

          <button
            type="button"
            onClick={() => handleOAuthPlaceholder('facebook')}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          >
            <Users className="h-4 w-4" />
            Sign up with Facebook
          </button>
        </div>

        {/* Email form */}
        <form onSubmit={handleEmailAuth} className="mt-4 space-y-3">
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
              Email
            </Label>
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