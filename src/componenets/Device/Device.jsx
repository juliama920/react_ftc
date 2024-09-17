import React from 'react'
import './Device.css'
import ECM from '../../imgs/ecm_back_perspective.svg'
import DeviceInfo from '../DeviceInfo/DeviceInfo'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { useXarrow } from 'react-xarrows'

const Device = forwardRef((data, ref) => {
    const updateXarrow = useXarrow();
    // console.log("device: ")
    // console.log(ref)
    return (
        <div className='Device'>
            <img src={ECM} ref={ref} style={{filter:"hue-rotate(90deg);"}} onScroll={updateXarrow} alt="" className={data.device_status==='OK'?'':'error-img'}/>
            <DeviceInfo
            device={data.device}
            bandwidth={data.bandwidth}
            device_latency={data.device_latency}
            warning={data.warning}
            device_status={data.device_status}
            />
        </div>
    )
})

export default Device