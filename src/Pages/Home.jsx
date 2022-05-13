/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import { getItems, handleAnswer } from '../store/Question/action';
import { makeHistroryAction } from '../store/GameHystory/action';
import { scoreMinus, scorePlus, scoreToZero } from '../store/Auth/action';
import { BottomButtoms, LeftBarComponent } from '../components/Home';

import 'antd/dist/antd.css';
import './Home.scss';
import ModalComponent from '../components/Modal/ModalComponent';

function Home({ setChangeHandleer, changeHandleer, ads, setAds, setStart }) {
  const dispatch = useDispatch();
  const questionsStore = useSelector((store) => store.question.questions);
  const questionsStatus = useSelector((store) => store.question.status);
  const history = useSelector((store) => store.history.history);
  const name = useSelector((store) => store.auth.auth);
  const score = useSelector((store) => store.auth.score);

  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState({});
  const [comparison, setComparison] = useState({ id: null, answ: '' });
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(getItems(changeHandleer.change));
  }, [dispatch]);

  useEffect(() => {
    let interval = null;
    if (seconds !== 60 && isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (seconds === 60) {
      setSeconds(0);
      setIsActive(false);
      setVisible(false);
      dispatch(handleAnswer(answer, comparison.answ, score));
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const categories = questionsStore.map((item) => item.category);

  const unique = Array.from(
    new Set(categories.map((item) => item.id).sort((a, b) => a - b))
  );

  const uniqueCategories = unique.map((idx) => {
    return categories.filter((item) => item.id === idx)[0];
  });

  const data = uniqueCategories?.map((categories) => {
    return questionsStore.filter(
      (question) => question?.category_id === categories.id
    );
  });

  const dataMaxLength = data.filter((arr) => arr.length >= 5);

  const chackedData = dataMaxLength.map((item) =>
    item.filter((data) => data.value !== null)
  );
  const z = chackedData.filter((item) => item.length >= 5);

  function reset() {
    setSeconds(0);
    setIsActive(true);
  }

  const showModal = () => {
    reset();
    setVisible(true);
  };

  const exitHandler = () => {
    setChangeHandleer({
      ...changeHandleer,
      change: false,
      true: 0,
      false: 0,
      count: 0,
      name,
    });
    setAds([]);
    setStart('Start');
    dispatch(scoreToZero());
    const a = history;
    a.push(changeHandleer);
    dispatch(makeHistroryAction(a));
  };

  const questionClick = (question) => {
    showModal();
    setAnswer(question);
  };

  return (
    <>
      {questionsStatus === 'LOADING' ? (
        <Spin />
      ) : (
        <div className='home_box'>
          {z[0] && <LeftBarComponent ads={ads} />}
          <div className='home_container'>
            <div className='table'>
              {z?.map((item, idx) => (
                <div key={`${item}__${idx}`} className='row'>
                  <div className='category_value'>
                    {z[idx][0]?.category.title}
                  </div>
                  {item.map((question, question_idx) =>
                    question.value === 'error' ||
                    question.value === 'success' ? (
                      <button
                        disabled
                        className={`category_value center ${
                          question.value === 'success' ? 'yellow' : 'red'
                        }`}
                        key={`${idx}_${question_idx}`}
                      >
                        {question.value}
                      </button>
                    ) : (
                      <div
                        onClick={() => {
                          questionClick(question);
                        }}
                        className='category_value center'
                        key={`${idx}_${question_idx}`}
                      >
                        {question.value}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>

            {z[0] && (
              <BottomButtoms exitHandler={exitHandler} setStart={setStart} />
            )}
            <ModalComponent
              comparison={comparison}
              seconds={seconds}
              visible={visible}
              answer={answer}
              onChange={setComparison}
              setSeconds={setSeconds}
              setVisible={setVisible}
              setIsActive={setIsActive}
              setAds={setAds}
              ads={ads}
              scorePlus={scorePlus}
              setChangeHandleer={setChangeHandleer}
              changeHandleer={changeHandleer}
              scoreMinus={scoreMinus}
              handleAnswer={handleAnswer}
              score={score}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
