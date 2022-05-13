import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Home, Auth, Statistic } from './Pages';

export const useRoutes = (props) => {
  const {
    changeHandleer,
    setChangeHandleer,
    historyData,
    setHistoryData,
    ads,
    setAds,
    start,
    setStart,
  } = props;
  const auth = useSelector((store) => store.auth.auth);
  const score = useSelector((store) => store.auth.score);

  if (auth) {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={() => (
            <Statistic
              changeHandleer={changeHandleer}
              historyData={historyData}
              setHistoryData={setHistoryData}
              setChangeHandleer={setChangeHandleer}
              setAds={setAds}
              ads={ads}
              start={start}
              setStart={setStart}
            />
          )}
        />

        <Route
          exact
          path='/game'
          render={() => (
            <Home
              score={score}
              changeHandleer={changeHandleer}
              setChangeHandleer={setChangeHandleer}
              ads={ads}
              setAds={setAds}
              setStart={setStart}
            />
          )}
        />
        <Redirect to={'/game'} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path={'/auth'} component={Auth} exact />
      <Redirect to={'/auth'} />
    </Switch>
  );
};
