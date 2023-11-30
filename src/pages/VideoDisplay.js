import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import ReactPlayer from 'react-player';

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
    const [doc, setDoc] = useState([]);
    const location = useLocation();
    const pageName = location.state.pagename;
    const page = query(docRef, where("name", "==", pageName));
    useEffect(()=>{
        async function getVideoInfo(){
            const querySnapshot = await getDocs(page);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                setDoc(doc.get('link'));
                console.log(doc.get('link'))
            });
        }
        getVideoInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <div>
            <h1>{pageName}</h1>
            <div className='video-wrapper'>
                <ReactPlayer className="react-player"
                width="90%"
                height="100%"
                url={doc}
                controls="true" />
            </div>
        </div>
        
    )
}
export default VideoDisplay;