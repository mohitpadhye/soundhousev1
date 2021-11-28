import React, { useEffect } from "react";
import Login from './Login';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import OAuth from "./OAuth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName
          })
        );
      } else {
        // user is logged out
        dispatch(logout());
      }
    });
  }, );

  return (
    <>
    {!user ? <Login/> : <OAuth />}
    </>
  );
}

export default App;
