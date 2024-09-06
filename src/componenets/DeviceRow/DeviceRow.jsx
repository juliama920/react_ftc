import React from 'react'
import Avid from '../Avid/Avid'
import Device from '../Device/Device'
import { motion, useScroll, useMotionValueEvent, useMotionValue, useInView, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect } from 'react';

import './DeviceRow.css'

const DeviceRow = (props) => {
    const [orientation, setOrientation] = useState(props.orientation)
    // console.log(orientation)
    const avidControls = useAnimationControls();
    const deviceControls = useAnimationControls();
    const ref = useRef(null)
    const isInView = useInView(ref)

    // console.log(props.scrollY)
    // console.log(props.scrollYProgress)
    // console.log(props.scrollYProgress.latest)

    useEffect(()=>{
        console.log("here")
        // const div = ref.current.parentElement.parentElement
        var cards = document.querySelectorAll('.device-row').forEach((card) => {
            console.log(card)
          console.log(card.scrollTop)
        })
        console.log( document.querySelectorAll('.device-row'))
        // Array.prototype.forEach(cards, (card) => {
        //   console.log(card)
        // });
        // console.log(document.body.scrollHeight)
        // div.addEventListener('scroll', switchOrientation(ref.current))
        // console.log("is in view ", isInView)
    } , [isInView])

    return (
        <div 
        className='device-row'
        ref={ref}
        >
            {props.devices.map((device, id)=>{
                return (
                    <div 
                    key={id}
                    className={orientation==='top'?'Cards top':'Cards bottom'}
                    >
                    
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
                        user={device.user}
                        avid_latency={device.avid_latency}
                        avid_status={device.avid_status}
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
                        device={device.device}
                        bandwidth={device.bandwidth}
                        device_latency={device.device_latency}
                        warning={device.warning}
                        device_status={device.device_status}
                        />
                
                    </motion.div>
                    </div>


                    
                    // <Cards
                    // className={dev_index%2 === 0? 'top': 'bottom'}
                    // key={id}
                    // user={device.user}
                    // device={device.device}
                    // device_latency={device.device_latency}
                    // avid_latency={device.avid_latency}
                    // warning={device.warning}
                    // device_status={device.device_status}
                    // avid_status={device.avid_status}
                    // orientation={dev_index%2 === 0? 'top': 'bottom'}
                    // // scrollYProgress={scrollYProgress}
                    // />
                )
            })}
        </div>
    )
}

export default DeviceRow