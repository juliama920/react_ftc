import React from 'react'
import './Cards.css'
import Avid from '../Avid/Avid'
import Device from '../Device/Device'
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from 'react';


const Cards = (props) => {
  const avidControls = useAnimationControls();
  const deviceControls = useAnimationControls();

  const ref = useRef(null)
  useEffect(()=> {

    const switchObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const checkHeight = parseInt(window.innerHeight/2 + 80)

          if (entry.boundingClientRect.bottom < checkHeight) {
            deviceControls.start("deviceUp")
            avidControls.start("avidDown")
          } else {
            deviceControls.start("deviceDown")
            avidControls.start("avidUp")
          }
        }
      },
      { 
        rootMargin: "-50% 0px"
      }
    );

    const entryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const checkHeight = parseInt(window.innerHeight/2 + 80)
          if (entry.boundingClientRect.bottom < checkHeight) {
            deviceControls.start("deviceDown", {
              duration: 0.01
            })
            avidControls.start("avidUp", {
              duration: 0.01
            })
          } else {
            deviceControls.start("deviceUp", {
              duration: 0.01
            })
            avidControls.start("avidDown", {
              duration: 0.01
            })
          }
        }
      },
      { 
        threshold: 0 ,
        rootMargin: "50% 0px"
      }
    );

    if (ref.current) {
      switchObserver.observe(ref.current);
      entryObserver.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        switchObserver.unobserve(ref.current)
        entryObserver.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div 
    ref={ref}
    className={props.orientation==='top'?'Cards top':'Cards bottom'}>
      <motion.div
      variants={{
        avidUp: {
            y: 0
        },
        avidDown: {
            y: 160
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