import React from 'react';
import { ImProfile } from 'react-icons/im';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Avatar } from 'src/components/shared/avatar';

export const Dropdown = () => {
  return (
    <div className="relative group">
      <button className="p-2">
        <Avatar />
      </button>

      <div className="absolute w-28 hidden bg-white group-hover:block">
        <div className="px-4 pt-2 pb-4 shadow-lg text-sm grid grid-cols-1 gap-4">
          <div>
            <Link to="/profile" className="flex items-center">
              <ImProfile className="mr-3" />
              Profile
            </Link>
          </div>
          <div className="flex items-center cursor-pointer">
            <RiLogoutBoxLine className="mr-3" />
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};
