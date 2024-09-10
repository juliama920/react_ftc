import React from 'react'
import './DeviceDashboard.css'
import { DevicesData } from '../../Data/Data'
import Cards from '../Cards/Cards'
import { motion, useScroll, useMotionValueEvent, useMotionValue, useInView } from "framer-motion";
import { useRef } from 'react';
import { useTransform } from 'framer-motion';
import Device from '../Device/Device';
import Avid from '../Avid/Avid';
import { useState } from 'react';
import { useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import DeviceRow from '../DeviceRow/DeviceRow';



function InfiniteScrollLoop({
    surroundingBackup = 4,
    outerStyle,
    innerStyle,
    children
}) {
    const contentRef = React.useRef(null);
    const scrollRef = React.useRef(null);
    const [height, setHeight] = React.useState(0);

    const backupHeight = height * surroundingBackup;

    const handleScroll = React.useCallback(() => {
        if (scrollRef.current) {
            const scroll = scrollRef.current.scrollTop;
            if (scroll < backupHeight || scroll >= backupHeight + height) {
                scrollRef.current.scrollTop = backupHeight + (scroll % height);
            }
        }
    }, [height,backupHeight]);

    React.useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.offsetHeight);
            scrollRef.current.scrollTop = backupHeight;
        }
    });

    return (
        <div className="infinite-scroll-loop-outer" style={outerStyle}>
            <div
                className="infinite-scroll-loop-inner"
                ref={scrollRef}
                style={{
                    height,
                    ...innerStyle
                }}
                onScroll={handleScroll}
            >
                {Array(surroundingBackup)
                    .fill()
                    .map((_, index) => (
                        <div key={`before-${index}`}>{children}</div>
                    ))}
                <div ref={contentRef}>{children}</div>
                {Array(surroundingBackup)
                    .fill()
                    .map((_, index) => (
                        <div key={`after-${index}`}>{children}</div>
                    ))}
            </div>
        </div>
    );
}


const DeviceDashboard = () => {
    const rows = DevicesData.reduce(function (rows, key, index) { 
        return (index % 5 === 0 ? rows.push([key]) 
          : rows[rows.length-1].push(key)) && rows;
      }, []);

      const avidControls = useAnimationControls();
      const deviceControls = useAnimationControls();
      const ref = useRef(null)
      const isInView = useInView(ref)
      
      // console.log(props.scrollY)
      // console.log(props.scrollYProgress)
      // console.log(props.scrollYProgress.latest)
    
    //   useEffect(()=>{
    //     console.log("here")
    //     // const div = ref.current.parentElement.parentElement
    //     // var cards = document.querySelectorAll('.Cards').forEach((card) => {
    //     //   console.log(card.scrollTop)
    //     // })
    //     // Array.prototype.forEach(cards, (card) => {
    //     //   console.log(card)
    //     // });
    //     // console.log(document.body.scrollHeight)
    //     // div.addEventListener('scroll', switchOrientation(ref.current))
    //     // console.log("is in view ", isInView)
    //   } , [isInView])

    // const targetRef = useRef(null);
    // const { scrollYProgress } = useScroll();
    // // const { scrollYProgress } = useScroll({
    // //     target: targetRef,
    // //     // offset: ["start end", "end start"],
    // // });
    // console.log(scrollYProgress)
    // useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //     console.log(latest)
    // })

    // const background = useTransform(scrollYProgress, [0,1], ["#FFF", "#6366F1"])
    
    // const [orientation, setOrientation] = useState('up')
    // // console.log(orientation)
    // const avidControls = useAnimationControls();
    // const deviceControls = useAnimationControls();
    // const ref = useRef(null)
    // const isInView = useInView(ref) 
    // console.log(props.scrollY)

    // useEffect(()=>{
    //     console.log(ref)
    //   console.log("here")
    // //   const div = ref.current.parentElement.parentElement
    // //   console.log(div)
    // //   div.addEventListener('scroll', switchOrientation(ref.current))
    //   // console.log("is in view ", isInView)
    //   console.log(isInView)
    //   if (isInView) {
    //     orientation==='top'? deviceControls.start("deviceUp"):deviceControls.start("deviceDown");
    //     orientation==='bottom'? avidControls.start("avidUp"):avidControls.start("avidDown");
    //     setOrientation(orientation==='top'?'bottom':'top')
    //   }
    // } , [isInView])

    // const switchOrientation = () => {
    //   console.log("in switch")
    //   // if (isInView) {
    // //   orientation==='top'? deviceControls.start("deviceUp"):deviceControls.start("deviceDown");
    // //   orientation==='bottom'? avidControls.start("avidUp"):avidControls.start("avidDown");
    // //   setOrientation(orientation==='top'?'bottom':'top')
    //   // }
    // }

    const scrollFunc = () => {
        console.log(document.querySelectorAll('.DeviceDashboard')[0].scrollTop)
        console.log(document.querySelectorAll('.DeviceDashboard')[0].scroll)
        // const switchHeight = document.querySelectorAll('.device-row')[0].scrollHeight + parseInt('12vh')
        const switchHeight = 953
        console.log(switchHeight)
        // console.log(document.querySelectorAll('.DeviceDashboard')[0].scrollTop % switchHeight)

        if (document.querySelectorAll('.DeviceDashboard')[0].scrollTop % switchHeight === 0) {
            console.log("switch")
        }

    }

    return (
        <div className='DeviceDashboard' 
        // ref={targetRef}
        // onScroll={scrollFunc}
        >
            <InfiniteScrollLoop>
                {rows.map((devices, dev_index)=> {
                    return (
                        // <DeviceRow 
                        // className={dev_index%2 === 0? 'top': 'bottom'}
                        // devices = {devices}
                        // key={dev_index}
                        // // user={device.user}
                        // // device={device.device}
                        // // device_latency={device.device_latency}
                        // // avid_latency={device.avid_latency}
                        // // warning={device.warning}
                        // // device_status={device.device_status}
                        // // avid_status={device.avid_status}
                        // orientation={dev_index%2 === 0? 'top': 'bottom'}
                        // // scrollYProgress={scrollYProgress}
                        // />
                        <div
                        // ref={ref}
                        // ref={targetRef}
                        // style={{background}} 
                        className='device-row'
                        key={dev_index}>
                            {devices.map((device, id)=>{
                                // setOrientation(dev_index%2 === 0? 'top': 'bottom')
                                return (
                                    // <div 
                                    // key={id}
                                    // className={dev_index%2 === 0? 'Cards top': 'Cards bottom'}>
                                    
                                    //   <motion.div
                                    //   variants={{
                                    //     avidUp: {
                                    //         y: 0
                                    //     },
                                    //     avidDown: {
                                    //         y: 200
                                    //     }
                                    //   }}
                                    //   animate= {avidControls}
                                    //   transition={{ease:'backInOut'}}
                                    //   >
                                    //     <Avid 
                                    //     user={device.user}
                                    //     avid_latency={device.avid_latency}
                                    //     avid_status={device.avid_status}
                                    //     />
                                    //   </motion.div>
                                    //   <motion.div
                                    //   variants={{
                                    //     deviceUp: {
                                    //         y: -270
                                    //     },
                                    //     deviceDown: {
                                    //         y: 0
                                    //     }
                                    //   }}  
                                    //   animate= {deviceControls}
                                    //   transition={{ease:'backInOut'}}
                                    //   >
                                    //     <Device 
                                    //     device={device.device}
                                    //     bandwidth={device.bandwidth}
                                    //     device_latency={device.device_latency}
                                    //     warning={device.warning}
                                    //     device_status={device.device_status}
                                    //     />
                                
                                    //   </motion.div>
                                    // </div>


                                    
                                    <Cards
                                    // className={dev_index%2 === 0? 'top': 'bottom'}
                                    key={id}
                                    user={device.user}
                                    device={device.device}
                                    device_latency={device.device_latency}
                                    avid_latency={device.avid_latency}
                                    warning={device.warning}
                                    device_status={device.device_status}
                                    avid_status={device.avid_status}
                                    orientation={dev_index === 0? 'top': 'bottom'}
                                    // scrollYProgress={scrollYProgress}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </InfiniteScrollLoop>
        </div>
    )


}

export default DeviceDashboard