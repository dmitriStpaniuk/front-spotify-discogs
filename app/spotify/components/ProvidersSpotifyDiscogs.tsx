import { getProviders, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export const ProvidersSpotifyDiscogs = () => {
  const [providers, setProviders] = useState<Record<string, any> | undefined>();
  useEffect(() => {
    if (!providers) {
      getProvidersProps().then((providers) => setProviders(providers));
    }
  }, [providers]);
  return (
    <>
    {providers &&
      Object.values(providers).map((provider) => (
        <button
          key={provider.name}
          onClick={() => signIn("spotify", { callbackUrl: "/" })}
        >
          Login with {provider.name}
        </button>
      ))}
    </>
  )
}

async function getProvidersProps(): Promise<Record<string, any> | undefined> {
  const provider = await getProviders();
  if (provider) return provider;
}