import React, { useState, useEffect, useRef } from 'react';
import Xarrow from 'react-xarrows';
import {useXarrow} from 'react-xarrows'

const EdgeExample = () => {
  const [edges, setEdges] = useState([]);  // Edges state to hold visible elements
  const elementRefs = useRef([]);  // Refs for elements to observe
  const targetRef = useRef(null);  // Ref for the target element

  const updateXarrow = useXarrow();

  useEffect(() => {
    // Function to add edge when element enters the viewport
    const addEdge = (elementIndex) => {
      setEdges((prevEdges) => [...prevEdges, elementIndex]);
    //   console.log('add edge')
    //   console.log(elementIndex)
    };

    // Function to remove edge when element exits the viewport
    const removeEdge = (elementIndex) => {
      setEdges((prevEdges) => prevEdges.filter(index => index !== elementIndex));
    //   console.log('remove edge')
    //   console.log(elementIndex)
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        const index = entry.target.getAttribute('data-index');
        if (entry.isIntersecting) {
          addEdge(index);  // Add edge when element enters the view
        } else {
          removeEdge(index);  // Remove edge when element exits the view
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    elementRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);  // Start observing each element
    });

    return () => {
      elementRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);  // Cleanup observer on unmount
      });
    };
  }, []);

  const handleArrowScroll = () =>{
    updateXarrow();
    console.log("here")
}

  return (
    <div style={{ height: '200vh', overflow:'scroll' }} onScroll={()=> {console.log('here')}}>
      <h2>Scroll to Add/Remove Edges</h2>

      {/* The target element to connect divs to */}
      <div
        id="target-element"
        ref={targetRef}
        style={{
          position: 'fixed',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: '100px',
          backgroundColor: 'lightcoral',
          textAlign: 'center',
          lineHeight: '100px',
        }}
      >
        Target
      </div>

      <div style={{ marginTop: '150px' }}>
        {/* Divs that will connect to the target */}
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            id={`element-${index}`}  // Each element needs a unique ID for Xarrow
            data-index={index}
            ref={el => elementRefs.current[index] = el}
            style={{
              height: '100px',
              margin: '200px 0',
              backgroundColor: 'lightblue',
              textAlign: 'center',
              lineHeight: '100px',
            }}
          >
            Element {index + 1}
          </div>
        ))}
      </div>

      {/* Render arrows using Xarrow based on which elements are visible */}
      {edges.map((index) => (
        <Xarrow
          key={index}
          start={`element-${index}`}  // ID of the start element (div)
          end="target-element"        // ID of the target element
          color="black"
          strokeWidth={2}
          curveness={0}
        />
      ))}
    </div>
  );
};

export default EdgeExample