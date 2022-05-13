import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from './router';

import './App.css';

function App() {
  const name = localStorage.getItem('user');
  const [historyData, setHistoryData] = useState();
  const [ads, setAds] = useState([]);
  const [start, setStart] = useState('Start');

  const [changeHandleer, setChangeHandleer] = useState({
    true: 0,
    false: 0,
    count: 0,
    change: false,
    name,
  });

  const routes = useRoutes({
    name,
    changeHandleer,
    setChangeHandleer,
    historyData,
    setHistoryData,
    ads,
    setAds,
    start,
    setStart,
  });

  return (
    <div className='App'>
      <Router>{routes}</Router>
    </div>
  );
}

export default App;
