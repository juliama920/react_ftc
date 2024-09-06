import React from 'react'
import './Cards.css'
import Avid from '../Avid/Avid'
import Device from '../Device/Device'
import { motion, useScroll, useMotionValueEvent, useMotionValue, useInView, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect } from 'react';

// const FramerPostionHook = () => {
//   const ref = React.useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end end"],
//   });
//   const [hookedYPostion, setHookedYPosition] = React.useState(0);
//   useMotionValueEvent(scrollYProgress, "change", (latest) => {
//     setHookedYPosition(latest);
//   })

//   return  (<>
//   scrollYProgress.current: {scrollYProgress.current}<br/>
//   scrollYProgress.hookedYPostion: {hookedYPostion}<br/>
//   </>)
// }

const Cards = (props) => {
  // const ref = useRef(null);
  // const { scrollYProgress } = useScroll();
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  // });


  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   console.log(latest)
  // })
  
  // const isInView = useInView(ref, {amount: "all"})

  // useEffect(()=>{
  //   console.log(`The element ${isInView? "is" :"is NOT"} in view`)
  // }, [isInView])
  

  // const targetRef = useRef(null);

  // const rotate = useTransform(scrollYProgress, [0,1], ["0deg", "360deg"])

  const [orientation, setOrientation] = useState(props.orientation)
  // console.log(orientation)
  const avidControls = useAnimationControls();
  const deviceControls = useAnimationControls();
  const ref = useRef(null)
  const isInView = useInView(ref)

  // console.log(props.scrollY)
  // console.log(props.scrollYProgress)
  // console.log(props.scrollYProgress.latest)

  const [isHalfway, setIsHalfway] = useState(false)

  useEffect(() => {
    console.log("here")
    const observer = new IntersectionObserver(intersectEvent, {root:document.body})
  }, []);

  const intersectEvent = () => {
    console.log("in intersect")
  }

  // useEffect(()=>{
  //   console.log("here")
  //   // const div = ref.current.parentElement.parentElement
  //   // var cards = document.querySelectorAll('.Cards').forEach((card) => {
  //   //   console.log(card.scrollTop)
  //   // })
  //   // Array.prototype.forEach(cards, (card) => {
  //   //   console.log(card)
  //   // });
  //   // console.log(document.body.scrollHeight)
  //   // div.addEventListener('scroll', switchOrientation(ref.current))
  //   // console.log("is in view ", isInView)
  // } , [isInView])

  // const switchOrientation = () => {
  //   console.log("in switch")
  //   // if (isInView) {
  //   orientation==='top'? deviceControls.start("deviceUp"):deviceControls.start("deviceDown");
  //   orientation==='bottom'? avidControls.start("avidUp"):avidControls.start("avidDown");
  //   setOrientation(orientation==='top'?'bottom':'top')
  //   // }
  // }

  return (
    <div 
    ref={ref}
    // style={{
    //   opacity: scrollYProgress,
    //   rotate
    // }}
    // initial={{
    //   opacity: 0,
    // }}
    // whileInView={{
    //   opacity:1,
    // }}
    // viewport={{
    //   amount:"all"
    // }}
    className='Cards'>
      <motion.div
      variants={{
        avidUp: {
            y: 0
        },
        avidDown: {
            y: 200
        }
      }}
      animate= {avidControls}
      transition={{ease:'backInOut'}}
      >
        <Avid 
        user={props.user}
        avid_latency={props.avid_latency}
        avid_status={props.avid_status}
        />
      </motion.div>
      <motion.div
      variants={{
        deviceUp: {
            y: -270
        },
        deviceDown: {
            y: 0
        }
      }}  
      animate= {deviceControls}
      transition={{ease:'backInOut'}}
      >
        <Device 
        device={props.device}
        bandwidth={props.bandwidth}
        device_latency={props.device_latency}
        warning={props.warning}
        device_status={props.device_status}
        />

      </motion.div>
    </div>
  )
}

export default Cards