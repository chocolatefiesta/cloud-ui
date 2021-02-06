import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SettingsForm({updatePlot, setDrawSettings}) {

    return (
        <>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column >Delta, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.1" defaultValue="2.0" onChange={e => setDrawSettings({ delta: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Extrusion per mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.01" defaultValue="0.03" onChange={e => setDrawSettings({ e_per_mm: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Z position, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.01" defaultValue="0.25" onChange={e => setDrawSettings({ z: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Float</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="10" defaultValue="2400" onChange={e => setDrawSettings({ f: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Print Size, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="120" onChange={e => setDrawSettings({ print_size_mm: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Table Size, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="200" onChange={e => setDrawSettings({ table_size_mm: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Offset X, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="0" onChange={e => setDrawSettings({ offset_x: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Offset Y, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="0" onChange={e => setDrawSettings({ offset_y: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Tool</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" min="0" max="1" defaultValue="0" onChange={e => setDrawSettings({ tool: e.target.value })} />
                    </Col>
                </Form.Group>
            </Form>
            <Button onClick={() => updatePlot()}>Обновить</Button>
            
        </>
    );
}


