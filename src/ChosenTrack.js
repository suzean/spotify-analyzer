import axios from 'axios';
import React, {useEffect, useState } from 'react';
import NewChart from './NewChart';




export default function ChosenTrack({ targetSong, token }) {
    const [isChosen, setIsChosen] = useState(false);
    const [songID, setSongID] = useState();
    const [audioFeatures, setAudioFeatures] = useState([]);
    const [audio, setAudio] = useState('');
   
    useEffect(() => {
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
                        <img src="smile-2.svg" />
                        <p>
                        Describes the musical positiveness conveyed by a track. Tracks with high valence 
                        sound more positive, while tracks with low valence sound more negative.
                        </p>
                        </li>
                    <li className="analysis-item 3">
                        {/* Tempo */}
                        <img src="speaker.svg" />
                        <p>
                        The overall estimated tempo of a track in beats per minute (BPM). 
                        In musical terminology, tempo is the speed or pace of a given piece.
                        </p>
                        </li>
                    <li className="analysis-item 4">
                        {/* Acousticness */}
                        <img src="mic-2.svg" />
                        <p>
                        A confidence measure of whether the track is acoustic.
                        </p>
                        </li>
                    <li className="analysis-item 5">
                        {/* Energy */}
                        <img src="battery-charging.svg" />
                        <p>
                        Represents a perceptual measure of intensity and activity. 
                        Typically, energetic tracks feel fast, loud, and noisy.
                        </p>
                        </li>
                    <li className="analysis-item 6">
                        {/* Liveness */}
                        <img src="user-check-2.svg" />
                        <p>
                        Detects the presence of an audience in the recording. 
                        Higher liveness values represent an increased probability that the track was performed live.
                        </p>
                        </li>
                </ul>
            </div>
        </div>
    )
   

    return isChosen? render : <h1 className="waiting"> *This is where the magic happens* </h1>;

    }

    