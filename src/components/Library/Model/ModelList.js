import React, { useState, useEffect } from 'react';
import { CardColumns } from 'react-bootstrap';
import { firestoreModelsCollection } from '../../App/firebase';
import ModelCard from './ModelCard';


export default function ModelList() {
  const [models, setModels] = useState([]);

  const fetchModels = async () => {
    const data = await firestoreModelsCollection().get();
    data.docs.forEach(item => {
      setModels(prevState => {
        return [...prevState, item.data()];
      });
    })
  }

  useEffect(() => {
    fetchModels();
  }, [])


  return (
    <div className="wrapper">
      <CardColumns>

        {models && models.map((model, idx) => {
          return (
            <>
              <ModelCard key={idx} model={model} />
            </>

          )
        }
        )}
      </CardColumns>
    </div>
  );
}
