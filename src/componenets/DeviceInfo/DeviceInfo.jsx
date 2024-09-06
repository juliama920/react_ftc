import React from 'react'
import './DeviceInfo.css'
import addStyles from '../../HelperMethods/functions.js'

const DeviceInfo = (props) => {
    return (
        <div className='DeviceInfo'>
            {props.user?<p>{props.user}'s WFM system</p>: ''}
            {props.device?<p>{props.device}</p>: ''}
            {props.bandwidth?<p>Current Bandwidth: {props.bandwidth} Mbps</p>: ''}
            {props.data_latency?<p>Latency: {props.data_latency} ms</p>: <p>Latency: NA</p>}
            {props.warning?<p className='status-banner warning'>{props.warning}</p>: ''}
            {props.avid_status?
                <p className={addStyles(props.avid_status)}>{props.avid_status}</p>: 
                <p className={addStyles(props.device_status)}>{props.device_status}</p>}
        </div>
    )
}

export default DeviceInfo