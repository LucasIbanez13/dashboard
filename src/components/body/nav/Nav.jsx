// src/components/body/nav/Nav.jsx
import React from 'react';

const Nav = () => {
  return (
    <nav className="w-64 h-full bg-gray-800 text-white fixed top-16 left-0 p-5">
      <ul>
        <li className="mb-4">
          <a href="#ver-elementos" className="text-lg">Ver elementos</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
