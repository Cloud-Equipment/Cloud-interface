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

function Form({ procedureToEdit }) {
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [discountId, setDiscountId] = useState();
  const [buttonClass, setButtonClass] = useState("submitFormLight");

  const [procedures, setProcedures] = useState([]);
  const [procedure, setProcedure] = useState([]);

  const [userId, setUserId] = useState("");
  const [facilityId, setFacilityId] = useState("");

  const [category, setCategory] = useState([]);

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

  const patientId = watch("patientId");
  const rebate = watch("rebate");

  const debouncedFetchData = Debounce(FetchPatient, 500);
  useEffect(() => {
    if (patientId) {
      debouncedFetchData(patientId);
    }
  }, [patientId, debouncedFetchData]);

  const onSubmit = (data_) => {
    console.log(data_);

    const createProcedure = (patientId) => {
      const proceduresToSubmit = [];
      data_.rebatesArray.map((x) => {
        proceduresToSubmit.push({
          patientId: patientId,
          medServiceId: x.medServiceId,
          quantity: 1,
          amount: x.price,
          subotal: x.price,
          remarks: remarks,
          referrerName: x.referrerName,
          rebatePaid: x.rebatePaid,
          refererHospital: x.refererHospital,
          refererEmail: x.refererEmail,
          phoneNo: "x.phone",
          entryUserId: userId,
          facilityId: facilityId,
          procedureDiscountId: discountId,
          faclityDiscountId: faclityDiscountId,
          procedureDiscountId: 0,

          // entryUserId: "string",
          // trackId: "string",
          // date: "2024-01-03T08:43:27.827Z",
          // formID: "string",
          // procedureEntryStatus: "string",
          // facilityId: "string",
        });
      });

      axios
        .post(
          `${BASE_URL}/service-manager/procedures/create`,
          proceduresToSubmit,
          axiosConfig
        )
        .then((response) => {
          console.log(response);
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
        .post(`${BASE_URL}/patient/createpatientt`, data, axiosConfig)
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

  const [categoryValue, setCategorydValue] = useState("");

  const handleProcedureCategory = (event) => {
    const value = event.target.value;
    // Update localStorage
    const storedcategoryValues = value;
    localStorage.setItem(
      "procedureCategoryValues",
      JSON.stringify(storedcategoryValues)
    );

    setCategorydValue(storedcategoryValues);

    if (categoryValue) {
      setError("");
    }
  };

  const handleCategoryDelete = (valueToDelete) => {
    // Remove the value from the array
    const updatedValues = setCategorydValue("");

    // Update localStorage and state
    localStorage.setItem(
      "procedureCategoryValues",
      JSON.stringify(updatedValues)
    );
    setCategorydValue(updatedValues);
  };

  const CategoryCheck = () => {
    if (!categoryValue) {
      setError("Choose a procedure category before selecting procedure");
    } else setError("");
  };

  const FetchProedure = () => {
    const url = `${BASE_URL}/service-manager/medServices/getall`;
    axios
      .get(url)
      .then((res) => {
        setProcedures(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "rebatesArray",
    }
  );
  const rebatesArray = watch("rebatesArray");

  // const FetchDiscount = () => {
  //     const url = `${BASE_URL}/service-manager/medServices/getall`
  //     axios.get(url)
  //         .then((res) => {
  //             setProcedures(res.data.data)
  //         })
  //         .catch((err) => console.log(err));
  // };

  const FetchCategory = () => {
    const url = `${BASE_URL}/service-manager/medServiceCategory/getactivemedservicecategory`;
    axios
      .get(url)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    FetchProedure();
    FetchCategory();
    setFacilityId("ewjeri1");
    setQuantity("1");
    setUserId("11");
  }, []);

  useEffect(() => {
    const Fac_url = `${BASE_URL}/payment/discounts/getactivediscount/facilityId?facilityId=${facilityId}`;
    if (facilityId)
      axios
        .get(Fac_url)
        .then((res) => {
          setDiscountData(res.data.data);
        })
        .catch((err) => console.log(err));
  }, [facilityId]);

  const handleAddProcedure = (procedureInfo) => {
    // const discount = discountData.find((d) => d.procedureId === id);
    // const facility = discountData.find((d) => d.discountTypeId === 1);
    // if (facility) {
    //   setFaclityDiscountId(facility.facilityId);
    // }
    // let discountValues;
    // if (discount) {
    //   discountValues = discount.discountPercent;
    //   setDiscountId(discount.procedureId);
    // }

    if (
      !procedure.find(
        (item) => item.medServiceId === procedureInfo.medServiceId
      )
    ) {
      // Add the product to the array
      setProcedure([...procedure, procedureInfo]);

      // if (discount && facility) {
      //   const discountValue = discount.discountPercent;
      //   const facilityValue = facility.discountPercent;
      //   const Value = +discountValue + +facilityValue;
      //   setTotalDiscount((prevDiscount) => prevDiscount + +Value);
      // } else if (discount) {
      //   setTotalDiscount(
      //     (prevDiscount) => prevDiscount + discount.discountPercent
      //   );
      // } else if (facility) {
      //   setTotalDiscount(
      //     (prevDiscount) => prevDiscount + discount.discountPercent
      //   );
      // }
    }
  };

  const removeProcedure = (id) => {
    setProcedure(procedure.filter((x) => x.medServiceId !== id));
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  // calculations to display

  useEffect(() => {
    if (rebate) {
      let total = 0;
      const proceduresToConsider = getValues().rebatesArray;

      // loop over all procedures selected
      for (let item of procedure) {
        let amount = Number(item.price) || 0;
        // check if the procedure has rebate
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
      const totalPrice = procedure.reduce((acc, item) => acc + item.price, 0);
      setSubTotal(totalPrice);
    }
  }, [rebate, procedure, rebatesArray]);

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
      <div className="ActiveFormSection ">
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

        <div className="divider"></div>

        <div className="form">
          <form>
            <div className="deduction">
              <h2>Patient Details</h2>
              <p>You are to fill in the patient Basic Information</p>
              <div className="dividerTwo"></div>
            </div>

            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
                  <div className="discount">
                    <label htmlFor="patientId" className="fw3">
                      Patient ID
                    </label>{" "}
                    <br />
                    <input
                      {...register("patientId")}
                      name="patientId"
                      id="patientId"
                      placeholder="AGA/453"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="discount">
                    <label htmlFor="patientName" className="fw3">
                      Patient Name
                    </label>
                    <br />
                    <input
                      name="patientName"
                      {...register("patientName")}
                      id="patientName"
                      placeholder="Adepoju Deborah "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="margin30"></div>

            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
              </div>
            </div>

            <div className="margin30"></div>

            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
                  <div className="discount">
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
                </div>
              </div>
            </div>

            <div className="margin30"></div>

            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
                  <div className="discount">
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
                </div>

                <div className="col-md-6">
                  <label htmlFor="Defaultselectexample" className="label">
                    Procedure category
                  </label>
                  <br />
                  <div className="dropdown">
                    <button
                      className="btn inputt dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select Procedure/Test
                    </button>
                    <ul className="dropdown-menu" style={{ width: "100%" }}>
                      <div className="testDropdown">
                        <div className="header">
                          <p>Select from the category </p>
                        </div>
                        {category.map((each, i) => (
                          <div className="each" key={i}>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                value={each.categoryName}
                                // checked={selectedValue === ' Liver Test '}
                                onChange={handleProcedureCategory}
                                type="checkbox"
                              />
                              <label className="form-check-label">
                                {each.categoryName}
                              </label>
                            </div>
                            <div className="amount">
                              {/* <img src={Naira} alt="" />
                              <p>{each.price}</p> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ul>
                  </div>
                  <div className="selecteedValues">
                    <ul>
                      {categoryValue ? (
                        <li>
                          {categoryValue}
                          <img
                            src={Arrow}
                            onClick={() => handleCategoryDelete(categoryValue)}
                            alt=""
                          />
                        </li>
                      ) : (
                        <div className=""></div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="margin30"></div>

              <div className="col-md-6" onClick={CategoryCheck}>
                <label htmlFor="Defaultselectexample" className="label">
                  Procedures
                </label>
                <br />
                <div className="dropdown">
                  <button
                    className="btn inputt dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Procedure/Test
                  </button>
                  <ul className="dropdown-menu" style={{ width: "100%" }}>
                    <div className="testDropdown">
                      <div className="header">
                        <p>Select </p>
                      </div>
                      {/* {procedures.map((each, i) => (
                                     <div className="each">
                                         <div className="form-check">
                                             <input className="form-check-input" value={each.medServiceName}
                                                 // checked={selectedValue === ' Liver Test '}
                                                 onChange={(event) => handleProcedure(event, each.price)}
                                                 type="checkbox" id="flexCheckDefaultts1" />
                                             <label className="form-check-label" htmlFor="flexCheckDefaultts1">
                                                 {each.medServiceName}
                                             </label>
                                         </div>
                                         <div className="amount">
                                             <img src={Naira} alt="" />
                                             <p>{each.price}</p>
                                         </div>
                                     </div>
                                 ))} */}
                      {procedures.map((each, i) => (
                        <div className="each" key={i}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              value={each.medServiceName}
                              onClick={(event) => {
                                if (event.target.checked) {
                                  handleAddProcedure(each);
                                } else {
                                  removeProcedure(each.medServiceId);
                                }
                              }}
                              type="checkbox"
                              id={`flexCheckDefaultts+${i}`}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`flexCheckDefaultts+${i}`}
                            >
                              {each.medServiceName}
                            </label>
                          </div>
                          <div className="amount">
                            <img src={Naira} alt="" />
                            <p>{each.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ul>
                </div>
                <span className="errorMessage">{error}</span> <br />
                <div className="selecteedValues">
                  <ul>
                    {procedure.map((value, index) => (
                      <li key={index}>
                        {value.medServiceName} - {value.price}
                        <img
                          src={Arrow}
                          onClick={() => removeProcedure(value.medServiceId)}
                          alt=""
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="deduction">
              <h2>Deduction</h2>
              <p>
                You are to populate the Rebate Amount to efficiency calculate a
                deduction
              </p>
              <div className="dividerTwo"></div>
            </div>

            <div className="Rebate">
              <div className="row">
                <div className="col-md-6 mt-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      {...register("rebate")}
                      id="flexCheckDefaultt"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefaultt"
                    >
                      Rebate
                    </label>
                  </div>
                  <div className="int">
                    <img src={Int} alt="" />
                    <p className="fw3">click on the box if rebate was paid</p>
                  </div>
                </div>

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

            {rebate ? (
              procedure?.map((selectedProcedure, index) => (
                <div key={selectedProcedure.medServiceId} className="">
                  <div className="margin30"></div>
                  <h6>{selectedProcedure.medServiceName}</h6>

                  <Controller
                    name={`rebatesArray.${index}.id`}
                    control={control}
                    defaultValue={selectedProcedure.medServiceId}
                    render={({ field }) => <input type="hidden" {...field} />}
                  />

                  <div className="Rebate">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="discount">
                          <label htmlFor="discount" className="fw3">
                            Rebate Paid (%)
                          </label>
                          <br />
                          <input
                            type="text"
                            name="rebatePaid"
                            {...register(`rebatesArray.${index}.rebatePaid`)}
                            id="discount"
                            placeholder="Enter Percentage of Rebate Paid"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="discount">
                          <label htmlFor="referrerName" className="fw3">
                            Referrers Name
                          </label>
                          <br />
                          <input
                            type="text"
                            name="referrerName"
                            {...register(`rebatesArray.${index}.referrerName`)}
                            id="referrerName"
                            placeholder="Enter Referee Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="margin30"></div>

                  <div className="Rebate">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="discount">
                          <label htmlFor="refersHospital" className="fw3">
                            Referrer’s Hospital/Laboratory
                          </label>
                          <br />
                          <input
                            type="text"
                            name="refersHospital"
                            {...register(
                              `rebatesArray.${index}.refersHospital`
                            )}
                            id="refersHospital"
                            placeholder="Enter Laboratory Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="discount">
                          <label htmlFor="discount" className="fw3">
                            Referrer’s Email Address
                          </label>{" "}
                          <br />
                          <input
                            type="text"
                            name="refererEmail"
                            id="discount"
                            {...register(`rebatesArray.${index}.refererEmail`)}
                            placeholder="Enter Referrer Email Address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="margin30"></div>

                  <div className="phone">
                    <div className="col-md-6">
                      <label htmlFor="discount" className="fw3">
                        Referrer’s Phone Number
                      </label>
                      <br />
                      {/* <PhoneInput
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={setPhone}
                      /> */}
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
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}

            <div className="margin30"></div>

            <div className="remark">
              <label htmlFor="discount" className="fw3">
                Remark
              </label>{" "}
              <br />
              <textarea
                name="remarks"
                onChange={(e) => setRemarks(e.target.value)}
                id=""
                placeholder="Leave a Message for the diagnostic center"
              ></textarea>
            </div>

            <div className="margin40"></div>

            <div className="">
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
