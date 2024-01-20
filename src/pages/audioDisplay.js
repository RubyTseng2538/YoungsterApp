import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs} from "firebase/firestore";
import { getStorage, ref, getDownloadURL} from "firebase/storage";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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

  const docRef = collection(db, "audio");

const AudioDisplay = () =>{
    const [fileData, setData] = useState("");
    const location = useLocation();
    const pageName = location.state.pagename;
    const page = query(docRef, where("name", "==", pageName));
    useEffect(()=>{
        async function getAudioInfo(){
            const querySnapshot = await getDocs(page);
            async function getStorageInfo(x){
                const storage = getStorage();
                // const url = 'gs://youngster-p.appspot.com/'+ doc
                const fileURL = await getDownloadURL(ref(storage, x));
                setData(fileURL);
            }
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                getStorageInfo(doc.get('link'));
            });
        }
        getAudioInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    console.log(fileData);
    if(!fileData){
        return(
            <div>Loading</div>
        )
    }
    return(
        <div>
            <h1>{pageName}</h1>
            <AudioPlayer
                autoPlay
                src={fileData}
                onPlay={e => console.log("onPlay")}
                // other props here
            />
           </div>
        
        

    )
}
export default AudioDisplay;