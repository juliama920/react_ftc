import './App.css'
import ParentDevice from './componenets/ParentDevice/ParentDevice';
import DeviceDashboard from './componenets/DeviceDashboard/DeviceDashboard';
import ArrowExample from './componenets/ArrowExample/ArrowExample';
import { useRef } from 'react';

function App() {
  const parentRef = useRef(null)
  return (
    <div className="App">
        <ParentDevice ref={parentRef}/>
        <DeviceDashboard parentDeviceRef={parentRef}/>
        {/* <ArrowExample></ArrowExample> */}
    </div>
  );
}

export default App;
