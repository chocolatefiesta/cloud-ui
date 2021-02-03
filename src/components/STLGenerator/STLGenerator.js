import React, { useContext, useState, useEffect, useReducer } from 'react';
import { UserContext } from '../App/useUser'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ModelViewer } from 'react-3d-model-viewer'
import SettingsForm from './SettingsForm';
import "./STLGenerator.css"
import { fiestaCloudBackend } from '../App/config';

function reducer(state, item) {
  return { ...state, ...item }
}

function sendGenerateSTL(uid, settings) {
  return fetch(fiestaCloudBackend + '/api/stl-generator/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
    .catch(error => console.log(error))
    .then(data => data.json())
}

export default function STLGenerator() {
  const { user } = useContext(UserContext);
  const user_id = user.user.uid;
  const [stlUrl, setStlUrl] = useState('');
  const [stlSettings, setStlSettings] = useReducer(reducer, {});

  function updateSTL() {
    setStlUrl('');
    sendGenerateSTL(user_id, stlSettings).then(data => setStlUrl(data.url));
  }

  useEffect(() => {
    let mounted = true;
    sendGenerateSTL(user_id, {}).then(data => {
      if (mounted) {
        setStlUrl(data.url)
      }
    });
    return () => mounted = false;
  }, [user_id])

  if (stlUrl === '') {
    return (<>Loading...</>)
  }

  return (
    <>

        <Row className="stl-generator-wrapper">
          <Col className="stl-generator-col">
            <Row>
              <ModelViewer width="100%" aspectgRatio="100%" rotationSpeeds={[0,0,0]} initControlPosition={[0, 0, 0.4]} backgroundColor="#ffffff" url={stlUrl} />
            </Row>
            <Row>
              <Button as="a" target="_blank" href={stlUrl} className="control-button" size="lg" variant="primary" block download>Скачать STL</Button>
              <Button disabled={true} className="control-button" variant="primary" block>Отправить в печать</Button>
            </Row>
          </Col>
          <Col className="stl-generator-col">
            <SettingsForm updateSTL={updateSTL} setStlSettings={setStlSettings} />
          </Col>
        </Row>

    </>
  );
}
