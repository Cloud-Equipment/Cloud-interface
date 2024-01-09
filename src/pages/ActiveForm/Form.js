import React, { useEffect, useRef, useState } from "react";
import Img2 from "../../Assets/IconAndLogo/iconamoon_clock-light.png";
import Naira from "../../Assets/IconAndLogo/fa6-solid_naira-sign.png";
import RedNaira from "../../Assets/IconAndLogo/Vector (1).png";
import Arrow from "../../Assets/IconAndLogo/Frame 2756.png";
import Int from "../../Assets/IconAndLogo/Group.png";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import NewReport from "../../components/NewReport";
import axios from "axios";
import Success from "../../Assets/IconAndLogo/Group 5647.png";
import Error from "../../Assets/IconAndLogo/Frame 2755 (1).png";
import { BASE_URL, Debounce } from "../../data/data";
import { MoneyFormat } from "../../utils/utils";
// import { Link } from 'react-router-dom'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import SearchBox from "../../components/SearchBox";
import Select from "react-select";
import BlackPlusIcon from "../../Assets/IconAndLogo/black-plus.png";

function Form({ procedureToEdit }) {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [buttonClass, setButtonClass] = useState("submitFormLight");

  const facilityId = "fb3d1285-af5d-422d-99b7-0724b26a24c3";
  const userId = "USER-ID";

  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [proceduresList, setProceduresList] = useState([]);
  const [selectedProcedures, setSelectedProcedures] = useState([]);

  const [proceduresListForRebate, setProceduresListForRebate] = useState([]);
  const [proceduresWithRebate, setProceduresWithRebate] = useState([]);

  const [discountData, setDiscountData] = useState([]);

  const [totalDiscount, setTotalDiscount] = useState("");

  const [total, setTotal] = useState("");

  const [subTotal, setSubTotal] = useState(0);

  // PATIENTS DATA
  const [patientStatus, setPatientStatus] = useState(false);
  const [faclityDiscountId, setFaclityDiscountId] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm();

  const FetchPatient = async () => {
    // 1404174
    const url = `${BASE_URL}/patient/getpatientbyuniqueid/${patientId}`;

    return axios
      .get(url)
      .then((res) => {
        if (res.data.success && res.data.data) {
          setPatientStatus(true);
          setValue("patientName", res.data.data?.patientName);
          setValue("patientPhone", res.data.data?.patientPhone);
          setValue("patientAge", res.data.data?.patientAge);
          setValue("patientAddress", res.data.data?.patientAddress);
          setValue("patientGenderId", res.data.data?.patientGenderId);
          setValue("patientEmail", res.data.data?.patientEmail);
        } else {
          setPatientStatus(false);
        }
      })
      .catch((err) => {
        setPatientStatus(false);
      });
  };

  const handleSelect = (selectedPatient) => {
    setPatientStatus(true);
    setValue("patientId", selectedPatient?.patientUniqueID);
    setValue("patientName", selectedPatient?.patientName);
    setValue("patientPhone", selectedPatient?.patientPhone);
    setValue("patientAge", selectedPatient?.patientAge);
    setValue("patientAddress", selectedPatient?.patientAddress);
    setValue("patientGenderId", selectedPatient?.patientGenderId);
    setValue("patientEmail", selectedPatient?.patientEmail);
  };

  const patientId = watch("patientId");

  const debouncedFetchData = Debounce(FetchPatient, 500);

  useEffect(() => {
    if (patientId) {
      debouncedFetchData(patientId);
    }
  }, [patientId, debouncedFetchData]);

  const onSubmit = (data_) => {
    // console.log(data_);

    const createProcedure = (patientId) => {
      const proceduresToSubmit = [];
      selectedProcedures.map((x) => {
        const rebateInfo = proceduresWithRebate.find(
          (y) => y.medServiceId === x.medServiceId
        );
        const item_ = {
          patientId: patientId,
          medServiceId: x.medServiceId,
          quantity: 1,
          amount: x.price,
          subotal: x.price,
          remarks: remarks,
          entryUserId: userId,
          facilityId: facilityId,
          procedureDiscountId: "coming-soon",
          faclityDiscountId: faclityDiscountId,
          procedureDiscountId: 0,
        };
        if (rebateInfo) {
          item_.rebate = {
            facilityId: facilityId,
            rebatePercent: 5,
            refererHospital: facilityId,
            refererName: data_.referrerName,
            refererHospital: data_.refererHospital,
            refererEmail: data_.refererEmail,
            refererPhone: "phone",
          };
        }
        proceduresToSubmit.push(item_);
      });

      axios
        .post(
          `${BASE_URL}/service-manager/procedures/create`,
          proceduresToSubmit,
          axiosConfig
        )
        .then((response) => {
          if (response) {
            successRef.current.click();
          }
        })
        .catch((err) => console.log(err));
    };

    if (!patientStatus) {
      // patientNull.current.click();
      // console.log(patientStatus);
      const data = {
        patientFacilityCode: facilityId,
        patientName: data_.patientName,
        patientAge: Number(data_.patientAge) || 10,
        patientEmail: data_.patientEmail,
        patientPhone: data_.patientPhone,
        patientGenderId: 0,
        aboutPatient: "",
        maritalStatusId: 0,
        address: data_.patientAddress,
        bloodGroupId: 0,
        dateOfBirth: "2024-01-03T08:37:00.151Z",
        dateOfDeath: "2024-01-03T08:37:00.151Z",
        // isActive: true,
        // patientUniqueID: "string",
      };
      axios
        .post(`${BASE_URL}/patient/createpatient`, data, axiosConfig)
        .then((response) => {
          if (response) {
            createProcedure(response.data.data.patientUniqueID);
            setPatientStatus(true);
          }
        })
        .catch((err) => console.log(err));
    } else {
      createProcedure(data_.patientId);
    }
  };

  const errorRef = useRef(null);
  const successRef = useRef(null);
  const patientNull = useRef(null);

  useEffect(() => {
    if (patientId || remarks) {
      setButtonClass("submitFormDark");
    } else {
      setButtonClass("submitFormLight");
    }
  }, [patientId, remarks]);

  const CategoryCheck = () => {
    if (!selectedCategories?.length) {
      setError(
        "Choose a selectedProcedures category before selecting selectedProcedures"
      );
    } else setError("");
  };

  const FetchProedure = () => {
    const url = `${BASE_URL}/service-manager/medServices/getall`;
    axios
      .get(url)
      .then((res) => {
        setProceduresList(
          res.data.data.map((x) => ({
            ...x,
            label: x.medServiceName,
            value: x.medServiceId,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  const FetchCategory = () => {
    const url = `${BASE_URL}/service-manager/medServiceCategory/getactivemedservicecategory`;
    axios
      .get(url)
      .then((res) => {
        setCategoriesList(
          res.data.data.map((x) => ({
            ...x,
            label: x.categoryName,
            value: x.categoryId,
          }))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchProedure();
    FetchCategory();
  }, []);

  const handleAddRebateClick = () => {
    if (proceduresListForRebate.length) {
      setProceduresWithRebate(proceduresWithRebate.concat({}));
    }
  };

  // populate the dropdown for rebates selection based on the selected procedures
  useEffect(() => {
    console.log({ proceduresWithRebate });
    setProceduresListForRebate(
      selectedProcedures.filter(
        (x) =>
          !proceduresWithRebate.some((y) => y.medServiceId === x.medServiceId)
      )
    );
  }, [selectedProcedures, proceduresWithRebate]);

  // remove from the selected procedures with rebates if they are unselected from the procedures list
  useEffect(() => {
    setProceduresWithRebate(
      proceduresWithRebate.filter((x) =>
        selectedProcedures.some((y) => y.medServiceId === x.medServiceId)
      )
    );
    console.log(
      proceduresWithRebate.filter((x) =>
        selectedProcedures.some((y) => y.medServiceId === x.medServiceId)
      )
    );
  }, [selectedProcedures]);

  const handleRebateSelectionFromDropdown = (item) => {
    if (
      proceduresWithRebate.find((x) => x.medServiceId === item.medServiceId)
    ) {
      // if the an already selected one is selected again
      return;
    }

    setProceduresWithRebate(proceduresWithRebate.slice(0, -1).concat(item));

    // after selecting an item for rebate, remove it from the list
    setProceduresListForRebate(
      proceduresListForRebate.filter(
        (x) => x.medServiceId !== item.medServiceId
      )
    );
  };

  // fetch active procedure-based discounts
  useEffect(() => {
    const Fac_url = `${BASE_URL}/payment/discounts/getactivediscount/facilityId?facilityId=${facilityId}`;
    axios
      .get(Fac_url)
      .then((res) => {
        setDiscountData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // calculations to display

  useEffect(() => {
    const rebate = false; // please remember to change
    if (rebate) {
      let total = 0;
      const proceduresToConsider = getValues().rebatesArray;

      // loop over all procedures selected
      for (let item of selectedProcedures) {
        let amount = Number(item.price) || 0;
        // check if the selectedProcedures has rebate
        const rebateInfo = proceduresToConsider?.find(
          (x) => x.id === item.medServiceId
        );
        if (rebateInfo?.rebatePaid) {
          const rebatePaid = Number(rebateInfo.rebatePaid) || 0;
          amount = amount - (rebatePaid * amount) / 100;
        }

        total = total + amount;
      }

      setSubTotal(total);
    } else {
      const totalPrice = selectedProcedures.reduce(
        (acc, item) => acc + item.price,
        0
      );
      setSubTotal(totalPrice);
    }
  }, [selectedProcedures]);

  useEffect(() => {
    setTotal(subTotal);
  }, [subTotal]);

  const SuccessModal = () => (
    <div>
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body SuccessModal">
              <center>
                <img src={Success} alt="" />
                <p>Form created successfully</p>
                <div className="buttonss">
                  <button
                    type="button"
                    className="btn cancel"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <a href="/reports">
                    {" "}
                    <button type="button" className="btn light-button">
                      Check it out
                    </button>
                  </a>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className=""
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
        ref={successRef}
        style={{ display: "none" }}
      ></button>
    </div>
  );

  const ErrorModal = () => (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body ErrorModal">
              <center>
                <img src={Error} alt="" />
                <p>Field required, Fill and try again</p>
                <div className="buttonss">
                  <button
                    type="button"
                    className="btn light-button"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className=""
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={errorRef}
        style={{ display: "none" }}
      ></button>
    </div>
  );

  const PatientErrorModal = () => (
    <div>
      <div
        className="modal fade"
        id="exampleModall"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body ErrorModal">
              <center>
                <img src={Error} alt="" />
                <p>Patient not found</p>
                <div className="buttonss">
                  <button
                    type="button"
                    className="btn light-button"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className=""
        data-bs-toggle="modal"
        data-bs-target="#exampleModall"
        ref={patientNull}
        style={{ display: "none" }}
      ></button>
    </div>
  );

  return (
    <div>
      <div className="ActiveFormSection tw-bg-white">
        {/* SUCCESS */}
        <SuccessModal />
        {/* ERROR */}
        <ErrorModal />
        {/* PATIENT ERROR */}
        <PatientErrorModal />

        <div className="relative ">
          <div className="headers">
            <div className="date ">
              <img src={Img2} alt="" />
              <p>24th November, 2023 </p>
              <p>12:36.27</p>
            </div>
          </div>
          <div className="">
            <NewReport Type="View" />
          </div>
        </div>

        <div className="form ce-form">
          <form>
            <div className="deduction">
              <h2>Patient Details</h2>
              <p>You are to fill in the patient Basic Information</p>
              <div className="dividerTwo"></div>
            </div>

            <div className="tw-grid md:tw-grid-cols-2 tw-gap-5 md:tw-gap-8">
              <SearchBox onSelect={handleSelect} />
              <div className="tw-hidden md:tw-block"></div>

              <div className="discount">
                <label htmlFor="patientId" className="fw3">
                  Patient ID
                </label>{" "}
                <br />
                <input
                  {...register("patientId")}
                  name="patientId"
                  id="patientId"
                  type="text"
                  placeholder="AGA/453"
                />
              </div>

              <div className="discount">
                <label htmlFor="patientName" className="fw3">
                  Patient Name
                </label>
                <br />
                <input
                  name="patientName"
                  type="text"
                  {...register("patientName")}
                  id="patientName"
                  placeholder="Adepoju Deborah "
                />
              </div>

              <div className="discount">
                <label htmlFor="patientPhone" className="fw3">
                  Patient Mobile Number
                </label>
                <br />
                <input
                  type="text"
                  name="patientPhone"
                  {...register("patientPhone")}
                  id="patientPhone"
                  placeholder="+234 08143626356"
                />
              </div>

              <div className="discount">
                <label htmlFor="patientGenderId" className="fw3">
                  Gender
                </label>
                <br />
                <select id="patientGender" {...register("patientGender")}>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                </select>
              </div>

              <div className="discount">
                <label htmlFor="patientAge" className="fw3">
                  Age of the Patient
                </label>
                <br />
                <input
                  type="text"
                  name="patientAge"
                  {...register("patientAge")}
                  id="patientAge"
                />
              </div>

              <div className="">
                <label htmlFor="patientEmail" className="fw3">
                  Patient Email
                </label>
                <br />
                <input
                  type="email"
                  name="patientEmail"
                  {...register("patientEmail")}
                  id="patientEmail"
                />
              </div>

              <div className="">
                <label htmlFor="patientAddress" className="fw3">
                  Address
                </label>
                <br />
                <input
                  type="text"
                  name="patientAddress"
                  {...register("patientAddress")}
                  id="patientAddress"
                  placeholder="No 24, W. F. Kumuyi Street,"
                />
              </div>

              <div className="">
                <label className="label">Procedure category</label>
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "8px",
                      border: "1px solid rgba(99, 119, 138, 0.5)",
                      outline: "none",
                    }),
                  }}
                  isMulti
                  name="Procedure category"
                  options={categoriesList}
                  value={selectedCategories}
                  className="react-select"
                  onChange={(val) => setSelectedCategories(val)}
                />
              </div>

              <div className="">
                <label className="label">Procedures</label>
                <Select
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "8px",
                      border: "1px solid rgba(99, 119, 138, 0.5)",
                      outline: "none",
                    }),
                  }}
                  value={selectedProcedures}
                  onChange={(val) => setSelectedProcedures(val)}
                  isMulti
                  name="Procedures"
                  className="react-select"
                  options={proceduresList}
                />
              </div>
            </div>

            <div className="deduction">
              <h2>Rebate</h2>
              <p>Click the add button to add rebate to various procedure</p>
              <div className="dividerTwo"></div>
            </div>

            {proceduresWithRebate.map((procedure, index) => (
              <div
                key={index}
                className="tw-grid md:tw-grid-cols-2 tw-gap-5 md:tw-gap-8"
              >
                <div className="">
                  <label className="fw3">Procedure for Rebate</label> <br />
                  <Select
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderRadius: "8px",
                        border: "1px solid rgba(99, 119, 138, 0.5)",
                        outline: "none",
                      }),
                    }}
                    name="Procedure category"
                    className="react-select"
                    options={proceduresListForRebate}
                    onChange={handleRebateSelectionFromDropdown}
                  />
                </div>

                <div className="">
                  <label className="fw3">Rebate Amount</label>
                  <br />
                  <input
                    // {...register(`rebatesArray.${index}.referrerName`)}
                    name="rebateAmount"
                    type="text"
                    readOnly
                  />
                </div>
              </div>
            ))}

            <div
              onClick={handleAddRebateClick}
              className="tw-mt-4 tw-flex tw-items-center tw-gap-1 tw-cursor-pointer"
            >
              <img src={BlackPlusIcon} />{" "}
              <span className="tw-text-[#54D4BD] tw-text-sm">
                Add Rebate to a Procedure
              </span>
            </div>

            <div className="deduction">
              <h2>Deduction</h2>
              <p>
                You are to populate the Rebate Amount to efficiently calculate a
                deduction
              </p>
              <div className="dividerTwo"></div>
            </div>

            <div className="Rebate">
              <div className="row">
                {/* <div className="col-md-6">
                  <div className="discount">
                    <label htmlFor="discount" className="fw3">
                      Discount Code
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="discountId"
                      onChange={(e) => setDiscountId(e.target.value)}
                      id="discount"
                      placeholder="Enter code"
                    />
                  </div>
                  <div className="int">
                    <img src={Int} alt="" />
                    <p className="fw3">
                      50% Discount as being applied to this transaction -
                      1,000.00
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="tw-grid md:tw-grid-cols-2 tw-gap-5 md:tw-gap-8">
              <div className="discount">
                <label htmlFor="referrerName" className="fw3">
                  Referrers Name
                </label>
                <br />
                <input
                  type="text"
                  name="referrerName"
                  {...register(`referrerName`)}
                  id="referrerName"
                  placeholder="Enter Referee Name"
                />
              </div>

              <div className="discount">
                <label htmlFor="refersHospital" className="fw3">
                  Referrer’s Hospital/Laboratory
                </label>
                <br />
                <input
                  type="text"
                  name="refersHospital"
                  {...register(`refererHospital`)}
                  id="refersHospital"
                  placeholder="Enter Laboratory Name"
                />
              </div>

              <div className="discount">
                <label htmlFor="discount" className="fw3">
                  Referrer’s Email Address
                </label>{" "}
                <br />
                <input
                  type="text"
                  name="refererEmail"
                  id="discount"
                  {...register(`refererEmail`)}
                  placeholder="Enter Referrer Email Address"
                />
              </div>

              <div>
                <label className="fw3">Referrer’s Phone Number</label>

                <Controller
                  name="phoneNo"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      value={value}
                      onChange={onChange}
                      id="phoneNo"
                    />
                  )}
                />
              </div>

              <div className="md:tw-col-span-2">
                <label htmlFor="discount" className="fw3">
                  Remark
                </label>
                <br />
                <textarea
                  name="remarks"
                  onChange={(e) => setRemarks(e.target.value)}
                  id=""
                  placeholder="Leave a Message for the diagnostic center"
                ></textarea>
              </div>
            </div>

            <div className="tw-mt-6">
              <div className="col-md-6">
                <div className="total">
                  <div className="">
                    <div className="">
                      <p className="gray">Subtotal:</p>
                    </div>
                    <div className="amount">
                      <img src={Naira} alt="" />
                      <p className="fw3">{MoneyFormat(subTotal)}.00</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <p className="gray">Discount:</p>
                    </div>
                    <div className="amount">
                      <p className="fw3 red">( </p>
                      <img src={RedNaira} alt="" />
                      <p className="fw3 red">{totalDiscount}</p>
                      <p className="fw3 red"> )</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <p className="f20">Total:</p>
                    </div>
                    <div className="amount">
                      <img src={Naira} alt="" />
                      <p className="f20">{MoneyFormat(total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="margin30"></div>

            <div className="ttext">
              <p className="gray f15">
                The data collected helps us to track utilisation and tailor our
                support under the EIP to your needs. Thank you for filling it
                out correctly
              </p>
            </div>
            <div className="margin40"></div>
            <center>
              <button
                type="submit"
                className={buttonClass}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </button>
            </center>

            <div className="margin30"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
