import React, { Component } from "react";
import { connect } from "react-redux";
import { updateReply } from "../../features";
import {Redirect} from 'react-router-dom';

class Current extends Component {
  state = {
    questionIndex: 0,
    showEnd: false
  };

  nextQuestion = () => {
    if (this.state.questionIndex < this.props.questions.length - 1)
      this.setState({ questionIndex: this.state.questionIndex + 1 });
    else {
      this.setState({showEnd: true})
    }
  };

  prevousQuestion = () => {
    if (this.state.questionIndex > 0)
      this.setState({ questionIndex: this.state.questionIndex - 1 });
  };
  renderNumberButton = () => {
    let buttons = [];
    for (let i = 0; i < 5; i++) {
      let leftBorder = "";
      if (i === 0) leftBorder = "rounded-l-lg";
      let rightBorder = "";
      if (i === 4) rightBorder = "rounded-r-lg";
      let selected = "";
      if (i === this.props.answers[this.state.questionIndex].answer - 1)
        selected = "bg-sRed";
      else selected = "bg-white";
      buttons.push(
        <button
          className={`font-bold text-base md:text-xl py-2 px-4 md:py-4 md:px-8 bg-white focus:outline-none focus:shadow-outline border-r border-dGreen ${leftBorder} ${rightBorder} ${selected}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  renderQuestionType = () => {
    if (this.props.questions[this.state.questionIndex].type === "text") {
      return (
        <textarea
          name
          id
          cols={30}
          rows={6}
          className="max-w-3xl w-full bg-white p-4 text-dGreen focus:outline-none focus:shadow-outline"
          placeholder="Respondez ici..."
          defaultValue={""}
          value={this.props.answers[this.state.questionIndex].answer}
          onChange={(e) =>
            this.props.updateReply({
              index: this.state.questionIndex,
              reply: e.target.value,
            })
          }
        />
      );
    }

    return (
      <div className="flex rounded-lg font-heading font-normal border border-dGreen text-dGreen">
        {this.renderNumberButton()}
      </div>
    );
  };
  renderNumberButton = () => {
    let buttons = [];
    for (let i = 0; i < 5; i++) {
      let leftBorder = "";
      if (i === 0) leftBorder = "rounded-l-lg";
      let rightBorder = "";
      if (i === 4) rightBorder = "rounded-r-lg";
      let selected = "";
      if (i === this.props.answers[this.state.questionIndex].answer)
        selected = "bg-sRed";
      else selected = "bg-white";
      buttons.push(
        <button
        onClick={() => this.props.updateReply({
          index: this.state.questionIndex,
          reply: i
        })}
          className={`font-bold text-base md:text-xl py-2 px-4 md:py-4 md:px-8 bg-white focus:outline-none focus:shadow-outline border-r border-dGreen ${leftBorder} ${rightBorder} ${selected}`}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  render() {
    if (this.state.showEnd) {
      return <Redirect to="/answer/end"/>
    }
    return (
      <main className="max-w-screen-xl w-full flex-1 mx-auto p-4 flex flex-col">
        <div className="w-full h-full flex-1 p-4 md:p-8 lg:p-12 bg-pGray rounded-md flex flex-col justify-center">
          {/* Question */}
          <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-16 text-center">
            <h6 className="uppercase text-dGreen">
              Question {this.state.questionIndex + 1}
            </h6>
            <h1 className="text-2xl md:text-4xl font-bold text-dGreen mb-8">
              {this.props.questions[this.state.questionIndex].title}
            </h1>
            {this.renderQuestionType()}
          </div>

          {/* Buttona */}
          <div className="w-full flex justify-between">
            <button
              onClick={() => this.prevousQuestion()}
              className="text-grdBlue font-bold flex items-center focus:outline-none focus:shadow-outline pr-2 rounded-full"
            >
              <span className="icon-arrow-left text-lg mr-2" />
              Precedent
            </button>
            <button
              onClick={() => this.nextQuestion()}
              className="tracking-wider flex items-center focus:outline-none focus:shadow-outline text-pGray font-bold py-2 px-4 bg-grdBlue rounded"
            >
              Suivant
              <span className="icon-arrow-right text-lg ml-2" />
            </button>
          </div>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions.questions,
    answers: state.current.answers,
  };
};

export default connect(mapStateToProps, {
  updateReply,
})(Current);
