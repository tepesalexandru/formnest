import React, { Component } from "react";
import { connect } from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {Link} from 'react-router-dom'
import { fetchForms, createForm, selectForm } from "../../features";

import FormCard from "./FormCard";

class Landing extends Component {
  componentDidMount() {
    this.fetchForms();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.forms !== this.props.forms) {
      //console.log(this.props.forms);
    }
  }

  fetchForms = () => {
    this.props.fetchForms();
  };

  renderFormCards = () => {
    console.log(this.props.forms);
    return this.props.forms.map((form) => {
      console.log(form);
      return (
        <FormCard key={form.formId} title={form.title} formId={form.formId} />
      );
    });
  };

  onCreateClick = () => {
    const information = {
      formId: uuidv4(),
      title: ''
    };
    this.props.createForm(information);
    this.props.selectForm(information);
  };

  render() {
    return (
      <div className="min-h-screen font-heading">
        <header className="w-full border-b border-grdGray">
          <nav className="max-w-screen-xl w-full mx-auto flex justify-between p-4 md:py-8">
            {/* Logo */}
            <svg
              className="w-48 object-contain"
              width={163}
              height={35}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.634 28h-3.892V8.148h12.544v3.668h-8.68v4.9h7.728v3.556h-7.7V28zm15.184-4.004c.691.69 1.522 1.036 2.492 1.036.971 0 1.792-.345 2.464-1.036.691-.69 1.036-1.652 1.036-2.884s-.345-2.193-1.036-2.884c-.672-.69-1.493-1.036-2.464-1.036-.97 0-1.801.345-2.492 1.036-.672.69-1.008 1.652-1.008 2.884s.336 2.193 1.008 2.884zm-2.688-8.12c1.382-1.381 3.108-2.072 5.18-2.072 2.072 0 3.79.69 5.152 2.072 1.382 1.381 2.072 3.127 2.072 5.236 0 2.11-.69 3.855-2.072 5.236-1.362 1.381-3.08 2.072-5.152 2.072s-3.798-.69-5.18-2.072c-1.362-1.381-2.044-3.127-2.044-5.236 0-2.11.682-3.855 2.044-5.236zm24.584-1.708v3.752a5.695 5.695 0 00-1.12-.112c-1.064 0-1.923.308-2.576.924-.653.597-.98 1.587-.98 2.968V28h-3.724V14.224h3.612v2.044c.672-1.437 1.979-2.156 3.92-2.156.205 0 .495.019.868.056zM84.897 28h-3.724V14.224h3.556v1.68c.355-.635.915-1.139 1.68-1.512a5.309 5.309 0 012.352-.56c1.998 0 3.36.765 4.089 2.296.989-1.53 2.445-2.296 4.368-2.296 1.4 0 2.575.439 3.527 1.316.971.877 1.456 2.184 1.456 3.92V28H98.59v-8.176c0-.784-.206-1.41-.617-1.876-.391-.485-.998-.728-1.82-.728-.765 0-1.38.261-1.848.784-.466.523-.7 1.167-.7 1.932V28H89.91v-8.176c0-.784-.205-1.41-.616-1.876-.41-.485-1.017-.728-1.82-.728-.784 0-1.409.261-1.876.784-.466.504-.7 1.148-.7 1.932V28zm25.641-7.924V28h-3.724V14.224h3.612v1.708a3.842 3.842 0 011.68-1.54 5.18 5.18 0 012.296-.532c1.624 0 2.856.513 3.696 1.54.859 1.008 1.288 2.315 1.288 3.92V28h-3.724v-8.036c0-.821-.214-1.484-.644-1.988-.41-.504-1.045-.756-1.904-.756-.784 0-1.409.27-1.876.812-.466.541-.7 1.223-.7 2.044zm16.184-.532h6.16c-.038-.765-.318-1.41-.84-1.932-.504-.523-1.251-.784-2.24-.784-.896 0-1.624.28-2.184.84-.56.56-.859 1.185-.896 1.876zm6.524 3.584l3.108.924c-.374 1.27-1.111 2.315-2.212 3.136-1.083.821-2.436 1.232-4.06 1.232-1.979 0-3.659-.663-5.04-1.988-1.382-1.344-2.072-3.136-2.072-5.376 0-2.128.672-3.864 2.016-5.208 1.344-1.363 2.93-2.044 4.76-2.044 2.128 0 3.789.635 4.984 1.904 1.213 1.27 1.82 3.015 1.82 5.236 0 .15-.01.317-.028.504v.448l-.028.196h-9.856a3.053 3.053 0 001.064 2.24c.672.597 1.474.896 2.408.896 1.586 0 2.632-.7 3.136-2.1zm5.9 1.036l3.192-.7c.038.597.271 1.101.7 1.512.448.392 1.055.588 1.82.588.579 0 1.027-.13 1.344-.392.318-.261.476-.588.476-.98 0-.69-.494-1.139-1.484-1.344l-1.82-.42c-1.288-.28-2.258-.784-2.912-1.512-.634-.728-.952-1.596-.952-2.604 0-1.25.486-2.315 1.456-3.192.99-.877 2.222-1.316 3.696-1.316.934 0 1.755.14 2.464.42.71.261 1.26.607 1.652 1.036.392.41.691.83.896 1.26.206.43.336.85.392 1.26l-3.108.7a2.273 2.273 0 00-.672-1.288c-.354-.373-.886-.56-1.596-.56-.485 0-.905.13-1.26.392-.336.261-.504.588-.504.98 0 .672.42 1.083 1.26 1.232l1.96.42c1.326.28 2.334.793 3.024 1.54.71.747 1.064 1.643 1.064 2.688 0 1.232-.466 2.296-1.4 3.192-.933.896-2.249 1.344-3.948 1.344-.97 0-1.838-.14-2.604-.42-.765-.299-1.362-.672-1.792-1.12a6.546 6.546 0 01-.952-1.372 4.945 4.945 0 01-.392-1.344zm19.515-14.056v4.116h2.772v3.304h-2.772v5.768c0 .579.13.99.392 1.232.261.243.672.364 1.232.364.504 0 .886-.037 1.148-.112v3.08c-.542.224-1.242.336-2.1.336-1.344 0-2.408-.373-3.192-1.12-.784-.765-1.176-1.81-1.176-3.136v-6.412h-2.492v-3.304h.7c.69 0 1.213-.196 1.568-.588.373-.41.56-.943.56-1.596v-1.932h3.36z"
                fill="#000"
              />
              <circle cx={12} cy={17} r={12} fill="#275563" />
              <path
                stroke="#FBFBFD"
                strokeWidth={2}
                strokeLinecap="round"
                d="M10 22V12M15 12h-5M15 17h-5"
              />
            </svg>
          </nav>
        </header>
        <main className="max-w-screen-xl w-full mx-auto p-4 md:p-24">
          <h1 className="text-dGreen text-2xl md:text-4xl font-bold mb-4">
            Mes Formulaires
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Plus Box */}
            <Link to="/edit/questions" onClick={() => this.onCreateClick()}>
            <div
              
              className="bg-gradient-to-r from-grlBlue to-grdBlue rounded-lg flex flex-col justify-center items-center px-6 py-16"
            >
              <div className="text-4xl text-pGray">
                <span className="icon-plus text-4xl text-white" />
              </div>
              <p className="text-pGray text-base md:text-xl">
                Nouveau formulaire
              </p>
            </div>
            </Link>
            {/* Other Boxes */}
            {this.renderFormCards()}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    forms: state.form.forms,
  };
};

export default connect(mapStateToProps, {
  fetchForms, createForm, selectForm
})(Landing);
