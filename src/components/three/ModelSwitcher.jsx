import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import { useGSAP } from "@gsap/react";


//helper fns
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
    if(!group) return;

    group.traverse((child) => {
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION })
        }
    })
}

const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION})
}

const ModelSwitcher = ({scale, isMobile}) => {

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMacbook = scale === 0.08 || scale === 0.05;

    useGSAP(() => {
        if(showLargeMacbook){
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        }else{
            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

        fadeMeshes(smallMacbookRef.current, 1);
        fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale]);

    //controlsConfig obj, how we move around 3D models
    const controlsConfig = {
        snap: true,
        speed: 1,
        zoom: 1,
        azimuth: [-Infinity, Infinity],
        config: {mass:1, tension:0, friction:26}
    }

    return(
        <>
           <PresentationControls {...controlsConfig}>
             <group ref={largeMacbookRef}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08}/>
             </group>
           </PresentationControls>

           <PresentationControls>
             <group ref={smallMacbookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
             </group>
           </PresentationControls>
        </>
    )
}

export default ModelSwitcher;




/*It will handle the transitions btw two different
models.
It will be responsible for rendering both MacBooks
14 and 16, detecting the size from the user UI, and
animating transitions btw the two models using GSAP.
It will also implement something known as presentation
controls, which will allow users to rotate and inspect
the MacBook in 3D.

*/

