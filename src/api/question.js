import request from "./axiosClient";

class QuestionAPI {
  randomQuestion = (params) => {
    const url = "/question/random-question";
    return request.post(url, params);
  };
  getQuestionLevel1 = (params) => {
    const url = "/question/question-level-1";
    return request.post(url, params);
  };
  getQuestionLevel2 = (params) => {
    const url = "/question/question-level-2";
    return request.post(url, params);
  };
}

const questionAPI = new QuestionAPI();
export default questionAPI;
