import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Player from './Player';
import SpotifyPlayer from "react-spotify-web-playback";



export default function PlaylistGenerator({token, targetSong}) {
    const [newPlaylist, setNewPlaylist] = useState([]);
    const [tempo, setTempo] = useState();
    const [playerUri, setPlayerUri] = useState('');

 
    useEffect(() => {

        if(targetSong !== undefined) {
            

            axios.get(`https://api.spotify.com/v1/audio-features/${targetSong.id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                setTempo(res.data.tempo)
            }).catch(err => {
                console.log(err);
            })
        }

    

    }, [targetSong, token])


    const handlePlaylist =(e) => {
        axios.get(`https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${targetSong.id}&min_tempo=${tempo - 10}&max_tempo=${tempo + 10}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(res => {
            setNewPlaylist(res.data.tracks.map(track => {
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[2].url,
                    id: track.id,
                    preview: track.preview_url
                }
            }));
            
            
        }).catch(err => {
            console.log(err);
        })

    }


    
   



    return (
        <>
        <h1>New Playlist Generator </h1>
        <Player token={token} player={playerUri}/>

        <p> The below button generates a playlist based solely on the tempo and genre of the chosen track</p>
        <button onClick={handlePlaylist}> Start </button>
        
        <div>
            <ul>
            {/* <Player token={token} player={playerUri}/> */}
        {newPlaylist.map(song => {
            const audio = new Audio(song.preview);

            let render;
            if(song.preview === null) {
                render = <button> No preview! </button>
            }
            if (song.preview) {
                render = <button onMouseEnter={() => audio.play()} onMouseLeave={() => audio.pause()}> preview </button>
            }
            return (
                <>
                <li key={song.id}>
                    <div>
                        <img src={song.albumUrl}/>
                    </div>
                    <div>
                        <p>{song.title}</p>
                        <p>{song.artist}</p>
                        {render}
                        <button onClick={() => setPlayerUri(song.uri)}> click me</button>
                        
                    </div>
                </li>
                </>
            )
        })}
        </ul>
        </div>
        </>
    )


};