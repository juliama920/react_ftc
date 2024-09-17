import React from 'react'
import './DeviceDashboard.css'
import { DevicesData } from '../../Data/Data'
import Cards from '../Cards/Cards'
import { useRef } from 'react'
import Xarrow from 'react-xarrows'
import { useEffect } from 'react'
import {useXarrow} from 'react-xarrows'


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

    const updateXarrow = useXarrow();
    // console.log(parentDeviceRef.current)
    const cardRef = useRef(null)
    const rows = DevicesData.reduce(function (rows, key, index) { 
        return (index % 5 === 0 ? rows.push([key]) 
          : rows[rows.length-1].push(key)) && rows;
    }, []);

    // const arrowRef = arrowRef
    const handleArrowScroll = () =>{
        updateXarrow();
    }
    
    // const [edges, setEdges] = useState([]);
    // useEffect(()=> {
    //     const addEdge = (elementIndex) => {
    //         setEdges((prevEdges) => [...prevEdges, `Edge-${elementIndex}`])
    //     };

    //     const removeEdge = (elementIndex) => {
    //         setEdges((prevEdges) => prevEdges.filter(edge => edge !== `Edge-${elementIndex}`));
    //     };

    //     const observerCallback = (entries) => {
    //         entries.forEach(entry => {
    //             const index = entry.target.getAttribute('data-index');
    //             if (entry.isIntersecting) {
    //                 addEdge(index);
    //             } else {
    //                 removeEdge(index);
    //             }
    //         })
    //     }

    //     const observer = new IntersectionObserver(observerCallback, {
    //         threshold: 0.5
    //     });
    //     cardRef.current.forEach(ref => {
    //         if (ref) observer.observe(ref)
    //     })
    //     return () => {
    //         cardRef.current.forEach(ref=> {
    //             if (ref) observer.unobserve(ref)
    //         })
    //     }
    // })


    return (
        <div className='DeviceDashboard' id="DeviceDashboard" onScroll={handleArrowScroll}>
            {/* <InfiniteScrollLoop> */}
                {rows.map((devices, dev_index)=> {
                    return (
                        <div
                        className='device-row'
                        key={dev_index}>
                            {devices.map((device, id)=>{
                                return (
                                    <div
                                    key={id}
                                    id={id}
                                    >
                                        <Cards
                                        ref={cardRef}
                                        user={device.user}
                                        device={device.device}
                                        device_latency={device.device_latency}
                                        avid_latency={device.avid_latency}
                                        warning={device.warning}
                                        device_status={device.device_status}
                                        avid_status={device.avid_status}
                                        orientation={dev_index === 0? 'top': 'bottom'}
                                        />
                                        <Xarrow start={parentDeviceRef} end={cardRef} startAnchor="middle" curveness={0} showHead={false} color='yellow' zIndex={10000} divContainerStyle={{ position: "relative" }} strokeWidth={2}></Xarrow>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            {/* </InfiniteScrollLoop> */}
        </div>
    )
}

export default DeviceDashboard