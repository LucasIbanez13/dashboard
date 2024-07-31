import React from 'react';

const Header = () => {
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = '/'; // Redirige a la página de inicio
  };

  return (
    <header className="w-full p-5 bg-gray-200 fixed top-0 left-0 z-20">
      <div>
        <a
          href="#"
          onClick={handleLogoClick}
          className="text-2xl cursor-pointer text-gray-700 hover:text-purple-600"
        >
          DashboardLucas13i
        </a>
      </div>
    </header>
  );
};

export default Header;
