import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {Link} from 'react-router-dom'
import { fetchQuestions, createQuestion, deleteQuestion, saveQuestions } from "../../features";
import Question from "./Question";

class Questions extends Component {
  componentDidMount() {
    const information = {
      formId: this.props.formId,
    };
    this.props.fetchQuestions(information);
  }

  renderQuestions = () => {
    console.log(this.props.questions);
    return this.props.questions.map((question) => {
      return (
        <Question
          title={question.title}
          type={question.type}
          position={question.position}
          id={question.id}
        />
      );
    });
  };

  addTextQuestion = () => {
    const information = {
      formId: this.props.formId,
      id: uuidv4(),
      title: "",
      type: "text",
      position: this.props.questions.length + 1
    };
    this.props.createQuestion(information);
  };

  addVoteQuestion = () => {
    const information = {
      formId: this.props.formId,
      id: uuidv4(),
      title: "",
      type: "number",
      position: this.props.questions.length + 1
    };
    this.props.createQuestion(information);
  };

  saveChanges = () => {
    const information = {
      formId: this.props.formId,
      questions: this.props.questions
    }
    this.props.saveQuestions(information);
  };

  render() {
    return (
      <div>
        <main className="max-w-screen-xl w-full flex-1 mx-auto p-4 flex flex-col">
          <div className="w-full h-full flex-1 p-4 md:p-8 lg:p-12 bg-pGray rounded-md flex flex-col justify-between">
            {/* Upper part */}
            <div className="w-full mb-16">
              {/* Tab Options, copy classes to give styling */}
              <div className="w-full flex mb-8">
                <button className="text-lg md:text-2xl font-bold border-b-4 focus:outline-none focus:shadow-outline border-black mr-4 md:mr-16">
                  Questions
                </button>
                <Link to="/edit/answers">
                <button className="text-lg md:text-2xl font-bold border-b-4 focus:outline-none focus:shadow-outline border-transparent text-grdBlue">
                  Responses
                </button>
                </Link>
              </div>

              {this.renderQuestions()}

              {/* 2 Buttons*/}
              <div className="flex flex-col md:flex-row">
                <button
                  onClick={() => this.addTextQuestion()}
                  className="p-3 text-sm md:text-lg border border-grdBlue text-grdBlue rounded font-bold mb-2 md:mb-0 md:mr-4 focus:outline-none focus:shadow-outline"
                >
                  <span className="icon-file-text mr-2" />
                  <span>Adjouter une question "Texte"</span>
                </button>
                <button
                  onClick={() => this.addVoteQuestion()}
                  className="p-3 text-sm md:text-lg border border-grdBlue text-grdBlue rounded font-bold focus:outline-none focus:shadow-outline"
                >
                  <span className="icon-star mr-2" />
                  <span>Adjouter une question "Note"</span>
                </button>
              </div>
            </div>
            {/* Submit thing */}
            <div className="w-full flex justify-end">
              <button
                onClick={() => this.saveChanges()}
                className="tracking-wider focus:outline-none focus:shadow-outline text-pGray font-bold py-2 px-4 bg-grdBlue rounded"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formId: state.form.selectedForm,
    questions: state.questions.questions,
  };
};

export default connect(mapStateToProps, {
  fetchQuestions,
  createQuestion,
  deleteQuestion,
  saveQuestions
})(Questions);
