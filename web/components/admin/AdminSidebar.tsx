'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useLogout } from '@/hooks/useAuth';
import { useMessages } from '@/hooks/useMessages';

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const logout = useLogout();
  const t = useMessages();

  const items: NavItem[] = [
    {
      label: t.admin.dashboard,
      href: ROUTES.ADMIN,
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: t.admin.content,
      href: ROUTES.ADMIN_CONTENT_NEW.replace('/new', ''),
      icon: FileText,
    },
    {
      label: t.admin.categories,
      href: ROUTES.ADMIN_CATEGORIES,
      icon: FolderOpen,
    },
  ];

  const isActive = (item: NavItem) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="flex w-full flex-col gap-6 border-r border-border/40 bg-card/40 p-4 sm:w-64 sm:min-h-[calc(100vh-4rem)]">
      <div className="hidden sm:block">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          {t.admin.backToSite}
        </Link>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto sm:flex-col">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              ].join(' ')}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto sm:pt-6">
        <button
          type="button"
          onClick={logout}
          className="inline-flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          <span>{t.admin.logout}</span>
        </button>
      </div>
    </aside>
  );
}