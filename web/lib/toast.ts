'use client';

import { toast } from 'sonner';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/* ---------- Toast ---------- */
export const showSuccess = (msg: string, description?: string) =>
  toast.success(msg, { description });

export const showError = (msg: string, description?: string) =>
  toast.error(msg, { description });

export const showInfo = (msg: string, description?: string) =>
  toast.info(msg, { description });

/* ---------- SweetAlert2 Confirm ---------- */
export async function confirmDelete(opts: {
  title?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
}): Promise<boolean> {
  try {
    const itemHtml = opts.itemName
      ? `<p style="color:inherit;opacity:0.7;font-size:13px;margin-top:6px;line-height:1.5;">You are about to delete <strong style="color:inherit;opacity:1;">${escapeHtml(opts.itemName)}</strong>. This action cannot be undone.</p>`
      : `<p style="color:inherit;opacity:0.7;font-size:13px;margin-top:6px;">This action cannot be undone.</p>`;

    const result = await Swal.fire({
      title: opts.title ?? 'Are you sure?',
      html: itemHtml,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: opts.confirmText ?? 'Delete',
      cancelButtonText: opts.cancelText ?? 'Cancel',
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: false,
      heightAuto: false,
      customClass: {
        popup: 'swal-premium-popup',
        confirmButton: 'swal-premium-confirm',
        cancelButton: 'swal-premium-cancel',
        container: 'swal-premium-container',
      },
    });
    return result.isConfirmed;
  } catch (err) {
    console.error('SweetAlert error:', err);
    // Fallback to native confirm if SweetAlert fails
    const fallbackMsg = opts.itemName
      ? `Delete "${opts.itemName}"?`
      : 'Are you sure?';
    return typeof window !== 'undefined' && window.confirm(fallbackMsg);
  }
}

/* ---------- SweetAlert2 Info ---------- */
export async function showAlert(opts: {
  title: string;
  text?: string;
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmText?: string;
}) {
  try {
    await Swal.fire({
      title: opts.title,
      text: opts.text,
      icon: opts.icon ?? 'info',
      confirmButtonText: opts.confirmText ?? 'OK',
      buttonsStyling: false,
      heightAuto: false,
      customClass: {
        popup: 'swal-premium-popup',
        confirmButton: 'swal-premium-confirm',
      },
    });
  } catch (err) {
    console.error('SweetAlert error:', err);
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}