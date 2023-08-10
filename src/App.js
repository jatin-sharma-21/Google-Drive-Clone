import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import { useState } from "react";
import {auth,provider} from './firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user,setUser]=useState(null);

  const signIn=()=>{
    signInWithPopup(auth,provider).then((user)=>{
      setUser(user)
    }).catch(error=>{
      alert(error.message);
    })
  }
  return (
    <>
   {
    user ?(
      <>
      <Header photoUrl={user.photoURL}/>
    <div className="App">
      <Sidebar/>
      <Data/>
    </div>
    </>
    ):(
      <div className="loginWrap">
        <img src="https://imgs.search.brave.com/P51fb0-fhc8TJATF6kwKGQmCU2DoraulT8u4UgO91m4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3ZmFmNmNlZjEw/MTRjMGI1ZTQ4Y2Qu/cG5n" alt="" />
        <button onClick={signIn}>Login to Google Drive Clone</button>
      </div>
    )
   }
    
    </>
  );
}

export default App;

