import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react'
import spotifyApi from './spotify';
import { ExtendedUser } from '../api/auth/[...nextauth]/route';

export const useSpotify = () => {
  // const spotifyApi = useMemo(() => new SpotifyWebApi({
  //   clientId: config.spotifyClientId,
  //   clientSecret: config.spotifyClientSecret,
  // }), []);
  
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session && session.user) {
      spotifyApi.setAccessToken((session.user as ExtendedUser).accessToken);
      console.log('useSpotify', status);
    }
  }, [session, status])
  return spotifyApi
}
