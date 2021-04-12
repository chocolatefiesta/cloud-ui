import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SettingsForm({ updateSTL, setStlSettings }) {
    const fontsList = [
        {"value": "Pacifico", "title": "Pacifico"},
        {"value": "Liberation Sans:style=Bold", "title": "Sans Bold"},
        {"value": "Liberation Serif:style=Bold", "title": "Serif Bold"},
    ]

    return (
        <>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column >Text</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="text" defaultValue="Chocolate Fiesta" onChange={e => setStlSettings({ text: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Heigth, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="5" onChange={e => setStlSettings({ depth: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Width, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="100" onChange={e => setStlSettings({ width: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Heigth of foundation, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="10" defaultValue="2" onChange={e => setStlSettings({ foundation_depth: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Width of foundation, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.1" defaultValue="2" onChange={e => setStlSettings({ foundation_offset: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Word merger foundation width, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="7" onChange={e => setStlSettings({ foundation_joiner_height: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Letter spacing, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" defaultValue="1.0" onChange={e => setStlSettings({ text_spacing: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Font</Form.Label>
                    <Col >
                        <Form.Control size="sm" as="select" defaultValue={fontsList[0].value} onChange={e => setStlSettings({ font: e.target.value })}>
                            {fontsList.map(font => {
                                return (<option value={font.value}>{font.title}</option>)
                            })}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>
            <Button onClick={() => updateSTL()}>Generate</Button>
        </>
    );
}
