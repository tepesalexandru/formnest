import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAnswers } from "../../features";
import Answer from "./Answer";
import { Link } from "react-router-dom";

class Answers extends Component {
  componentDidMount() {
    const information = {
      formId: this.props.formId
    }
    this.props.fetchAnswers(information);
  }

  renderAnswers = (index) => {
    console.log(index);
    let newArray = Object.values(this.props.answers[index]);
    console.log(newArray);
    return newArray.map((answer, idx) => {
      return (
        <Answer
          index={idx + 1}
          question={answer.question}
          answer={answer.answer}
          type={answer.type}
        />
      );
    });
  };

  renderBatches = () => {
    return this.props.answers.map((batch, index) => {
      return (
        <div className="w-full border-b border-grdBlue pt-16">
          {/* Question Input */}
            {this.renderAnswers(index)}
          {/* Response Input */}
        </div>
      );
    });
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
                <Link to="/edit/questions">
                  <button className="text-lg md:text-2xl font-bold border-b-4 focus:outline-none focus:shadow-outline border-transparent mr-4 md:mr-16 text-grdBlue">
                    Questions
                  </button>
                </Link>
                <button className="text-lg md:text-2xl font-bold border-b-4 focus:outline-none focus:shadow-outline border-black">
                  Responses
                </button>
              </div>
              {/* Repeat */}
              {this.renderBatches()}
              {/* End */}
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
    answers: state.answers.answers,
  };
};

export default connect(mapStateToProps, {
  fetchAnswers,
})(Answers);
