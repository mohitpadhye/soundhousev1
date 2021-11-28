import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="flex flex-col bg-spotifyDark h-screen justify-center items-center">
        <p className='text-white text-lg m-5'>Welcome to Sound House. Log in with Spotify to see what the world is listening to.</p>
        <p className='text-white text-lg m-5'>For the input fields, feel free to use a fake name, email, and a bogus password. Just make sure you remember it!</p>
      <form className='flex flex-col'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First Name"
          type="text"
          className='bg-cardColor rounded-full px-3 py-3 m-1 text-center text-white'
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className='bg-cardColor rounded-full px-3 py-3 m-1 text-center text-white'
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className='bg-cardColor rounded-full px-3 py-3 m-1 text-center text-white'
        />

        <button type="submit" onClick={loginToApp} className="bg-spotifyGreen hover:bg-buttonHover transition duration-300 ease-in-out text-white rounded-full mt-3 px-5 py-3 hover:no-underline">
          Sign In
        </button>
      </form>

      <p className='text-white'>
        Not a member?{" "}
        <button className="bg-spotifyGreen hover:bg-buttonHover transition duration-300 ease-in-out text-white rounded-full px-5 py-3 hover:no-underline mt-5 mx-5" type='submit' onClick={register}>
        Register Now</button>
      </p>
    </div>
  );
}

export default Login;