import { Status, User } from "./types";
import { create } from 'zustand';

interface UserStore {
  user: User,
  status: Status,
  error: string | null,
  info: {},
  fetchUser: () => Promise<void>,
}

interface CustomError extends Error {
  statusCode?: number;
}

export const fetchUserStore = create<UserStore>((set, get) => ({
  user: { name: '', email: '', password: '' },
  status: 'default',
  error: null,
  info: {},
  async fetchUser() {
    set({ status: 'loading' })
    try {
      const responseUser = await fetch('localhost:30001/api/v1/chetatam')
      if (!responseUser.ok) throw responseUser
      set({ user: await responseUser.json() })
    } catch (e) {
      let error = e as CustomError;
      // custom error
      set({ error: error.message || error.toString() })
    } finally {
      set({ status: "error" })
    }
  },
})
)