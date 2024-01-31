import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import YouTube from 'react-youtube';
import getYouTubeID from 'get-youtube-id';

const firebaseConfig = {
    apiKey: "AIzaSyDwCZ_ulcO61Ic0aQlNjnhR8oR9jaVzxTk",
    authDomain: "youngster-p.firebaseapp.com",
    projectId: "youngster-p",
    storageBucket: "youngster-p.appspot.com",
    messagingSenderId: "254927360049",
    appId: "1:254927360049:web:25c1be08ea17eaaea34510",
    measurementId: "G-VVEG3FZSCG"
  
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const docRef = collection(db, "video");

const VideoDisplay = () =>{
    const [doc, setDoc] = useState("");
    const location = useLocation();
    const pageName = location.state.pagename;
    const page = query(docRef, where("name", "==", pageName));
    useEffect(()=>{
        async function getVideoInfo(){
            const querySnapshot = await getDocs(page);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setDoc(getYouTubeID(doc.get('link')));
                console.log(doc.get('link'));
            });
        }
        getVideoInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const opts = {
        height: '350px',
        width: '90%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0
        },
      };

    return(
        <div>
            <h1>{pageName}</h1>
            <div className='video-wrapper'>
            <YouTube videoId={doc} opts={opts} />
            </div>
        </div>
        
    )
}
export default VideoDisplay;