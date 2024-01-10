import { Session } from "next-auth"
import { create } from "zustand"

export type UserSession = Session & {
  data: Session | null,
  status: 'authenticated' | 'unauthenticated' | 'loading',
  expires: string
};
export type Action = {
  updateSession: (session: Session) => void;
}


export const userSessionState = create<UserSession & Action>((set) => ({
  data: null,
  status: 'unauthenticated',
  expires: '',
  updateSession: (session) => set(() => ({ data: session })),
}));