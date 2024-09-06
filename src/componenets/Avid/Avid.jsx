import React from 'react'
import './Avid.css'
import AVID from '../../imgs/edit_system.png'
import DeviceInfo from '../DeviceInfo/DeviceInfo'
import { motion, useScroll, useMotionValueEvent, useMotionValue, useInView } from "framer-motion";
import { useRef } from 'react';
import { useTransform } from 'framer-motion';


const Avid = (data) => {

  return (
    <motion.div

    // variants={{
    //   avidUp: {
    //       y: 0
    //   },
    //   avidDown: {
    //       y: 120
    //   }
    // }}
    // animate= {avidControls}

    className='Avid'>
      <img src={AVID} alt="" className={data.avid_status==='OK'?'':'error-img'}/>
      <DeviceInfo
      user={data.user}
      avid_latency={data.avid_latency}
      avid_status={data.avid_status}
      />
    </motion.div>

  )
}

export default Avid