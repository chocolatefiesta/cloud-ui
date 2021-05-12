import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { firestoreModelsCollection, firestoreTagsCollection } from '../../App/firebase';
import ModelCard from './ModelCard';
import './ModelList.css';


export default function ModelList() {
  const [models, setModels] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagId, setSelectedTagId] = useState(null);

  const fetchModels = async () => {
    const models_data = await firestoreModelsCollection().orderBy("name").get();
    const tags_data = await firestoreTagsCollection().orderBy("name").get();

    models_data.docs.forEach(item => {
      setModels(prevState => {
        const item_data = { ...item.data(), id: item.id }
        return [...prevState, item_data];
      });
    })
    tags_data.docs.forEach(item => {
      setTags(prevState => {
        const item_data = { ...item.data(), id: item.id }
        return [...prevState, item_data];
      });
    })
  }

  const filteredModels = () => {
    let filtered_models = [...models];
    if (selectedTagId) {
      filtered_models = filtered_models.filter((e) => {
        return e.tag_ids?.includes(selectedTagId)
      })
    }
    return filtered_models.filter(
      (e) => { return e.name.toUpperCase().includes(searchQuery.toUpperCase()) }
    )
  }

  useEffect(() => {
    fetchModels();
  }, [])


  return (
    <div className="model-list-wrapper">
      <Container>
        <Row className="model-tags-row">
          <Tab.Container id="model-tags-tabs" defaultActiveKey="0">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link disabled eventKey="-1">Категории</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="0" onClick={e => setSelectedTagId(null)}>Все модели</Nav.Link>
              </Nav.Item>
              {
                tags && tags.map((tag, idx) => {
                  return (
                    <>
                      <Nav.Item>
                        <Nav.Link eventKey={tag.id} onClick={e => setSelectedTagId(tag.id)}>{tag.name}</Nav.Link>
                      </Nav.Item>
                    </>
                  )
                }
                )
              }
            </Nav>
          </Tab.Container>
        </Row>

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
                  <ModelCard key={model.id} model={model} />
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
