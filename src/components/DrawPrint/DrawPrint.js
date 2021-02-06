import React, { useContext, useState, useEffect, useReducer } from 'react';
import { UserContext } from '../App/useUser'
import Plot from 'react-plotly.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SettingsForm from './SettingsForm';
import { storageUserDrawingGcodeRef } from '../App/firebase'
import { fiestaCloudBackend } from '../App/config';

function reducer(state, item) {
  return { ...state, ...item }
}

function getUserDrawingPlot(uid, settings) {
  return fetch(fiestaCloudBackend + '/api/user/' + uid + "/drawing/", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  })
    .then(data => data.json())
}

function getGcodeUrl(uid) {
  return storageUserDrawingGcodeRef(uid).getDownloadURL()
    .catch(function (error) {
      console.log(error)
    })
}

export default function DrawPrint() {
  const { user } = useContext(UserContext);
  const user_id = user.user.uid;
  const [gcodeFileUrl, setGcodeFileUrl] = useState('#');
  const [plot, setPlot] = useState('');
  const [drawSettings, setDrawSettings] = useReducer(reducer, {});

  function updatePlot() {
    getUserDrawingPlot(user_id, drawSettings).then(data => setPlot(JSON.parse(data)));
    getGcodeUrl(user_id).then(url => setGcodeFileUrl(url));
  }

  useEffect(() => {
    let mounted = true;
    getGcodeUrl(user_id)
      .then(url => {
        if (mounted) {
          setGcodeFileUrl(url)
        }
      })
    getUserDrawingPlot(user_id, {})
      .then(data => {
        if (mounted) {
          setPlot(JSON.parse(data));
        }
      })
    return () => mounted = false;
  }, [user_id])

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <Row>
              <Plot data={plot.data} layout={{ showlegend: false, xaxis: { scaleanchor: "y", scaleratio: 1 }, height: window.innerHeight * 0.6 }} />
            </Row>
            <Row>
              <Button as="a" target="_blank" href={gcodeFileUrl} className="control-button" size="lg" variant="primary" download>Скачать GCODE</Button>
              <Button as="a" target="_blank" href='/draw' className="control-button" size="lg" variant="secondary">Рисование</Button>
              <Button disabled={true} className="control-button" variant="secondary" size="lg">Отправить в печать</Button>
            </Row>
          </Col>
          <Col sm={4}>
            <SettingsForm updatePlot={updatePlot} setDrawSettings={setDrawSettings} />
          </Col>
        </Row>

      </Container>


    </>
  );
}
