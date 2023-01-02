import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import questionAPI from "../../../api/question.js";
import Question from "./Question/index.jsx";

const InitialEmotion = ({ isShow, onOk, onCancel }) => {
  const [question, setQuestion] = useState({});
  const [listSelectEmotion, setListSelectEmotion] = useState([]);
  const [numberOfQuestion, setNumberOfQuestion] = useState(0);
  const [question2, setQuestion2] = useState({});
  const [listSelectEmotion2, setListSelectEmotion2] = useState([]);

  const getQuestionLevel1 = async () => {
    try {
      const result = await questionAPI.getQuestionLevel1();
      setQuestion(result.question);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionLevel2 = async (params) => {
    try {
      const result = await questionAPI.getQuestionLevel2(params);
      setQuestion2(result.question);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestionLevel1();
  }, []);

  const handleUpdateListSelectedEmotion = (emotionID) => {
    if (numberOfQuestion === 0) {
      setListSelectEmotion([emotionID]);
    } else {
      if (!listSelectEmotion2.includes(emotionID)) {
        setListSelectEmotion2((pre) => [...pre, emotionID]);
      } else {
        const index = listSelectEmotion2.indexOf(emotionID);
        if (index > -1) {
          setListSelectEmotion2((pre) =>
            pre.filter((item) => item !== emotionID)
          );
        }
      }
    }
  };

  const handleCloseForm = () => {
    localStorage.setItem("isAnswerQuestion", JSON.stringify(false));
    onCancel();
  };

  const handleSend = () => {
    if (numberOfQuestion === 0) {
      getQuestionLevel2({
        parentId: question._id,
        answerParentId: listSelectEmotion[0],
      });
      setNumberOfQuestion(1);
    } else {
      onOk(listSelectEmotion2);
    }
  };

  return (
    <Modal
      title=""
      className="w-[800px]"
      open={isShow}
      onOk={onOk}
      onCancel={handleCloseForm}
      footer={null}
    >
      {numberOfQuestion === 0 ? (
        <Question
          question={question}
          listSelectEmotion={listSelectEmotion}
          handleUpdateListSelectedEmotion={(emotionID) =>
            handleUpdateListSelectedEmotion(emotionID)
          }
        />
      ) : (
        <Question
          question={question2}
          listSelectEmotion={listSelectEmotion2}
          handleUpdateListSelectedEmotion={(emotionID) =>
            handleUpdateListSelectedEmotion(emotionID)
          }
        />
      )}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSend}
          className="flex justify-end bg-primary text-white px-3 py-1 rounded-lg"
          disabled={listSelectEmotion.length <= 0}
        >
          Send
        </button>
      </div>
    </Modal>
  );
};

export default InitialEmotion;
