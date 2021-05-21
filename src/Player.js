import React, {useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({token, player}) {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [player])

    return (
        <div className="spotify-player">
            <SpotifyPlayer
            token={token}
            uris={[`${player}`]}
            showSaveIcon
            callback={state => {
                if(!state.isPlaying) setPlay(false)
            }}
            play={play}
            initialVolume={10}
            styles={{
                activeColor: '#fff',
                bgColor: 'black',
                color: '#fff',
                loaderColor: '#fff',
                sliderColor: '#1cb954',
                trackArtistColor: '#ccc',
                trackNameColor: '#fff',
              }}

        />
        </div>
        
    )

};