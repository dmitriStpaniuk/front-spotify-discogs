import { useErrorStore } from "@/app/stores/spotify/errorStore";

export const checkError = (e: any) => {
  if (e instanceof Error) {
    useErrorStore.setState({ message: e.message });
  }
}