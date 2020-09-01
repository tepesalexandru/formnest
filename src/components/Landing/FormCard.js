import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { selectForm } from "../../features";

function FormCard({ formId, title, selectForm }) {

  const onFormClick = () => {
    const information = {
      formId, title
    }
    selectForm(information);
  }

  return (
    <div className="bg-gradient-to-r from-grlGray to-grdGray rounded-lg flex flex-col justify-between items-center p-6">
        <div className="w-full mb-8">
          <p className="text-xs uppercase w-full mb-8">Formulaire</p>
          <h3 className="text-base md:text-xl font-bold leading-tight">
            {title}
          </h3>
        </div>
        {/* Button */}
        <div className="w-full flex justify-end items-center">
          <Link onClick={() => onFormClick()} to="/edit/questions">
          <button className="text-sm tracking-wider focus:outline-none focus:shadow-outline text-grdBlue font-bold mr-4">
            Editer
          </button>
          </Link>
          <Link to="/answer/start">
          <button onClick={() => onFormClick()} className="text-sm tracking-wider focus:outline-none focus:shadow-outline text-pGray font-bold py-2 px-4 bg-grdBlue rounded">
            Repondre
          </button>
          </Link>
        </div>
      </div>
  );
}

export default connect(null, {
  selectForm,
})(FormCard);
