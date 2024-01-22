import { create } from 'zustand';
interface Error {
  message: string;
}
export const useErrorStore = create<Error>((set, get) => (
  {
    message: ''
  }
));