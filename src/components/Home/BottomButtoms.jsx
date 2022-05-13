import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function BottomButtoms({ exitHandler, setStart }) {
  const startChange = () => {
    setStart('Continue');
  };

  return (
    <div className='box'>
      <Link to='/' onClick={exitHandler}>
        <Button>End Game</Button>
      </Link>

      <Link onClick={startChange} to='/'>
        <Button onClick={startChange}>Statistic</Button>
      </Link>
    </div>
  );
}

export default BottomButtoms;
