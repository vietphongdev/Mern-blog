import React from 'react';
import { RiLoginBoxLine } from 'react-icons/ri';
import { Link, NavLink } from 'react-router-dom';
import { menu } from 'src/configs/menu-config';
import { Dropdown } from './dropdown';
import { SearhBox } from './searhbox';

export const Header = () => {
  return (
    <div className="bg-blue-dark py-1">
      <div className="container m-auto flex justify-between">
        <div className="flex items-center">
          {/* logo */}
          <div>
            <Link to="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
          </div>

          {/* menu */}
          {menu.map((item) => (
            <NavLink
              key={item.label}
              className="text-white mx-3"
              to={item.path}
              activeStyle={{
                fontWeight: 500,
                color: '#ff8100',
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center">
          <SearhBox />
          <Link to="/login" className="flex items-center ml-3 text-white">
            <RiLoginBoxLine />
            Login
          </Link>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};
