import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';

import { authAction, scoreToZero } from '../store/Auth/action.js';
import {
  clearHistoryAction,
  makeHistroryAction,
} from '../store/GameHystory/action.js';
import { TableComponent } from '../components/Stutistic';
import './Statistic.scss';

function Statistic(props) {
  const { changeHandleer, setChangeHandleer, setAds, start, setStart } = props;
  const dispatch = useDispatch();
  const history = useSelector((store) => store.history.history);
  const name = useSelector((store) => store.auth.auth);

  function backUpHistory() {
    setChangeHandleer({
      ...changeHandleer,
      change: false,
      true: 0,
      false: 0,
      count: 0,
      name,
    });
  }
  function clear() {
    changeHandleer.true !== 0 ||
      changeHandleer.false !== 0 ||
      changeHandleer.count !== 0 ||
      (changeHandleer.change !== false && backUpHistory());
    setStart('Start');
    const a = history;
    a.push(changeHandleer);

    dispatch(makeHistroryAction(a));
    setAds([]);
    dispatch(scoreToZero());
    setStart('Start');
  }

  function clearHistory() {
    backUpHistory();
    dispatch(clearHistoryAction());
  }

  function unloginHandler() {
    changeHandleer.true !== 0 ||
      changeHandleer.false !== 0 ||
      changeHandleer.count !== 0 ||
      (changeHandleer.change !== false && backUpHistory());
    dispatch(authAction(null));
    clear();
  }

  return (
    <>
      <div className='container'>
        <TableComponent changeHandleer={changeHandleer} />
      </div>
      <div className='container_statistic'>
        <div className='box'>
          <Link to='/awd'>
            <Button onClick={unloginHandler}>Exit</Button>
          </Link>
        </div>
        <div className='box'>
          <Link to='/' onClick={clearHistory}>
            <Button type='primary' onClick={clearHistory}>
              Clear History
            </Button>
          </Link>
        </div>
        <div className='box'>
          <Link to='/game'>
            <Button>{start}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Statistic;
