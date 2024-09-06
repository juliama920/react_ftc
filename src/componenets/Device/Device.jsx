import React from 'react'
import './Device.css'
import ECM from '../../imgs/ecm_back_perspective.svg'
import DeviceInfo from '../DeviceInfo/DeviceInfo'

import { motion } from 'framer-motion'

const Device = (data) => {
    return (
        <div className='Device'>
            <img src={ECM} alt="" className={data.device_status==='OK'?'':'error-img'}/>
            <DeviceInfo
            device={data.device}
            bandwidth={data.bandwidth}
            device_latency={data.device_latency}
            warning={data.warning}
            device_status={data.device_status}
            />
        </div>
    )
}

export default Device