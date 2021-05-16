import React, {useEffect, useState } from 'react';

export default function ChosenTrack({ targetSong, token }) {
    const [isChosen, setIsChosen] = useState(false);
   
    useEffect(() => {
        console.log(targetSong);
        if(targetSong.length !== 0) {
            setIsChosen(true);
        }
    },[targetSong])


    
    let render = (
        <div>
            <img src={targetSong.albumUrlBig} alt="album cover" />
            <h2>{targetSong.title}</h2>
            <h3>{targetSong.artist}</h3>
        </div>
    )
   

    return isChosen? render : <h1> *This is where the magic happens* </h1>;

    }

    