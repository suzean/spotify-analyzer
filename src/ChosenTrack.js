import axios from 'axios';
import React, {useEffect, useState } from 'react';
import NewChart from './NewChart';
// import Player from './Player';




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
            <div className="box">
            <img className="track-albumCover" src={targetSong.albumUrlBig} alt="album cover" />
            <p className="track-title">{targetSong.title}</p>
            <p className="track-artist">{targetSong.artist}</p>
            {/* <button onMouseEnter={() => audio.play()} onMouseOut={() => audio.pause()}> Snippet </button> */}
            <img src="headphones-3.svg" onMouseEnter={() => audio.play()} onMouseOut={() => audio.pause()} ></img>
            </div>

            <div className="box">
                <NewChart audio={audioFeatures}/>

                <ul className="analysis-list">
                    <li className="analysis-item 1">
                        {/* Danceability */}
                        <img src="activity-2.svg" />
                        <p>
                        Describes how suitable a track is for dancing based on a combination of 
                        musical elements including tempo, rhythm stability, beat strength, and overall regularity.
                        </p>
                        </li>
                    <li className="analysis-item 2">
                        {/* Valence */}
                        Describes the musical positiveness conveyed by a track. Tracks with high valence 
                        sound more positive, while tracks with low valence sound more negative.
                        </li>
                    <li className="analysis-item 3">
                        {/* Tempo */}
                        The overall estimated tempo of a track in beats per minute (BPM). 
                        In musical terminology, tempo is the speed or pace of a given piece, and derives directly from the average beat duration.
                        </li>
                    <li className="analysis-item 4">
                        {/* Acousticness */}
                        A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
                        </li>
                    <li className="analysis-item 5">
                        {/* Energy */}
                        Represents a perceptual measure of intensity and activity. 
                        Typically, energetic tracks feel fast, loud, and noisy.
                        </li>
                    <li className="analysis-item 6">
                        {/* Liveness */}
                        Detects the presence of an audience in the recording. 
                        Higher liveness values represent an increased probability that the track was performed live.
                        </li>
                </ul>
            </div>

            
    

        </div>
    )
   

    return isChosen? render : <h1 className="waiting"> *This is where the magic happens* </h1>;

    }

    