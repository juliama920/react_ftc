import React from 'react'
import './DeviceDashboard.css'
import { DevicesData } from '../../Data/Data'
import Cards from '../Cards/Cards'
import { useRef } from 'react'
import Xarrow from 'react-xarrows'


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


const DeviceDashboard = ({parentDeviceRef}) => {
    console.log(parentDeviceRef)
    const cardRef = useRef(null)
    const rows = DevicesData.reduce(function (rows, key, index) { 
        return (index % 5 === 0 ? rows.push([key]) 
          : rows[rows.length-1].push(key)) && rows;
      }, []);


    return (
        <div className='DeviceDashboard' id="DeviceDashboard">
            <InfiniteScrollLoop>
                {rows.map((devices, dev_index)=> {
                    return (
                        <div
                        className='device-row'
                        key={dev_index}>
                            {devices.map((device, id)=>{
                                return (
                                    <>
                                        <Cards
                                        ref={cardRef}
                                        key={id}
                                        user={device.user}
                                        device={device.device}
                                        device_latency={device.device_latency}
                                        avid_latency={device.avid_latency}
                                        warning={device.warning}
                                        device_status={device.device_status}
                                        avid_status={device.avid_status}
                                        orientation={dev_index === 0? 'top': 'bottom'}
                                        />
                                        <Xarrow start={'DeviceDashboard'} end={cardRef} curveness={0} showHead={false} color='green' zIndex={-1} divContainerStyle={{ position: "relative" }} key={id + 'arrow'}></Xarrow>
                                    </>
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