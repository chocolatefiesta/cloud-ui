import React, { useContext, useState, useEffect, useReducer } from 'react';
import { UserContext } from '../App/useUser'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import SettingsForm from './SettingsForm';
import "./STLGenerator.css"
import { fiestaCloudBackend } from '../App/config';
import Viewer from './Viewer';

function reducer(state, item) {
  return { ...state, ...item }
}

function sendGenerateSTL(uid, settings) {
  return fetch(fiestaCloudBackend + '/api/stl-generator/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  })
    .catch(error => console.log(error))
    .then(data => {
      if (data) {
        return data.json()
      }
    }
    )
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
      if (mounted && data != null) {
        setStlUrl(data.url)
      }
    });
    return () => mounted = false;
  }, [user_id])

  // if (stlUrl === '') {
  //   return (<>Loading...</>)
  // }

  return (
    <>
      <Container fluid="xl" className="stl-generator-wrapper">
        <Row className="stl-generator-col">
          <Col sm={7}>
            <Viewer stlUrl={stlUrl}></Viewer>
          </Col>
          <Col sm={5} >
            <SettingsForm updateSTL={updateSTL} setStlSettings={setStlSettings} />
          </Col>
        </Row>
        <Row className="stl-generator-col">
          <Col >
            <Button as="a" target="_blank" href={stlUrl} className="control-button" size="lg" variant="primary" download>Скачать STL</Button>
            <Button disabled={true} className="control-button" size="lg" variant="primary">Отправить в печать</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
