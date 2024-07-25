import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Nav from './nav/Nav';
import Element from './element/Element';
import FormElement from './element/formElement/FormElement';


const Body = () => {
  const [data, setData] = useState([]);
  const [existingIds, setExistingIds] = useState([]);
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vTIWhJP1QKMtFzQlIcDoPY7RteXGNp2h-2YtTqrya8uXQhPGP49S7zm3bpZd8cYnWICLsLDQjK46InI/pub?output=csv', {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
        const ids = results.data.map(item => parseInt(item.ID, 10));
        setExistingIds(ids);
      },
    });
  }, []);

  const handleAddElement = (newElement) => {
    setData((prevData) => [...prevData, newElement]);
    setExistingIds((prevIds) => [...prevIds, newElement.id]);
    setShowForm(false); // Oculta el formulario después de agregar el nuevo elemento
  };

  return (
    <div className="flex mt-16">
      <Nav />
      <div className="ml-64 p-5 w-full">
        {showForm ? (
          <>
            {/* Formulario para agregar nuevo elemento */}
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
            {/* Botón Crear */}
            <button
              onClick={() => setShowForm(true)}
              className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Crear
            </button>
            {/* Lista de elementos */}
            {data.map((item, index) => (
              <Element key={index} ID={item.ID} TITULO={item.TITULO} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
