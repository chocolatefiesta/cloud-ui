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

function fetchRetry(url, options = {}, retries = 3) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) return res.json()
      if (retries > 0) {
        return fetchRetry(url, options, retries - 1)
      } else {
        throw new Error(res)
      }
    })
    .catch(error => {
      if (retries > 0) {
        return fetchRetry(url, options, retries - 1)
      } else {
        throw new Error(error)
      }
    }
    )
}

function sendGenerateSTL(uid, settings) {
  return fetchRetry(fiestaCloudBackend + '/api/stl-generator/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  })
    .catch(error => console.log(error))
    .then(data => data)
}

export default function STLGenerator() {
  const { user } = useContext(UserContext);
  const user_id = user.user.uid;
  const [stlUrl, setStlUrl] = useState('');
  const [stlSettings, setStlSettings] = useReducer(reducer, {});

  function updateSTL() {
    setStlUrl('');
    sendGenerateSTL(user_id, stlSettings).then(data => { if (data) setStlUrl(data.url) });
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

  return (
    <>
      <Container fluid="xl" className="stl-generator-wrapper">
        <Row>
          <Col sm={7}>
            <Viewer stlUrl={stlUrl}></Viewer>
          </Col>
          <Col sm={5} >
            <SettingsForm updateSTL={updateSTL} setStlSettings={setStlSettings} />
          </Col>
        </Row>
        <Row>
          <Col >
            <Button as="a" target="_blank" href={stlUrl} className="control-button" size="lg" variant="primary" download>Скачать STL</Button>
            <Button disabled={true} className="control-button" size="lg" variant="primary">Отправить в печать</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}