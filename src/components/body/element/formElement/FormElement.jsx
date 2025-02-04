import React, { useState } from 'react';

const FormElement = ({ existingIds, onAdd }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  
  const generateNextId = () => {
    const maxId = Math.max(...existingIds, 0);
    return maxId + 1;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newId = generateNextId();
    const newElement = {
      ID: newId,
      TITULO: title,
      IMAGEN: image,
      DESCRIPCION: description
    };

    console.log('Sending data:', newElement);

    try {
      const response = await fetch('/api/macros/s/AKfycbyxozIgK9AaQsT5YB4eHJldrlDiZWJIw1aqabg4xhEMQNWLyd57iKgGpe7n00Iulapm1g/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newElement)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response:', result);

      if (result.result === 'success') {
        onAdd(newElement);
        setTitle('');
        setImage('');
        setDescription('');
      }
    } catch (error) {
      window.location.href = '/'; // Redirige a la ruta /

    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white shadow-md rounded-lg mb-4">
      <div className="mb-4">
        <label className="block text-gray-700">Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Imagen URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear
      </button>
    </form>
  );
};

export default FormElement;
