import React from 'react'
import './ParentDevice.css'
import Gateway from '../../imgs/Gateway_large.png'
import DeviceInfo from '../DeviceInfo/DeviceInfo'

import { GatewayData } from '../../Data/Data'

const ParentDevice = React.forwardRef((props, ref) => {
    return (
        <div className='ParentDevice' id="ParentDevice">
            <img src={Gateway} alt="" ref={ref}/>
            <DeviceInfo
            device={GatewayData.device}
            bandwidth={GatewayData.bandwidth}
            latency={GatewayData.latency}
            status={GatewayData.status}
            />
        </div>
    )
})

export default ParentDevice