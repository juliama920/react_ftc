import React from 'react'
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows'
import Draggable from 'react-draggable'
import { useRef } from 'react'

const boxStyle = {
    border: "grey solid 2px",
    borderRadius: "10px",
    padding: "5px",
    height: "20px"
}

const DraggableBox = ({id}) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div id={id} style={boxStyle}>
                {id}
            </div>
        </Draggable>
    )
}

const ArrowExample = () => {
  const box1Ref= useRef(null);
  return (
    <div
    style={{ 
        display: "flex",
        justifyContent: "space-evenly",
        width: "100%"
    }}
    >
        <Xwrapper>
            <DraggableBox id={'elem1'}></DraggableBox>
            <DraggableBox id={'elem2'}></DraggableBox>
            <Xarrow start={'elem1'} end="elem2" curveness="0" showHead={false} color='green'></Xarrow>
        </Xwrapper>
    </div>
  )
}

export default ArrowExample