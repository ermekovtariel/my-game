import React from 'react';
import { Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function ModalComponent(props) {
  const {
    seconds,
    visible,
    answer,
    onChange,
    comparison,
    setSeconds,
    setVisible,
    setIsActive,
    setAds,
    ads,
    scorePlus,
    setChangeHandleer,
    changeHandleer,
    scoreMinus,
    handleAnswer,
    score,
  } = props;
  const dispatch = useDispatch();
  const nameStore = useSelector((store) => store.auth.auth);

  const handleOk = () => {
    setSeconds(0);
    setVisible(false);
    setIsActive(false);

    if (answer.answer === comparison.answ) {
      setAds([...ads, `+${answer.value}`]);
      dispatch(scorePlus(answer.value));
      setChangeHandleer({
        ...changeHandleer,
        change: true,
        true: changeHandleer.true + 1,
        false: changeHandleer.false,
        count: changeHandleer.count + 1,
        name: nameStore,
      });
    } else {
      setAds([...ads, `-${answer.value}`]);
      dispatch(scoreMinus(answer.value));
      setChangeHandleer({
        ...changeHandleer,
        change: true,
        true: changeHandleer.true,
        false: changeHandleer.false + 1,
        count: changeHandleer.count + 1,
        name: nameStore,
      });
    }
    dispatch(handleAnswer(answer, comparison.answ, score));
    onChange({ id: null, answ: '' });
  };

  const handleCancel = () => {
    setVisible(false);
    setSeconds(0);
    setIsActive(false);
    onChange({ id: null, answ: '' });
  };

  return (
    <Modal
      title={`60/${seconds}s`}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <span>{answer?.question}</span>
      <Input
        onChange={(e) => onChange({ id: answer.id, answ: e.target.value })}
        value={`${comparison.answ}`}
        placeholder='Answer...'
      />
      <p>{answer.answer}</p>
    </Modal>
  );
}

export default ModalComponent;
