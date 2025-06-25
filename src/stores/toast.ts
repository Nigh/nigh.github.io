import { writable } from 'svelte/store';

export const toast = writable({ show: false, message: '', type: 'info' });

export function showToast(message: string, type = 'info', timeout = 2000) {
  toast.set({ show: true, message, type });
  setTimeout(() => toast.set({ show: false, message: '', type }), timeout);
}
