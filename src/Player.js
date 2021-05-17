import React, {useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({token, player}) {
    if(!player) return null;

    return (
        <div>
            <SpotifyPlayer
        token={token}
        uris={[`${player}`]}
        />
        </div>
        
    )

};