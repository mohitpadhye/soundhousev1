import React, { forwardRef } from 'react'

const Post = forwardRef(({ name, description, song, artisto, timestamp, picture }, ref) => {
    return (
      <div ref={ref} className="flex flex-col bg-cardColor rounded-xl m-5 p-5">
          <div className="flex flex-row justify-start items-start">
            <img src={picture} alt='' className='w-40 h-40 mr-5'/>
            <div className="flex flex-col">
              <p className='text-spotifyGreen font-black flex flex-row pb-5'>{name} <p className='text-white pl-2 font-light'> is listening to: </p></p>
              <p className='text-white font-black'>{song}</p>
              <p className='text-white'>By: {artisto}</p>
              <br/>
              <p className='text-white font-light'>A Few Seconds Ago...</p>
            </div>
          </div>
      </div>
    );
  });
  
  export default Post;
