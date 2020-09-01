import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import {updateQuestion, deleteQuestion, swapQuestions} from '../../features';

function Question({ title, type, position, updateQuestion, id, deleteQuestion, swapQuestions }) {

  const [label, setLabel] = useState(title);

  useEffect(() => {
    setLabel(title)
  }, [title])

  const RenderType = () => {
    if (type === "text") {
      return (
        <div className="py-2 px-4 bg-pYellow text-white font-black flex items-center rounded mr-8">
          <span>{position} -</span>
          <span className="icon-file-text ml-2" />
        </div>
      );
    }
    return (
      <div className="py-2 px-4 bg-sRed text-white font-black flex items-center rounded mr-8">
        <span>{position} -</span>
        <span className="icon-star ml-2" />
      </div>
    );
  };

  const onInputChange = (value) => {
    setLabel(value);
    const information = {
      id, value
    }
    updateQuestion(information);
  }

  const onDeleteClilck = () => {
    const information = {
      id
    }
    deleteQuestion(information)
  }

  const swapUp = () => {
    const information = {
      position,
      direction: "up"
    }
    swapQuestions(information);
  }

  const swapDown = () => {
    const information = {
      position,
      direction: "down"
    }
    swapQuestions(information)
  }

  return (
    <div className="w-full flex flex-col md:flex-row font-primary mb-8 md:mb-16">
      <div className="w-full flex mb-4 md:mb-0 md:mr-2">
        {RenderType()}
        {/* Input */}
        <input
          onChange={(e) => onInputChange(e.target.value)}
          value={label}
          className="bg-white flex-1 p-2 focus:outline-none focus:shadow-outline font-black tracking-widest"
          type="text"
        />
      </div>
      {/* Arrows & Delete*/}
      <div className="flex">
        <button onClick={() => swapUp()} className="bg-white rounded py-1 px-2 focus:outline-none focus:shadow-outline flex items-center">
          <span className="icon-chevron-up text-black text-3xl" />
        </button>
        <button onClick={() => swapDown()} className="bg-white rounded py-1 px-2 focus:outline-none focus:shadow-outline flex items-center mx-2">
          <span className="icon-chevron-down text-black text-3xl" />
        </button>
        <button onClick={() => onDeleteClilck()} className="bg-white rounded py-1 px-3 focus:outline-none focus:shadow-outline flex items-center">
          <span className="icon-trash text-pRed text-xl" />
        </button>
      </div>
    </div>
  );
}


export default connect(null, {
  updateQuestion, deleteQuestion, swapQuestions
})(Question);