import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WebcamView = (props) => {
  const videoRef = useRef();
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [hasMicAccess, setHasMicAccess] = useState(false);

  useEffect(() => {
    let stream;

    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setHasCameraAccess(true);
        setHasMicAccess(true);
      } catch (error) {
        console.error('Failed to get user media:', error);
        setHasCameraAccess(false);
        setHasMicAccess(false);
       // window.alert('Camera access is blocked. Please allow camera access to continue.');
      }
    };

    getMedia();

    if(!hasCameraAccess || !hasMicAccess) {
      toast.error("Please grant camera and microphone access to continue.");
      
      if(props.setBlock){
      props.setBlock(true)
      }
    }
    if(hasCameraAccess && hasMicAccess){
      if(props.setBlock){
      props.setBlock(false);
      }
    }
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [hasCameraAccess]);

  
  

  return (
    <video
      ref={videoRef}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '200px',
        height: '150px',
      }}
      muted
    />
  );
};

export default WebcamView;
