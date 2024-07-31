// src/components/element/ModalEdit.jsx
import React, { useState, useEffect } from 'react';

const ModalEdit = ({ isOpen, onClose, element, onSave }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen && element) {
      setTitle(element.TITULO);
      setImage(element.IMAGEN);
      setDescription(element.DESCRIPCION);
    }
  }, [isOpen, element]);

  const handleSave = async () => {
    const updatedElement = {
      ID: element.ID,
      TITULO: title,
      IMAGEN: image,
      DESCRIPCION: description
    };

    console.log('Updating data:', updatedElement);

    try {
      const response = await fetch('/api/macros/s/AKfycbyxozIgK9AaQsT5YB4eHJldrlDiZWJIw1aqabg4xhEMQNWLyd57iKgGpe7n00Iulapm1g/exec', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedElement)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response:', result);

      if (result.result === 'success') {
        onSave(updatedElement);
        onClose();
      } else {
        console.error('Failed to update:', result);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      window.location.href = '/'; // Redirige a la ruta /
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Editar Elemento</h2>
        <form>
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
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
