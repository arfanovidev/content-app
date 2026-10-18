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
    // Skip everything on admin routes
    if (pathname?.startsWith('/admin')) return;

    // Safely check if target/event is editable
    const isEditable = (el: EventTarget | null): boolean => {
      if (!el) return false;

      // If it's a Node, walk up from its element (handles text nodes)
      let element: Element | null = null;
      if (el instanceof Element) {
        element = el;
      } else if (el instanceof Node) {
        element = el.parentElement;
      }

      if (!element) return false;

      // Direct element check
      const tag = element.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return true;

      // isContentEditable check (safe — only on HTMLElement)
      if (
        element instanceof HTMLElement &&
        element.isContentEditable
      ) {
        return true;
      }

      // Walk up ancestors for data-allow-copy / contenteditable
      let parent: Element | null = element.parentElement;
      while (parent) {
        const ptag = parent.tagName;
        if (
          ptag === 'INPUT' ||
          ptag === 'TEXTAREA' ||
          (parent instanceof HTMLElement && parent.isContentEditable) ||
          parent.hasAttribute('data-allow-copy')
        ) {
          return true;
        }
        parent = parent.parentElement;
      }

      // Final check on element itself
      if (element.closest('[data-allow-copy]')) return true;
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
      // Guard: some keyboard events (extensions, IME, media keys) lack `key`
      const rawKey = e.key;
      if (typeof rawKey !== 'string' || rawKey.length === 0) return;
      const k = rawKey.toLowerCase();

      // F12 — DevTools
      if (rawKey === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+Shift+I / J / C — DevTools panels
      if (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+U (view source) / Ctrl+S (save) / Ctrl+P (print)
      if (e.ctrlKey && (k === 'u' || k === 's' || k === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Cmd+Alt+I / J / C — macOS DevTools
      if (e.metaKey && e.altKey && (k === 'i' || k === 'j' || k === 'c')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Cmd+U / S / P — macOS
      if (e.metaKey && (k === 'u' || k === 's' || k === 'p')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // Suppress window.print() from JS
    const originalPrint = window.print;
    window.print = () => {
      /* no-op */
    };

    // Basic devtools-open heuristic
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