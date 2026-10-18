'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useAuth';
import { useMessages } from '@/hooks/useMessages';
import { useAuthStore } from '@/store/authStore';
import { showSuccess, showError } from '@/lib/toast';

export function LoginForm() {
  const t = useMessages();
  const login = useLogin();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    login.mutate(
      { username, password },
      {
        onSuccess: (data: any) => {
          setAuth(
            {
              id: data.user.id || data.user.username,
              username: data.user.username,
              email: data.user.email,
              role: (data.user.role as 'admin' | 'user') || 'user',
              provider: 'email',
            },
            data.accessToken
          );
          showSuccess('Welcome back!', 'You are now signed in.');
        },
        onError: (err: any) => {
          showError(
            'Sign in failed',
            err?.message || 'Invalid username or password'
          );
        },
      }
    );
  };

  const errorMessage = login.isError
    ? ((login.error as any)?.message || t.admin.loginError)
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">{t.admin.username}</Label>
        <Input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          disabled={login.isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t.admin.password}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={login.isPending}
        />
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 translate-y-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={login.isPending || !username || !password}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {login.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.admin.signingIn}
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" strokeWidth={2.5} />
            {t.admin.signIn}
          </>
        )}
      </button>
    </form>
  );
}