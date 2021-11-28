import React from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=fa944ccfaef84336993533dadd2ef4e6&response_type=code&redirect_uri=https://soundhousev1.netlify.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Authorize() {

    return (
        <div className='flex flex-col bg-spotifyDark h-screen justify-center items-center'>
            <p className='text-white mb-5'>To go to your dashboard, click the button below to authenticate with Spotify. Don't worry, all sensitive data is handled on
            the server and never stored anywhere.</p> 
            <a data-aos='fade-down' data-aos-delay='900' className="bg-spotifyGreen hover:bg-buttonHover transition duration-300 ease-in-out text-white rounded-full px-5 py-3 hover:no-underline" href={AUTH_URL}>
                Login With Spotify
            </a>
        </div>
    )
}
