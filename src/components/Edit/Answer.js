import React from 'react'

export default function Answer({question, answer, type, index}) {

    if (type === "text") {
        return (
            <div className="w-full flex flex-col md:flex-row font-primary mb-8 md:mb-16">
                  <div className="w-full flex flex-col md:flex-row mb-4 md:mb-0 md:mr-2">
                    <div className="flex flex-row md:flex-col mb-4 md:mb-0">
                      {/* Number */}
                      <div className="py-2 px-4 bg-pYellow text-white font-black flex items-center rounded mr-8 flex-shrink">
                        <span>{index} -</span>
                        <span className="icon-file-text ml-2" />
                      </div>
                    </div>
                    {/* Text */}
                    <div className="flex-1">
                      <p className="font-bold text-grdBlue tracking-wider mb-8">
                        {question}
                      </p>
                      <p className="font-bold tracking-wider">
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
        )
    }

    const renderNumberButton = () => {
      let buttons = [];
      for (let i = 0; i < 5; i++) {
        let leftBorder = "";
        if (i === 0) leftBorder = "rounded-l-lg";
        let rightBorder = "";
        if (i === 4) rightBorder = "rounded-r-lg";
        let selected = "";
        if (i === answer)
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

    return (
        <div>
            <div className="w-full flex flex-col md:flex-row font-primary mb-8 md:mb-16">
                  <div className="w-full flex flex-col md:flex-row mb-4 md:mb-0 md:mr-2">
                    <div className="flex flex-row md:flex-col mb-4 md:mb-0">
                      {/* Number */}
                      <div className="py-2 px-4 bg-sRed text-white font-black flex items-center rounded mr-8 flex-shrink">
                        <span>{index} -</span>
                        <span className="icon-star ml-2" />
                      </div>
                    </div>
                    {/* Text & 1-5 */}
                    <div className="flex-1">
                      <p className="font-bold text-grdBlue tracking-wider mb-8">
                        {question}
                      </p>
                      <div className="w-full flex">
                        <div className="flex rounded-lg font-heading font-normal border border-dGreen text-dGreen">
                          {renderNumberButton()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
    )
}
