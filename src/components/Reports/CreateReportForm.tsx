import React from "react";

const CreateReportForm = () => {
  return (
    <section className=" p-5 md:p-10 xl:px-20 ">
      <form className="[box-shadow:_0px_4px_40px_0px_#0D95891A] bg-white rounded-2xl p-5 md:p-8">
        <div className="border-b-[2px] border-b-solid border-borderLine">
          <h4 className="font-bold text-xl">Patient Details</h4>
          <p className="text-sm text-greyText2 mt-1">
            You are about to fill in the patient basic information
          </p>
        </div>

        <div className="border-b-[2px] mt-6 md:mt-10 border-b-solid border-borderLine">
          <h4 className="font-bold text-xl">Rebate</h4>
          <p className="text-sm text-greyText2 mt-1">
            Click the add button to add rebate to various procedure
          </p>
        </div>

        <div className="border-b-[2px] mt-6 md:mt-10 border-b-solid border-borderLine">
          <h4 className="font-bold text-xl">Deduction</h4>
          <p className="text-sm text-greyText2 mt-1">
            You are to populate the Rebate Amount to efficiency calculate a
            deduction
          </p>
        </div>
      </form>
    </section>
  );
};

export default CreateReportForm;
