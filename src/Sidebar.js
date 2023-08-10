import React, { useEffect } from 'react';
// import firebase 
// import firebase from 'firebase/compat/app';
// import firebase from '@firebase/app';
import "./firebase"
import '@firebase/firestore'
import { useState } from 'react';
import {db,storage} from './firebase';
import { collection, addDoc ,Timestamp} from "firebase/firestore"; 

import firebase from 'firebase/app';
import 'firebase/auth';
// import 'firebase/datastore';
import { doc, setDoc } from "firebase/firestore"; 
// import { firestore} from 'firebase';


import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {Modal} from '@mui/material';

import "./Sidebar.css";
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import AddIcon from '@mui/icons-material/Add';

function Sidebar() {
  
  const [open,setOpen]=useState(false);
  const [uploading,setUploading] = useState(false);
  const [file,setFile]=useState(null);

  const handleClose=()=>{
    setOpen(false);
  }
  const handleOpen=()=>{
    setOpen(true);
  }
  const handleChange=(e)=>{
    if(e.target.files[0]){
      setFile(e.target.files[0]);
    }
  }
  const handleUpload=(event)=>{
    event.preventDefault();
    setUploading(true);
    
    const storageRef = ref(storage,`files/${file.name}`)
    const uploadTask = uploadBytes(storageRef, file).then((snapshot)=>{
      alert("image uploaded");
         console.log(snapshot);
        getDownloadURL(snapshot?.ref).then(async (url) => {
          console.log(url);
          
        
          await addDoc(collection(db,"myfiles"),{
            timestamp:Timestamp.now(),
            filename:file.name,
            fileUrl:url,
            
          })
          
          
      })
      setUploading(false);
      setFile(null);
      setOpen(false);
       })

  }
  return (
    <>
    <Modal open={open} onClose={handleClose} >
        <div className="modal_pop">
          <form action="">
            <div className="modalHeading">
              <h3>Select file you want to upload</h3>
            </div>
            <div className="modalBody">
              {
                uploading ? (<p className='uploading'>Uploading</p>):(
                <>
                 <input type="file" placeholder='Choose File' onChange={handleChange}/>
              <input type="submit" className='post_submit'onClick={handleUpload}/>
                </>
                )
              }
             
            </div>
          </form>
        </div>
      </Modal>
    <div className='sidebar'>
      <div className="sidebar__btn">
        <button onClick={handleOpen}>
            <AddIcon/>
            <span>New</span>
        </button>
      </div>
      <div className="sidebar_options">
        <div className="sidebar_option sidebar_option-Active">
            <MobileScreenShareIcon/>
            <span>My Drive</span>
        </div>
        <div className="sidebar_option">
            <DevicesIcon/>
            <span>Computers</span>
        </div>
        <div className="sidebar_option">
            <PeopleAltIcon/>
            <span>Shared with me</span>
        </div>
        <div className="sidebar_option">
            <QueryBuilderIcon/>
            <span>Recent</span>
        </div>
        <div className="sidebar_option">
            <StarBorderIcon/>
            <span>Starred</span>
        </div>
        <div className="sidebar_option">
            <DeleteOutlineIcon/>
            <span>Trash</span>
        </div>
      </div>
      <hr />
      <div className="sidebar_options">
        <div className="sidebar_option">
            <CloudQueueIcon/>
            <span>Storage</span>
        </div>
        <div className="progress_bar">
            <progress size="tiny" value = "50" max="100"/>
            <span>6.45 GB of 15GB used</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
