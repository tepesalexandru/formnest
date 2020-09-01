import React from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import {startForm} from '../../features'; 

function Start({ title, nrQuestions, startForm, questions }) {

  const onStartForm = () => {
    const information = {
      questions
    };
    startForm(information);
  }

  return (
    <main className="max-w-screen-xl w-full flex-1 mx-auto p-4 flex flex-col">
      <div className="w-full h-full flex-1 p-4 md:p-8 lg:p-12 bg-pGray rounded-md flex flex-col justify-center">
        <h6 className="uppercase text-dGreen">Sondage</h6>
        <h1 className="text-2xl md:text-4xl font-bold text-dGreen">{title}</h1>
        <p className="font-bold text-grdBlue mb-4">{nrQuestions} Questions</p>
        <div className="w-full flex">
          <Link to="/answer/current">
            <button onClick={() => onStartForm()} className="tracking-wider focus:outline-none focus:shadow-outline text-pGray font-bold py-2 px-4 bg-grdBlue rounded">
              Commencer
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions
  }
}

export default connect(mapStateToProps, {
  startForm
})(Start);
