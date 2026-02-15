import { useEffect, useRef } from "react";

const Hero = () => {
    const videoRef = useRef();

    //we need DOM access after component mounts to modify the video playback rate.
    useEffect(() => {
        if(videoRef.current){
            videoRef.current.playbackRate = 2;
        }
    }, []);

    return (

        <section id="hero">
            <div>
                <h1>MacBook Pro</h1>
                <img src="/title.png" alt="MacBook Title"/>
            </div>

            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline/>

            <button>Buy</button>
            <p>From $1599 or $133/mo for 12 months</p>
        </section>
    );
}


export default Hero;