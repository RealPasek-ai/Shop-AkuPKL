import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavbarUser = ({ user }) => {
  const linkStyle = "block text-steel font-bold uppercase tracking-widest text-sm hover:text-ink transition-colors duration-200 py-1";
  const activeStyle = "text-ink font-black";

  return (
    <div className="w-56 font-body antialiased text-ink">
     
      <div className="flex items-center gap-3 mb-10 pl-0.5">
        <div className="w-15 h-15 rounded-full overflow-hidden bg-cloud flex items-center justify-center border border-ash">
          {user.fotoProfil ? (
            <img src={user.fotoProfil} alt="Profil" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm">👤</span>
          )}
        </div>
        <div className="font-bold text-xs tracking-wider uppercase text-ink">{user.username || user.name}</div>
        
      </div>

     
      <nav className="space-y-4">
        <NavLink to="/akun" end className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Profile</NavLink>
        <NavLink to="/akun/pesanan" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Orders</NavLink>
        <NavLink to="/akun/bank" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Bank & Cards</NavLink>
        <NavLink to="/akun/password" className={({isActive}) => `${linkStyle} ${isActive ? activeStyle : ''}`}>Privacy Settings</NavLink>
      </nav>
    </div>
  );
};

export default SideNavbarUser;