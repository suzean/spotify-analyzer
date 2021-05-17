import axios from 'axios';
import React, {useEffect, useState } from 'react';
import ChosenTrack from './ChosenTrack';
import { useLocation} from "react-router-dom";






export default function Dashboard({token}) {
    const [songs, setSongs] = useState([]);
    const [timeRange, setTimeRange] = useState("short_term");
    const [chosenSong, setChosenSong] = useState([]);
    
    useEffect(() =>{
        axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setSongs(res.data.items.map(track => {
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[2].url,
                    albumUrlBig: track.album.images[1].url,
                    id: track.id,
                    preview: track.preview_url
                }
            }))
        }).catch(err => {
            console.log(err);
            // document.location.href = '/' 
        }).then(() => {
            // window.location.reload()
        })
    },[ timeRange, token])

    
    return (
        <div className="main-dashboard">
            <h1 className="main-title"> Track Analyzer </h1>
            <div className="main-glass">
                <section className="top-track-section">
                <h2 className="top-track-title"> Your Top 10 Tracks</h2>
                <form className="top-track-form">
                <label>
                    Pick a time frame: 
                    <select value={timeRange} onChange={e => setTimeRange(e.target.value)}>
                        <option value="short_term">Short</option>
                        <option value="medium_term">Medium</option>
                        <option value="long_term">Long</option>
                    </select>
                    </label>
                </form>

                <div className="top-track-container">
                <ul className="top-track-list">
                   {songs.map(song => {
                       return (
                           <>
                           <div className="wrapper">
                                <li className="top-track-item" key={song.id}>
                                  <div className="top-track-img">
                                      <img src={song.albumUrl}/>
                                  </div>
                                  <div className="top-track-text">
                                  <p className="top-track-name">{song.title}</p>
                                  <p className="top-track-artist">{song.artist}</p>
                                  </div>
                                  
                                </li> 
                                 <div className="btn-container">
                                      <button onClick={() => setChosenSong(song)}className="btn-start"> Analyze </button>
                                    </div>
                            </div>
                                  </>    
                       )
                   })}
                        </ul>
                    </div>
                </section>
                <section className="song-section">
                <ChosenTrack targetSong={chosenSong} token={token} />
             
                </section>
                <section className="playlist-section">
                3
                </section>
            </div>
        </div>
    )
}