import { ModelViewer } from 'react-3d-model-viewer'
import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "./STLGenerator.css"

export default function Viewer(props) {
    useEffect(() => {}, [props.stlUrl]); 

    if (props.stlUrl === '') {
        return (<>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </>)
      }
  return (
        <>
            <ModelViewer width="100%" aspectgRatio="100%" rotationSpeeds={[0,0,0]} initControlPosition={[0, 0, 0.4]} backgroundColor="#ffffff" url={props.stlUrl} />
        </>
  );
}
