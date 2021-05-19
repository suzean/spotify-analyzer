import axios from 'axios';
import React, {useEffect, useState } from 'react';
import ChosenTrack from './ChosenTrack';
import PlaylistGenerator from './PlaylistGenerator';






export default function Dashboard({token}) {
    const [songs, setSongs] = useState([]);
    const [timeRange, setTimeRange] = useState("short_term");
    const [chosenSong, setChosenSong] = useState([]);
    const [userName, setUserName] = useState("");
    const [hello, setHello] = useState([]);
    const [topOrRecent, setTopOrRecent] = useState("top");
    const [isDisabled, setIsDisabled] = useState(false)
    
    useEffect(() =>{

        axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setUserName(res.data.display_name);
        }).catch(err => {
            console.log(err);
        })


            if(topOrRecent === "top") {
                setIsDisabled(false);

                axios.get( `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, {
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
                window.history.back()
            })
            }

            if(topOrRecent === "recent") {
                setIsDisabled(true);

                axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=10", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                setSongs(res.data.items.map(j => {
                    return {
                        artist: j.track.artists[0].name,
                        title: j.track.name,
                        uri: j.track.uri,
                        albumUrl: j.track.album.images[2].url,
                        albumUrlBig: j.track.album.images[1].url,
                        id: j.track.id,
                        preview: j.track.preview_url
                    }
                }))
            }).catch(err => {
                console.log(err);
            })

            }
            

            
        

        
    },[ topOrRecent,timeRange, token, ])


    
    return (
        <div className="main-dashboard">
            <h1 className="main-title"> Track Analyzer </h1>
            <h3>{userName}</h3>
            <div className="main-glass">
                <section className="top-track-section">
                <h2 className="top-track-title"> Your Top 10 Tracks</h2>
                    <form className="top-track-form">
                        <label>
                            Pick an option:
                            <select value={topOrRecent} onChange={e => setTopOrRecent(e.target.value)}>
                            <option value="top"> Top </option>
                            <option value="recent"> Recent </option>    
                            </select>
                        </label>
                <label>
                    Pick a time frame: 
                    <select value={timeRange} disabled={isDisabled} onChange={e => setTimeRange(e.target.value)}>
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
                <PlaylistGenerator token={token} targetSong={chosenSong}/>
                </section>
            </div>
        </div>
    )
}