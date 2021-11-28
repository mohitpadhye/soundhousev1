import React from 'react'
import { logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { db } from "./firebase";

export default function Header() {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const logoutOfApp = () => {
        db.collection("activeUsers").doc(user.displayName).set({
            name: user.displayName,
            description: user.email,
            song: null,
            artisto: null,
            picture: null,
            timestamp: null
          });
        db.collection("activeUsers").doc(user.displayName).delete()
        dispatch(logout());
        auth.signOut();
    };


    return (
        <header className='flex items-center w-full justify-items-start bg-spotifyDark'>
            <h1 className="flex items-center justify-start text-2xl text-white font-black m-10">
                Welcome to Sound House,&ensp;{user.displayName}
            </h1>
            <button className="absolute right-0 bg-spotifyGreen hover:bg-buttonHover transition duration-300 ease-in-out text-white rounded-full px-5 py-3 hover:no-underline mt-5 mx-10" onClick={logoutOfApp}>Logout</button>
        </header>
    )
}
