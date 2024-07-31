// src/components/element/Element.jsx
import React, { useState } from 'react';
import ModalEdit from './ModalEdit';

const Element = ({ ID, TITULO, IMAGEN, DESCRIPCION, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elementData, setElementData] = useState({
    ID,
    TITULO,
    IMAGEN,
    DESCRIPCION
  });

  const handleSave = (updatedElement) => {
    setElementData(updatedElement);
    onUpdate(updatedElement); // Notificar al componente padre sobre la actualización
  };

  return (
    <>
      <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
        <div className="mr-4 text-gray-600">{elementData.ID}</div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{elementData.TITULO}</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Editar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </div>

      <ModalEdit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        element={elementData}
        onSave={handleSave}
      />
    </>
  );
};

export default Element;
