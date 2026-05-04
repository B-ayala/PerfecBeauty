import { create } from 'zustand';
import type { NotificationItem } from '@/types';
import { generateId } from '@/utils/format';

interface NotificationState {
  queue: NotificationItem[];
  push: (n: Omit<NotificationItem, 'id'>) => void;
  dismiss: (id: string) => void;
  clear: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  queue: [],
  push: (n) =>
    set((state) => ({
      queue: [...state.queue, { id: generateId('notif'), durationMs: 4000, ...n }],
    })),
  dismiss: (id) =>
    set((state) => ({ queue: state.queue.filter((item) => item.id !== id) })),
  clear: () => set({ queue: [] }),
}));
