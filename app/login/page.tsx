"use client";
import { getProviders, getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login() {
  const [providers, setProviders] = useState<Record<string, any> | undefined>()

  useEffect(() => {
    getProvidersProps().then(providers => setProviders(providers));
  }, []);

  return (
    <div>
      <h1 className="">Hello, Login Page!</h1>
      {providers && Object.values(providers).map((provider) => (
          <button key={provider.name} onClick={() => signIn("spotify", { callbackUrl: "/" })}>
            Login with {provider.name}
          </button>
      ))}
    </div>
  );
}
async function getProvidersProps(): Promise<Record<string, any> | undefined> {
  const provider = await getProviders();
  if(provider)
  return provider;
}