import './App.css'
// import ParentDevice from './componenets/ParentDevice/ParentDevice';
import DeviceDashboard from './componenets/DeviceDashboard/DeviceDashboard';
import ArrowExample from './componenets/ArrowExample/ArrowExample';
import { useRef } from 'react';
import Gateway from './imgs/Gateway_large.png'
import DeviceInfo from './componenets/DeviceInfo/DeviceInfo'
import ReactFlowExample from './componenets/ReactFlowExample/ReactFlowExample';
import EdgeExample from './componenets/EdgeExample/EdgeExample';

import { GatewayData } from './Data/Data'

function App() {
  const parentRef = useRef(null)
  return (
    <div className="App">
        {/* <ParentDevice ref={parentRef}/> */}

        <div className='ParentDevice' id="ParentDevice">
            <img src={Gateway} alt="" ref={parentRef}/>
            <DeviceInfo
            device={GatewayData.device}
            bandwidth={GatewayData.bandwidth}
            latency={GatewayData.latency}
            status={GatewayData.status}
            />
        </div>

        <DeviceDashboard parentDeviceRef={parentRef}/>
        {/* <EdgeExample></EdgeExample> */}
        {/* <ArrowExample></ArrowExample> */}
        {/* <ReactFlowExample></ReactFlowExample> */}
    </div>
  );
}

export default App;
