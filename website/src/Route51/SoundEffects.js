import useSound from "use-sound";
export default function SoundEffects()
{
    const soundUrl = '../Mysterious.mp3';
    const [play] = useSound(soundUrl,{volume:1,loop:true,playbackRate:1,autoplay:true});
}