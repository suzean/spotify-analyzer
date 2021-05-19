import React, {useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({token, player}) {
    if(!player) return null;

    return (
        <div styles={{position: "absolute", top: "10px"}}>
            <SpotifyPlayer
            token={token}
            uris={[`${player}`]}
            showSaveIcon={true}
            autoPlay={true}
            initialVolume={10}
            styles={{
                activeColor: 'black',
                bgColor: 'white',
                color: '#black',
                loaderColor: 'black',
                loaderSize: '10',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
              }}

        />
        </div>
        
    )

};