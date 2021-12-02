import React from 'react';

type AvatarProps = {
  src?: string;
  className?: string;
};

const defaultSrc = '/images/default-user-avatar.png';
const defaulClassName = 'w-8 rounded-full';

export const Avatar = ({ src = defaultSrc, className = defaulClassName }: AvatarProps) => {
  return <img src={src} alt="user-avatar" className={className} />;
};
