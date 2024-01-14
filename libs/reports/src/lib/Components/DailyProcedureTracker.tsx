import * as Assets from '@cloud-equipment/assets';

const DailyProcedureTracker = () => {
  return (
    <div className="px-5 py-10 text-center reportFormBanner">
      <div className="flex space-x-3 w-fit mx-auto text-greenText items-center">
        <img src={Assets.Images.Reports.LongGreenArrow} alt="" />
        <span>Activities</span>
      </div>

      <h1 className="text-black mt-3 font-bold text-3xl md:text-4xl lg:text-5xl">
        Daily Procedure Tracker
      </h1>

      <p className="mt-5 text-greyText2">
        Dear Partner, kindly fill out this form for every procedure done at your
        facility. We appreciate you compliance and support.
      </p>
    </div>
  );
};

export default DailyProcedureTracker;
