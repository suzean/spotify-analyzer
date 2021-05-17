import axios from 'axios';
import React, {useEffect, useState } from 'react';
import NewChart from './NewChart';
import Player from './Player';




export default function ChosenTrack({ targetSong, token }) {
    const [isChosen, setIsChosen] = useState(false);
    const [songID, setSongID] = useState();
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [audio, setAudio] = useState('');
   
    useEffect(() => {
        // console.log(targetSong);
        if(targetSong.length !== 0) {
            setIsChosen(true);
            setSongID(targetSong.id)
        };

        if(songID !== undefined) {
            axios.get(`https://api.spotify.com/v1/audio-features/${songID}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                
                setAudioFeatures(res.data);
            }).catch(err => {
                console.log(err);
            })
        }

        setAudio(new Audio(targetSong.preview));
        

    },[targetSong, songID])

    
    
    let render = (
        <div className="track-analysis" >
            <h1 className="track-header"> Your Choice! </h1>
            <img className="track-albumCover" src={targetSong.albumUrlBig} alt="album cover" />
            <p className="track-title">{targetSong.title}</p>
            <p className="track-artist">{targetSong.artist}</p>
            <button onMouseEnter={() => audio.play()} onMouseOut={() => audio.pause()}> Snippet </button>
            
            {/* <Player token={token} player={targetSong.uri} /> */}

            <NewChart audio={audioFeatures}/>
    

        </div>
    )
   

    return isChosen? render : <h1> *This is where the magic happens* </h1>;

    }

    