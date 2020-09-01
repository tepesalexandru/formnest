import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {postAnswers} from '../../features';

class End extends Component {

    componentDidMount() {
        const information = {
            formId: this.props.formId,
            answers: this.props.answers
        }
        this.props.postAnswers(information);
    }
    
  render() {
    return (
      <main className="max-w-screen-xl w-full flex-1 mx-auto p-4 flex flex-col">
        <div className="w-full h-full flex-1 p-4 md:p-8 lg:p-12 bg-pGray rounded-md flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-dGreen mb-8">
            Merci d'avoir repondu a ce formulaire
          </h1>
          <Link to="/">
            <button className="tracking-wider flex items-center focus:outline-none focus:shadow-outline text-pGray font-bold py-3 px-4 bg-grdBlue rounded">
              Accender a mes formulaires
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        formId: state.form.selectedForm,
        answers: state.current.answers
    }
}

export default connect(mapStateToProps, {
    postAnswers
})(End);