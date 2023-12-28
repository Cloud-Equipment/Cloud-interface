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
import { BASE_URL } from "../../data/data";
import { MoneyFormat } from "../../utils/utils";
// import { Link } from 'react-router-dom'

function CreateReportForm() {
  const [phone, setPhone] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [referrerName, setReferrerName] = useState("");
  const [rebatePaid, setRebatePaid] = useState(0);
  const [discountId, setDiscountId] = useState(0);
  const [patientId, setPatientId] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [buttonClass, setButtonClass] = useState("submitFormLight");
  const [category, setCategory] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [procedure, setProcedure] = useState([]);
  const [rebate, setRebate] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const toggleRebate = () => {
    setRebate(!rebate);
  };

  const [patient, setPatient] = useState([]);
  // const [patientId, setPatientId] = useState('')
  const [timer, setTimer] = useState(null)
  // PATIENTS DATA
  const [patientName, setPatientName] = useState('')
  const [patientNumber, setPatientNumber] = useState('')
  const [patientGender, setPatientGender] = useState('')
  const [patientAge, setPatientAge] = useState('')
  const [patientAddress, setPatientAddress] = useState('')

  const errorRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (patientId || remarks) {
      setButtonClass("submitFormDark");
    } else {
      setButtonClass("submitFormLight");
    }
  }, [patientId, remarks]);

  // const handleClick = () => {
  //   console.log('Button Clicked!');
  // };

  // const url = `https://patient/users${patientId}`;
  const url = `/patient/getpatientbyuniqueid/{uniqueId}`;
  const fetchPatient = async () => {
      try {
      const res = await axios.get(url);
      return setPatient(res.data);
    } catch (err) {
      return console.log(err);
    }
  };

  const inputChanged = e => {
      setPatientId(e.target.value)

      clearTimeout(timer)

      const newTimer = setTimeout(() => {
          fetchPatient()
      }, 500)

      setTimer(newTimer)
  }

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
    setDiscountId(0);
    setFacilityId("");
  }, []);

  useEffect(() => {
    const storedcategoryValues =
      JSON.parse(localStorage.getItem("procedureCategoryValues")) || "";
    setCategorydValue(storedcategoryValues);

    const handleBeforeUnload = () => {
      // Clear localStorage
      localStorage.clear();
    };

    // Attach the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);
  }, []); // Empty dependency array ensures this effect runs once on mount

  const addProcedure = (test) => {
    if (!procedure.some((item) => item.name === test.name)) {
      // Add the product to the cart
      const updatedProcedure = [...procedure, test];
      setProcedure(updatedProcedure);

      // Update the total amount
      const updatedTotalAmount = updatedProcedure.reduce(
        (total, item) => total + +item.amount,
        0
      );

      setTotalAmount(updatedTotalAmount);

      // Update localStorage
      localStorage.setItem("procedures", JSON.stringify(updatedProcedure));
    } else {
      // Product already in the cart, handle accordingly (e.g., show a message)
      console.log(`procedure ${test.name} is added already .`);
    }
  };

  const removeProcedure = (index) => {
    const removedProduct = procedure[index];
    const updatedProcedure = procedure.filter((_, i) => i !== index);
    setProcedure(updatedProcedure);

    // Update the total amount
    const updatedTotalAmount = totalAmount - removedProduct.amount;
    setTotalAmount(updatedTotalAmount);

    // Update localStorage
    localStorage.setItem("procedures", JSON.stringify(updatedProcedure));
  };

  useEffect(() => {
    const storedProcedure =
      JSON.parse(localStorage.getItem("procedures")) || [];
    setProcedure(storedProcedure);

    // Calculate total amount
    const storedTotalAmount = storedProcedure.reduce(
      (total, item) => total + +item.amount,
      0
    );

    setTotalAmount(storedTotalAmount);
  }, [totalAmount]); // Empty dependency array ensures this effect runs once on mount

  const body = {
    trackId: "1",
    facilityId: facilityId,
    medServiceId: "11",
    quantity: 0,
    amount: totalAmount,
    subotal: totalAmount,
    remarks: remarks,
    referrerName: referrerName,
    rebatePaid: rebatePaid,
    discountId: discountId,
    phoneNo: phone,
    entryUserId: "1",
    patientId: patientId,
  };

  useEffect(() => {
      if (patient.status === 'false') {

      }
      //   fetchInfo();
      if (patient) {
          setPatientName(patient.name)
          setPatientNumber(patient.number)
          setPatientAge(patient.age)
          setPatientAddress(patient.address)
          setPatientGender(patient.gender)
      }
  }, [patient]);

  const handleInput = (event) => (
     { ...body, [event.target.name]: event.target.value }
  )

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
    if (!patientId && !remarks) {
      errorRef.current.click();
    } else {
      axios
        .post(
          `${BASE_URL}/service-manager/procedures/create`,
          body,
          axiosConfig
        )
        .then((response) => {
          successRef.current.click();
          console.log(response);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {/* SUCCESS */}
      <div className="ActiveFormSection ">
        <div>
          <div
            className="modal fade"
            id="exampleModal1"
            tabindex="-1"
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
        {/* ERROR */}
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
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
          <form action="">
            <div className="deduction">
              <h2>Patient Details</h2>
              <p>You are to fill in the patient Basic Information</p>
              <div className="dividerTwo"></div>
            </div>

            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
                  <div className="discount">
                    <label htmlFor="discount" className="fw3">
                      Patient ID
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="patientId"
                      onChange={(e) => setPatientId(e.target.value)}
                      id="discount"
                      placeholder="AGA/453|"
                    />
                    {/* <input type="text" value={patientId} name="userId" id="discount" placeholder='AGA/453|' onChange={inputChanged} /> */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="discount">
                    <label htmlFor="discount" className="fw3">
                      Patient Name
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="name"
                      id="discount"
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
                    <label htmlFor="discount" className="fw3">
                      Patient Mobile Number
                    </label>{" "}
                    <br />
                    <input
                      type="number"
                      name="number"
                      id="discount"
                      placeholder="+234 08143626356"
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
                      type="email"
                      name=""
                      id="discount"
                      placeholder="Enter Referrer Email Address"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="margin30"></div>
            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="discount" className="fw3">
                    Gender
                  </label>{" "}
                  <br />
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>
                      <span></span>
                    </option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="discount" className="fw3">
                    Age of the Patient
                  </label>{" "}
                  <br />
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>
                      <span></span>
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div className="margin30"></div>
            <div className="Rebate">
              <div className="row">
                <div className="col-md-6">
                  <div className="discount">
                    <label htmlFor="discount" className="fw3">
                      Address
                    </label>{" "}
                    <br />
                    <input
                      type="text"
                      name="address"
                      id="discount"
                      placeholder="No 24, W. F. Kumuyi Street,"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="Defaultselectexample" className="label">
                    Procedure category
                  </label>{" "}
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
                          <div className="each">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                value={each.categoryName}
                                // checked={selectedValue === ' Liver Test '}
                                onChange={handleProcedureCategory}
                                type="checkbox"
                                id="flexCheckDefaults1"
                              />
                              <label
                                className="form-check-label"
                                for="flexCheckDefaults1"
                              >
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
            </div>
            <div className="margin20"></div>
            <div className="col-md-6" onClick={CategoryCheck}>
              <span className="errorMessage">{error}</span> <br />
              <label htmlFor="Defaultselectexample" className="label">
                Procedures
              </label>{" "}
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
                                                    <label className="form-check-label" for="flexCheckDefaultts1">
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
                            // checked={selectedValue === ' Liver Test '}
                            onClick={(event) =>
                              addProcedure({
                                name: `${each.medServiceName}`,
                                amount: `${each.price}`,
                              })
                            }
                            type="checkbox"
                            id={`flexCheckDefaultts+${i}`}
                          />
                          <label
                            className="form-check-label"
                            for={`flexCheckDefaultts+${i}`}
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
              <div className="selecteedValues">
                <ul>
                  {procedure.map((value, index) => (
                    <li key={index}>
                      {value.name} - {value.amount}
                      <img
                        src={Arrow}
                        onClick={() => removeProcedure(index)}
                        alt=""
                      />
                    </li>
                  ))}
                </ul>
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
                      onChange={toggleRebate}
                      value=""
                      id="flexCheckDefaultt"
                    />
                    <label className="form-check-label" for="flexCheckDefaultt">
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
                                        <label htmlFor="discount" className='fw3'>Discount Code</label>  <br />
                                        <input type="text" name="discountId" onChange={(e) => setDiscountId(e.target.value)} id="discount" placeholder='Enter code' />
                                    </div>
                                    <div className="int">
                                        <img src={Int} alt="" />
                                        <p className='fw3'>50% Discount as being applied to this transaction - 1,000.00</p>
                                    </div>
                                </div> */}
              </div>
            </div>
            {rebate ? (
              <div className="">
                <div className="margin30"></div>
                <div className="Rebate">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="discount">
                        <label htmlFor="discount" className="fw3">
                          Rebate Paid{" "}
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          name="rebatePaid"
                          onChange={(e) => setRebatePaid(e.target.value)}
                          id="discount"
                          placeholder="Enter Amount of Rebate Paid"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="discount">
                        <label htmlFor="discount" className="fw3">
                          Referrers Name
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          name="referrerName"
                          onChange={(e) => setReferrerName(e.target.value)}
                          id="discount"
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
                        <label htmlFor="discount" className="fw3">
                          Referrer’s Hospital/Laboratory
                        </label>{" "}
                        <br />
                        <input
                          type="text"
                          name=""
                          id="discount"
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
                          name=""
                          id="discount"
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
                    </label>{" "}
                    <br />
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={setPhone}
                    />
                  </div>
                </div>
              </div>
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
                      <p className="fw3">{MoneyFormat(totalAmount)}.00</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <p className="gray">Discount:</p>
                    </div>
                    <div className="amount">
                      <p className="fw3 red">( </p>
                      <img src={RedNaira} alt="" />
                      <p className="fw3 red"> 0.00</p>
                      <p className="fw3 red"> )</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <p className="f20">Total:</p>
                    </div>
                    <div className="amount">
                      <img src={Naira} alt="" />
                      <p className="f20">{MoneyFormat(totalAmount)}.00</p>
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
                onClick={handleSubmit}
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

export default CreateReportForm;
