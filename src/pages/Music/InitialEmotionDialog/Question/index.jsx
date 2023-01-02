import React from "react";

const Question = ({
  question,
  listSelectEmotion,
  handleUpdateListSelectedEmotion,
}) => {
  return (
    <div>
      <h3 className="mb-4 font-header flex justify-center text-xl">
        {question.content}
      </h3>
      <div className="flex flex-wrap gap-2">
        {question.emotions
          ? question?.emotions.map((item) => {
              return (
                <span
                  className={`px-3 py-1 rounded-2xl border border-solid cursor-pointer hover:bg-primary hover:text-white ${
                    listSelectEmotion.findIndex(
                      (element) => element === item._id
                    ) > -1
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  onClick={() => handleUpdateListSelectedEmotion(item._id)}
                >
                  {item.name}
                </span>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Question;
