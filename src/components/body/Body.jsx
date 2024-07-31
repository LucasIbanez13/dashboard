// src/components/Body.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Nav from './nav/Nav';
import Element from './element/Element';
import FormElement from './element/formElement/FormElement';

const Body = () => {
  const [data, setData] = useState([]);
  const [existingIds, setExistingIds] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Llamada a la API para obtener los datos
    const fetchData = async () => {
      Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTIWhJP1QKMtFzQlIcDoPY7RteXGNp2h-2YtTqrya8uXQhPGP49S7zm3bpZd8cYnWICLsLDQjK46InI/pub?output=csv', {
        download: true,
        header: true,
        complete: (results) => {
          console.log('Datos cargados:', results.data);

          const normalizedData = results.data.map(item => ({
            ID: item.ID?.toUpperCase() || '',
            TITULO: item.TITULO?.toUpperCase() || '',
            IMAGEN: item.IMAGEN?.toUpperCase() || '',
            DESCRIPCION: item.DESCRIPCION?.toUpperCase() || '',
          }));
          
          setData(normalizedData);
          
          const ids = normalizedData.map(item => parseInt(item.ID, 10));
          setExistingIds(ids);
        },
      });
    };

    fetchData();
  }, []);

  const handleAddElement = (newElement) => {
    setData((prevData) => [...prevData, newElement]);
    setExistingIds((prevIds) => [...prevIds, newElement.ID]);
    setShowForm(false);
  };

  const handleUpdateElement = (updatedElement) => {
    setData((prevData) => 
      prevData.map(item =>
        item.ID === updatedElement.ID ? updatedElement : item
      )
    );
  };

  return (
    <div className="flex mt-16">
      <Nav />
      <div className="ml-64 p-5 w-full">
        {showForm ? (
          <>
            <FormElement existingIds={existingIds} onAdd={handleAddElement} />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Crear
            </button>
            {data.map(element => (
              <Element
                key={element.ID}
                ID={element.ID}
                TITULO={element.TITULO}
                IMAGEN={element.IMAGEN}
                DESCRIPCION={element.DESCRIPCION}
                onUpdate={handleUpdateElement}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
