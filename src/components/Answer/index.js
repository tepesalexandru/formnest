import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Route } from "react-router-dom";
import {fetchQuestions} from '../../features';

import Start from './Start';
import Current from './Current';
import End from './End';

class AnswerForm extends Component {

    componentDidMount() {
        const information = {
            formId: this.props.formId,
          };
          this.props.fetchQuestions(information);
    }

  render() {
    return (
      <div className="min-h-screen font-heading flex flex-col">
       
       <Route path="/answer/start">
       <header className="w-full">
          <nav className="max-w-screen-xl w-full mx-auto flex flex-col lg:flex-row justify-between p-4 md:py-8">
            {/* Button */}
            <Link to="/">
            <button className="text-sm md:text-lg text-dGreen flex items-center focus:outline-none focus:shadow-outline rounded-full pr-2 mb-4 lg:mb-0">
              <span className="icon-chevron-left mr-2" />
              <span className="font-bold">Mes Formulaires</span>
            </button>
            </Link>
          </nav>
        </header>
           <Start title={this.props.title} nrQuestions={this.props.questions.length}/>
       </Route>
       <Route path="/answer/current">
            <Current />
       </Route>
       <Route path="/answer/end">
            <End />
       </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      title: state.form.title,
      questions: state.questions.questions,
      formId: state.form.selectedForm
  };
};

export default connect(mapStateToProps, {
    fetchQuestions
})(AnswerForm);
