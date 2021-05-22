import React from "react";


export default function Login() {
  const location = window.location.href
  console.log(location);

  const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=1e3e995ec8cb42969e081568d4bb6a74&response_type=token&redirect_uri=${location}&state=123&show_dialog=true&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state%20user-read-playback-state%20user-read-recently-played%20playlist-modify-public%20user-top-read%20user-library-modify%20user-library-read%20`;


  return <div className="main-login">
      <h1 className="title-login"> Track Analyzer</h1>
      <a className="btn-login" href={AUTH_URL}> Login with <span>Spotify</span> </a>
  </div>;
}
