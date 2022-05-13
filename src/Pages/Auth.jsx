import React from 'react';
import { Button, Input } from 'antd';
import { useDispatch } from 'react-redux';

import { notification } from 'antd';
import { authAction } from '../store/Auth/action';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Auth.scss';

function Auth() {
  const dispatch = useDispatch();
  const [name, setName] = React.useState();
  const openNotificationSuccess = (type) => {
    notification[type]({
      message: 'WELCOME',
    });
  };
  const openNotificationError = (type) => {
    notification[type]({
      message: 'ERROR',
    });
  };

  const authHandler = () => {
    if (/^[A-Za-zА-я_]{2,20}$/i.test(name)) {
      dispatch(authAction(name));
      openNotificationSuccess('success');
    } else {
      openNotificationError('error');
    }
  };

  return (
    <div className='auth_container'>
      <div className='card'>
        <span>TYPE NAME</span>
        <Input onChange={(e) => setName(e.target.value)} placeholder='Name' />
        <Link to='/'>
          <Button onClick={authHandler} type='primary'>
            AUTH
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Auth;
