import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";

import Questions from "./Questions";
import Answers from "./Answers";

import {updateForm, deleteForm, resetQuestions, resetAnswers} from '../../features';

class EditForm extends Component {

  state = {
    title: ''
  }

  componentDidMount() {
    this.setState({title: this.props.title})
  }

  onUpdateTitle = () => {
    const information = {
      formId: this.props.formId,
      title: this.state.title
    }
    this.props.updateForm(information);
  }

  onDeleteClick = () => {
    const information = {
      formId: this.props.formId
    }
    this.props.deleteForm(information);
  }

  render() {
    return (
      <div>
        <header className="w-full">
          <nav className="max-w-screen-xl w-full mx-auto flex flex-col lg:flex-row justify-between p-4 md:py-8">
            {/* Button */}
            <Link to="/" onClick={() => {
              this.props.resetQuestions();
              this.props.resetAnswers();
            }}>
            <button className="text-sm md:text-lg text-dGreen flex items-center focus:outline-none focus:shadow-outline rounded-full pr-2 mb-4 lg:mb-0">
              <span className="icon-chevron-left mr-2" />
              <span className="font-bold">Mes Formulaires</span>
            </button>
            </Link>
            {/* Input & Check  */}
            <div className="lg:max-w-md w-full flex md:mx-4 mb-4 lg:mb-0">
              <input
                value={this.state.title}
                onChange={(e) => this.setState({title: e.target.value})}
                className="border border-dGray rounded bg-white text-base md:text-xl font-bold focus:outline-none focus:shadow-outline p-2 md:px-4 flex-1 mr-2"
                type="text"
              />
              <button onClick={() => this.onUpdateTitle()} className="flex justify-center items-center rounded border border-grdBlue px-4 focus:outline-none focus:shadow-outline">
                <span className="icon-check text-xl text-grdBlue" />
              </button>
            </div>
            {/* Trash & Button */}
            <div className="flex mb-4 lg:mb-0">
              
              <button  className="flex justify-center items-center rounded border border-pRed px-4 focus:outline-none focus:shadow-outline mr-2">
              <Link to="/" onClick={() => this.onDeleteClick()}>
                <span className="icon-trash text-xl text-pRed" />
                </Link>
              </button>
              <Link to="/answer/start">
              <button className="tracking-wider focus:outline-none focus:shadow-outline text-pGray font-bold py-2 px-4 bg-grdBlue rounded">
                Repondre
              </button>
              </Link>
            </div>
          </nav>
        </header>
        <Route path="/edit/questions" component={Questions} />
        <Route path="/edit/answers" component={Answers} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    formId: state.form.selectedForm,
    title: state.form.title
  };
};

export default connect(mapStateToProps, {
  updateForm, deleteForm, resetQuestions, resetAnswers
})(EditForm);
