'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Blocks (public routes only):
 *  - Right-click context menu
 *  - Text selection / copy / cut / drag
 *  - DevTools shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+P)
 *  - Print
 *  - Basic devtools-open heuristic
 *
 * Skips on:
 *  - /admin/* routes (Quill editor needs full input access)
 *  - Editable elements (INPUT, TEXTAREA, contenteditable, [data-allow-copy])
 */
export function ContentProtection() {
  const pathname = usePathname();

  useEffect(() => {
    // ✅ Skip everything on admin routes
    if (pathname?.startsWith('/admin')) return;

    const isEditable = (el: EventTarget | null): boolean => {
      const node = el as HTMLElement | null;
      if (!node) return false;

      if (
        node.tagName === 'INPUT' ||
        node.tagName === 'TEXTAREA' ||
        node.isContentEditable
      ) {
        return true;
      }

      let parent = node.parentElement;
      while (parent) {
        if (
          parent.tagName === 'INPUT' ||
          parent.tagName === 'TEXTAREA' ||
          parent.isContentEditable ||
          parent.hasAttribute('data-allow-copy')
        ) {
          return true;
        }
        parent = parent.parentElement;
      }

      if (node.closest('[data-allow-copy]')) return true;
      return false;
    };

    const onContextMenu = (e: MouseEvent) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };
    const onCopy = (e: ClipboardEvent) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };
    const onCut = (e: ClipboardEvent) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };
    const onSelectStart = (e: Event) => {
      if (isEditable(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.ctrlKey && (k === 'u' || k === 's' || k === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.metaKey && e.altKey && (k === 'i' || k === 'j' || k === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      if (e.metaKey && (k === 'u' || k === 's' || k === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const originalPrint = window.print;
    window.print = () => {
      /* no-op */
    };

    let devtoolsOpen = false;
    const threshold = 160;
    const checkDevtools = () => {
      const widthDelta = window.outerWidth - window.innerWidth;
      const heightDelta = window.outerHeight - window.innerHeight;
      const open = widthDelta > threshold || heightDelta > threshold;
      if (open && !devtoolsOpen) {
        devtoolsOpen = true;
        document.documentElement.setAttribute('data-devtools', 'open');
      } else if (!open && devtoolsOpen) {
        devtoolsOpen = false;
        document.documentElement.removeAttribute('data-devtools');
      }
    };

    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCut);
    document.addEventListener('dragstart', onDragStart);
    document.addEventListener('selectstart', onSelectStart);
    document.addEventListener('keydown', onKeyDown, true);

    const interval = window.setInterval(checkDevtools, 800);

    return () => {
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCut);
      document.removeEventListener('dragstart', onDragStart);
      document.removeEventListener('selectstart', onSelectStart);
      document.removeEventListener('keydown', onKeyDown, true);
      window.clearInterval(interval);
      window.print = originalPrint;
    };
  }, [pathname]);

  return null;
}