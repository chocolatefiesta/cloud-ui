import React, { useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { ModelContext } from './ModelContext';

export default function ModelCard({ model, ...props }) {
    const { setCurrentModel } = useContext(ModelContext);

    function getThumbnailImage(images) {
        let thumbnail;
        images.some((el) => {
            thumbnail = el.image.src;
            return el.image.is_thumbnail;
        });
        return thumbnail;
    }

    return (
        <>
            <Card sm={2} key={model.id} onClick={() => setCurrentModel(model)} role="button">
                <Card.Img variant="top" src={getThumbnailImage(model.images)} />
                <Card.Body>
                    <Card.Title>{model.name} {model.id}</Card.Title>
                    <Card.Text>
                        <p dangerouslySetInnerHTML={{ __html: model.description }} />
                    </Card.Text>
                    <Badge variant="secondary">{model.print_time} минут</Badge>{' '}
                    <Badge variant="secondary">{model.pieces_num} шт.</Badge>{' '}
                    <Badge variant="secondary">{model.piece_size}</Badge>{' '}
                    <Badge variant="secondary">{model.colors_num}</Badge>{' '}
                </Card.Body>
            </Card>
        </>
    )
}
