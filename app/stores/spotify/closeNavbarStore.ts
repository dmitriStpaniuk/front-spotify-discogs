import { create } from "zustand";
interface Navbar {
  isOpen: boolean;
  toggleIsOpen: (value: boolean) => void;
}
 
 export const useNavbarStore = create<Navbar>((set) => ({
  isOpen:true,
  toggleIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
 }))