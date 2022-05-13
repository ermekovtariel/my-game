import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Tag } from 'antd';

function LeftBarComponent({ ads }) {
  const myName = useSelector((store) => store.auth.auth);
  const score = useSelector((store) => store.auth.score);

  return (
    <div className='score'>
      <h2>{myName}</h2>
      <h4>SCORE: {score}</h4>
      {ads[0] &&
        ads?.map((item, idx) => {
          return (
            <Tag
              key={`${idx}_${item}`}
              icon={
                item[0] === '-' ? (
                  <CloseCircleOutlined />
                ) : (
                  <CheckCircleOutlined />
                )
              }
              color={`${item[0] === '-' ? 'error' : 'success'}`}
            >
              {item}
            </Tag>
          );
        })}
    </div>
  );
}

export default LeftBarComponent;
