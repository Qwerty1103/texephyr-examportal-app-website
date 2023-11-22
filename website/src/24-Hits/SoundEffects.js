
import useSound from "use-sound";
export default function SoundEffects()
{
    const soundUrl = './battle.mp3';
    const [play] = useSound(soundUrl,{volume:1,loop:true,playbackRate:0.8,autoplay:true});
}