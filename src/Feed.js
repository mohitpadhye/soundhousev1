import { useState, useEffect } from "react"
import { db } from "./firebase";
import Post from './Post'

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("activeUsers")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) =>
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            )
          );
      }, []);

    return (
        <div className='flex-grow h-screen pb-44 pt-5 overflow-y-auto scrollbar-hide'>
          <h1 className='font-black text-spotifyGreen ml-5'>House Feed:</h1>
            {posts.map(({ id, data: { name, description, song, artisto, timestamp, picture} }) => (
            <Post
                key={id}
                name={name}
                description={description}
                artisto={artisto}
                song={song}
                timestamp={timestamp}
                picture={picture}
            />
            ))}
        </div>
    )
}

export default Feed
