import React from 'react'
import './Cards.css'
import Avid from '../Avid/Avid'
import Device from '../Device/Device'
import { motion, useScroll, useMotionValueEvent, useMotionValue, useInView, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect } from 'react';


const Cards = (props) => {
  const avidControls = useAnimationControls();
  const deviceControls = useAnimationControls();

  const ref = useRef(null)
  useEffect(()=> {

    const observer = new IntersectionObserver(
      ([entry]) => {
        // hello

        console.log("new")
        console.log("here")
        if (entry.isIntersecting) {
          const checkHeight = parseInt(window.innerHeight/2 + 80)

          console.log("check height: " + checkHeight)
          // console.log("check Height: " + checkHeight)
          // console.log("y: " + entry.boundingClientRect.top + window.scrollY)
          console.log(entry.target)
          console.log(entry.boundingClientRect)
          // console.log("y: " + entry.boundingClientRect.bottom)
          // if (entry.target.classList.contains("top")) {
          //   entry.target.classList.replace("top","bottom");
          //   deviceControls.start("deviceUp")
          //   avidControls.start("avidDown")
          // } else if (entry.target.classList.contains("bottom")) {
          //   entry.target.classList.replace("bottom","top")
          //   deviceControls.start("deviceDown")
          //   avidControls.start("avidUp")
          // }

          if (entry.boundingClientRect.bottom < checkHeight) {
              deviceControls.start("deviceUp")
              avidControls.start("avidDown")
          } else {
              deviceControls.start("deviceDown")
              avidControls.start("avidUp")
          }
        }

        // console.log(entry.target.children)
        // const cards = document.querySelectorAll(".Cards").forEach((card)=> {
          // console.log(entry)
          // console.log(card)
          // console.log(card.getBoundingClientRect())
          // const checkValue = card.getBoundingClientRect().top + window.scrollY // y value coord
          // const checkValue = card.getBoundingClientRect().y
          // console.log(checkValue < checkHeight)
          // console.log(card.getBoundingClientRect().bottom < checkHeight && entry.intersectionRect.bottom != 0)
          // if (checkValue < checkHeight) {
          //   // card.classList.add("up")
          //   setIsTop(true)
          // } else {
          //   // card.classList.remove("up")
          //   setIsTop(false)
          // }
          // console.log(isTop)


          // card.classList.toggle("up", checkValue < checkHeight)

      },
      { 
        // threshold: 0.5 ,
        rootMargin: "-50% 0px"
      }
    );

    const entryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const checkHeight = parseInt(window.innerHeight/2 + 80)

          console.log("check height: " + checkHeight)
          console.log(entry.target)
          console.log(entry.boundingClientRect)

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

    // Run the logic once on component load
    // if (ref.current) {
    //   console.log("ran")
    //   // const entry = ref.current.getBoundingClientRect();
    //   // console.log(ref.current.classList)
    //   if (ref.current.classList.contains("top")) {
    //     deviceControls.start("deviceDown")
    //     avidControls.start("avidUp")
    //   } else if (ref.current.classList.contains("bottom")) {
    //     deviceControls.start("deviceUp")
    //     avidControls.start("avidDown")
    //   }
    // }
    if (ref.current) {
      observer.observe(ref.current);
      entryObserver.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
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