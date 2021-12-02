import axios from 'axios';
import React from 'react';

export const HomePage = () => {
  const getUser = async () => {
    const resp = await axios.get('http://localhost:5000/api/auth/getuser');
    console.log('resp >>>', resp);
  };
  React.useEffect(() => {
    getUser();
  }, []);
  return <div>kk</div>;
};
