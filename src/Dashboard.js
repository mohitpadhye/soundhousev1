import { useState, useEffect } from "react";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node"
import Feed from "./Feed";
import { db } from "./firebase";
import firebase from "firebase";
import Header from "./Header";
import rectangle from "./rectangle.png";

const spotifyApi = new SpotifyWebApi({
    clientId: "fa944ccfaef84336993533dadd2ef4e6",
  })

function Dashboard({code}) {
    const accessToken = useAuth(code)
    const user = useSelector(selectUser);
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
      }, [accessToken])

    const [playingTrack, setPlayingTrack] = useState('Nothing Fetched Right Now')
    const [art, setArt] = useState(rectangle)
    const [artist, setArtist] = useState('No Artist')

    // function needs to send updated info to database
    function getNowPlaying() {
        spotifyApi.getMyCurrentPlaybackState().then(function(data) {
        if (data.body && data.body.is_playing) {
            setArtist(data.body.item.artists[0].name)
            setPlayingTrack(data.body.item.name)
            setArt(data.body.item.album.images[0].url)
        }
        })
        setTimeout(getNowPlaying, 10000)
    }

    useEffect(() => {
        db.collection("activeUsers").doc(user.displayName).set({
            name: user.displayName,
            description: user.email,
            song: playingTrack,
            artisto: artist,
            picture: art,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
      }, [playingTrack, artist, art, user.email, user.displayName])

    return (
        <div className="h-screen scrollbar-hide">
                <Header/>
                <div className="grid grid-cols-3 bg-spotifyDark justify-start items-start">
                    <div className='flex flex-col bg-cardColor h-auto rounded-2xl mt-10 max-w-xs p-5 text-white ml-10'>
                        <h1 className='font-black'>You're Playing:<h1 className='text-spotifyGreen font-black'>{playingTrack}</h1></h1>
                        <button className="bg-spotifyGreen hover:bg-buttonHover transition duration-300 ease-in-out text-white rounded-full px-5 py-3 hover:no-underline mt-5" onClick={getNowPlaying}>
                        Refresh</button>
                    </div>
                    <Feed />
                </div>
        </div>
    )
}

export default Dashboard
