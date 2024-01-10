import { getServerSession } from "next-auth";
import { Sidebar } from "./components/Sidebar";

export default async function  Home() {
  // const session = await getServerSession(authConfig)
  return (
    <div>
      <main className="">
        <Sidebar />
      </main>
    </div>
  );
}
