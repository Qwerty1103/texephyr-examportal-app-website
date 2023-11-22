
import useSound from "use-sound";
import Index from "./Index";
import { useState } from "react";


export default function SoundEffects()
{
    // const soundUrl = './texraces.mp3';
    // const [play] = useSound(soundUrl,{volume:0.07,loop:true,playbackRate:1,autoplay:true,interrupt: true});

    const [state,setSate]=useState(false)
    const soundUrl = './texraces.mp3';
    const [play, { stop, isPlaying }] = useSound(soundUrl,{volume:1,loop:true,playbackRate:1,autoplay:true,interrupt: true});

    function music()
    {
        if(state)
            play()
        else
            stop()
    }
    return (
        <button
        onClick={()=>{setSate(!state);music()}}
        style={{width:'40px',height:'40px'}}
      />
    );

}

