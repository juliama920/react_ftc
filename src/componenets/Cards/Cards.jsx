import React from 'react'
import './Cards.css'
import Avid from '../Avid/Avid'
import Device from '../Device/Device'
import { motion, useAnimationControls } from "framer-motion";
import { useRef, useEffect, forwardRef } from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows'


const Cards = forwardRef((props, ref) => {
  const updateXarrow = useXarrow()
  const avidControls = useAnimationControls();
  const deviceControls = useAnimationControls();

  const cardRef = useRef(null)
  // const avidRef = useRef()
  // const deviceRef = useRef(ref)
  // console.log("Cards: ")
  // console.log(ref)
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

    if (cardRef.current) {
      switchObserver.observe(cardRef.current);
      // entryObserver.observe(cardRef.current)
    }
    return () => {
      if (cardRef.current) {
        switchObserver.unobserve(cardRef.current)
        // entryObserver.unobserve(cardRef.current)
      }
    }
  }, [])


  return (
    <div 
    ref={cardRef}
    className={props.orientation==='top'?'Cards top':'Cards bottom'}>
      <Xwrapper>
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
        transition={{ease:'easeOut'}}
        onAnimationEnd={updateXarrow}
        >
          <Avid 
          user={props.user}
          avid_latency={props.avid_latency}
          avid_status={props.avid_status}
          // ref={avidRef}
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
        transition={{ease:'easeOut'}}
        id={props.device + props.user}
        onAnimationEnd={updateXarrow}
        >
          <Device 
          device={props.device}
          bandwidth={props.bandwidth}
          device_latency={props.device_latency}
          warning={props.warning}
          device_status={props.device_status}
          // ref={deviceRef}
          ref={ref}
          />

        </motion.div>

        {/* <Xarrow start={avidRef} end={deviceRef} curveness={0} showHead={false} color='green' startAnchor={"middle"} zIndex={-1} divContainerStyle={{ position: "relative" }}></Xarrow> */}

      </Xwrapper>
    </div>
  )
})

export default Cards