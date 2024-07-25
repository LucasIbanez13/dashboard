// src/components/body/element/Element.jsx
import React from 'react';

const Element = ({ ID, TITULO }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="mr-4 text-gray-600">{ID}</div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{TITULO}</h3>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Editar
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Element;
