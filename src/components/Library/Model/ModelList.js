import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { firestoreModelsCollection } from '../../App/firebase';
import ModelCard from './ModelCard';


export default function ModelList() {
  const [models, setModels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchModels = async () => {
    const data = await firestoreModelsCollection().orderBy("name").get();
    data.docs.forEach(item => {
      setModels(prevState => {
        return [...prevState, item.data()];
      });
    })
  }

  const filteredModels = () => {
    return models.filter(
      (e) => { return e.name.toUpperCase().includes(searchQuery.toUpperCase()) }
    )
  }

  useEffect(() => {
    fetchModels();
  }, [])


  return (
    <div className="model-list-wrapper">
      <Container>

        <Form>
          <Form.Row>
            <Col>
              <Form.Control type="text" placeholder="Поиск" onChange={e => setSearchQuery(e.target.value)} />
            </Col>

          </Form.Row>
        </Form>

        <Row>
          {
            models && filteredModels().map((model, idx) => {
              return (
                <>
                  <ModelCard key={idx} model={model} />
                </>
              )
            }
            )
          }
        </Row>
      </Container>
    </div>
  );
}
