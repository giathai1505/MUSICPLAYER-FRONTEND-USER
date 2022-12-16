import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import questionAPI from '../../../api/question.js';

const InitialEmotion = ({ isShow, onOk, onCancel }) => {
  const [question, setQuestion] = useState({});
  const [listSelectEmotion, setListSelectEmotion] = useState([]);

  const getRandomQuestion = async () => {
    try {
      if (localStorage.getItem('accessToken')) {
        const result = await questionAPI.randomQuestion();
        setQuestion(result.question);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const handleUpdateListSelectedEmotion = (emotionID) => {
    if (!listSelectEmotion.includes(emotionID)) {
      setListSelectEmotion((pre) => [...pre, emotionID]);
    } else {
      const index = listSelectEmotion.indexOf(emotionID);
      if (index > -1) {
        setListSelectEmotion((pre) => pre.filter((item) => item !== emotionID));
      }
    }
  };

  const handleCloseForm = () => {
    onCancel();
  };

  return (
    <Modal
      title=''
      className='w-[800px]'
      open={isShow}
      onOk={onOk}
      onCancel={handleCloseForm}
      footer={null}
    >
      <div>
        <h3 className='mb-4 font-header flex justify-center text-xl'>
          {question.content}
        </h3>
        <div className='flex flex-wrap gap-2'>
          {question.emotions
            ? question?.emotions.map((item) => {
                return (
                  <span
                    className={`px-3 py-1 rounded-2xl border border-solid cursor-pointer hover:bg-primary hover:text-white ${
                      listSelectEmotion.findIndex(
                        (element) => element === item._id
                      ) > -1
                        ? 'bg-primary text-white'
                        : ''
                    }`}
                    onClick={() => handleUpdateListSelectedEmotion(item._id)}
                  >
                    {item.name}
                  </span>
                );
              })
            : null}
        </div>
        <div className='flex justify-end mt-2'>
          <button
            onClick={() => onOk(listSelectEmotion)}
            className='flex justify-end bg-primary text-white px-3 py-1 rounded-lg'
            disabled={listSelectEmotion.length <= 0}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InitialEmotion;
