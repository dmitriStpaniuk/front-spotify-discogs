// import { useSpotify } from "@/app/lib/useSpotify";
// import { useSession } from "next-auth/react";
// import React, { useEffect, useState } from "react";

// export const SavedUserAlbums = () => {
//   const [albums, setAlbums] = useState<SpotifyApi.UsersSavedTracksResponse>();
//   const { data: session, status } = useSession();
//   const spotifyApi = useSpotify();
//   useEffect(() => {
//     if (spotifyApi.getAccessToken()) {
//       spotifyApi
//       .getMySavedTracks({
//         limit:5,
//         offset:0,
//       })
//       .then((data) => setAlbums(data.body))
//       .catch(err => console.log(`Album error ${err}`));
//     }
//   }, [session, status, spotifyApi]);
//   console.log(albums);
//   return <div>Album</div>;
// };
