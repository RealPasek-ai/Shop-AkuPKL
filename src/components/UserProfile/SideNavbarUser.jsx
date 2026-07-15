import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavbarUser = ({ user }) => {
  const linkStyle = "block text-gray-400 font-bold uppercase tracking-widest text-sm hover:text-gray-900 transition-colors duration-200 py-1";
  const activeStyle = "text-gray-900 font-black";

  return (
    <div className="w-56 font-sans antialiased text-gray-900">
     
      <div className="flex items-center gap-3 mb-10 pl-0.5">
        <div className="w-15 h-15 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
          {user.fotoProfil ? (
            <img src={user.fotoProfil} alt="Profil" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">👤</span>
          )}
        </div>
        <div className="font-bold text-xs tracking-wider uppercase text-gray-900">{user.username}</div>
        
      </div>

     
      <nav className="space-y-4">
        <NavLink to="/UserProfile" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Profile</NavLink>
        <NavLink to="/orders" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Orders</NavLink>
        <NavLink to="/Wishlist" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Wishlist</NavLink>
        <NavLink to="/Bank" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Bank & Cards</NavLink>
        <NavLink to="/Password" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Privacy Settings</NavLink>
      </nav>
    </div>
  );
};

export default SideNavbarUser;