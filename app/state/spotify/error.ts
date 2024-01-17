import { create } from 'zustand';
interface Error {
  message: string;
}
export const errorStore = create<Error>((set, get) => (
  {
    message: ''
  }
));