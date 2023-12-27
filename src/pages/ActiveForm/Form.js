import React, { useEffect, useRef, useState } from 'react'
import Img2 from '../../Assets/IconAndLogo/iconamoon_clock-light.png'
import Naira from '../../Assets/IconAndLogo/fa6-solid_naira-sign.png'
import RedNaira from '../../Assets/IconAndLogo/Vector (1).png'
import Arrow from '../../Assets/IconAndLogo/Frame 2756.png'
import Int from '../../Assets/IconAndLogo/Group.png'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import NewReport from '../../components/NewReport'
import axios from 'axios'
import Success from '../../Assets/IconAndLogo/Group 5647.png'
import Error from '../../Assets/IconAndLogo/Frame 2755 (1).png'
import { BASE_URL, Debounce } from '../../data/data'
import { MoneyFormat } from '../../utils/utils'
// import { Link } from 'react-router-dom'

function Form() {
    const [phone, setPhone] = useState("")
    const [remarks, setRemarks] = useState("")
    const [error, setError] = useState("")
    const [referrerName, setReferrerName] = useState("")
    const [rebatePaid, setRebatePaid] = useState("")
    const [discountData, setDiscountData] = useState([])
    const [quantity, setQuantity] = useState("1")
    const [discountId, setDiscountId] = useState()
    const [userId, setUserId] = useState("")
    const [patientId, setPatientId] = useState("")
    const [facilityId, setFacilityId] = useState("")
    const [buttonClass, setButtonClass] = useState("submitFormLight")
    const [category, setCategory] = useState([])
    const [procedures, setProcedures] = useState([])
    const [procedure, setProcedure] = useState([]);
    const [rebate, setRebate] = useState(false);
    const [patientStatus, setPatientStatus] = useState(false);
    const [totalAmount, setTotalAmount] = useState("");
    const [totalDiscount, setTotalDiscount] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [total, setTotal] = useState("");
    const [patient, setPatient] = useState([]);
    const [refererHospital, setRefererHospital] = useState('')
    const [refererEmail, setRefererEmail] = useState('')
    const [procedureData, setProcedureData] = useState([]);
    // PATIENTS DATA
    const [patientName, setPatientName] = useState('')
    const [patientEmail, setPatientEmail] = useState('')
    const [patientNumber, setPatientNumber] = useState('')
    const [patientGender, setPatientGender] = useState('')
    const [patientAge, setPatientAge] = useState('')
    const [patientAddress, setPatientAddress] = useState('')
    const [faclityDiscountId, setFaclityDiscountId] = useState()

    const toggleRebate = () => {
        setRebate(!rebate);
    };

    const errorRef = useRef(null);
    const successRef = useRef(null);
    const patientNull = useRef(null);

    useEffect(() => {
        if (patientId || remarks) {
            setButtonClass("submitFormDark")
        } else {
            setButtonClass("submitFormLight")
        }

    }, [patientId, remarks]);

    const url = `${BASE_URL}/patient/getpatientbyuniqueid/${patientId}`;
    const FetchPatient = () => {
        return axios.get(url)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setPatient(res.data.data)
                    setPatientStatus(true)
                }
            })
            .catch((err) => console.log(err));
    }

    const debouncedFetchData = Debounce(FetchPatient, 500);

    useEffect(() => {
        if (patientId) {
            debouncedFetchData(patientId);
        }
    }, [patientId, debouncedFetchData]);

    const handleInputChange = (event) => {
        setPatientId(event.target.value);
    };


    useEffect(() => {
        //   fetchInfo();
        if (patient) {
            setPatientName(patient.patientName)
            setPatientNumber(patient.patientPhone)
            setPatientAge(patient.patientAge)
            setPatientAddress(patient.address)
            setPatientEmail(patient.patientEmail)

            if (patient.patientGenderId === 1) {
                setPatientGender("Male")
            } else if (patient.patientGenderId === 2) {
                setPatientGender("Female")
            } else if (patient.patientGenderId === 3) {
                setPatientGender("Others")
            }
        }
    }, [patient]);


    const [categoryValue, setCategorydValue] = useState("");

    const handleProcedureCategory = (event) => {
        const value = event.target.value;
        // Update localStorage
        const storedcategoryValues = value
        localStorage.setItem('procedureCategoryValues', JSON.stringify(storedcategoryValues));

        setCategorydValue(storedcategoryValues);

        if (categoryValue) {
            setError("")
        }

    };

    const handleCategoryDelete = (valueToDelete) => {
        // Remove the value from the array
        const updatedValues = setCategorydValue("");

        // Update localStorage and state
        localStorage.setItem('procedureCategoryValues', JSON.stringify(updatedValues));
        setCategorydValue(updatedValues);
    };


    const CategoryCheck = () => {
        if (!categoryValue) {
            setError("Choose a procedure category before selecting procedure")
        } else (
            setError("")
        )
    }

    const FetchProedure = () => {
        const url = `${BASE_URL}/service-manager/medServices/getall`
        axios.get(url)
            .then((res) => {
                setProcedures(res.data.data)
            })
            .catch((err) => console.log(err));
    };

    // const FetchDiscount = () => {
    //     const url = `${BASE_URL}/service-manager/medServices/getall`
    //     axios.get(url)
    //         .then((res) => {
    //             setProcedures(res.data.data)
    //         })
    //         .catch((err) => console.log(err));
    // };

    const FetchCategory = () => {
        const url = `${BASE_URL}/service-manager/medServiceCategory/getactivemedservicecategory`
        axios.get(url)
            .then((res) => {
                setCategory(res.data.data)
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        FetchProedure()
        FetchCategory()
        setFacilityId("ewjeri1")
        setQuantity("1")
        setUserId("11")
    }, [])


    useEffect(() => {
        const storedcategoryValues = JSON.parse(localStorage.getItem('procedureCategoryValues')) || "";
        setCategorydValue(storedcategoryValues);

        const handleBeforeUnload = () => {
            // Clear localStorage
            localStorage.clear();
        };

        // Attach the event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

    }, []);

    const Fac_url = `${BASE_URL}/payment/discounts/getactivediscount/facilityId?facilityId=${facilityId}`

    useEffect(() => {
        axios.get(Fac_url)
            .then((res) => {
                setDiscountData(res.data.data)
            })
            .catch((err) => console.log(err));

    }, [Fac_url])

    const handleAddProcedure = (id, price, name) => {
        const totals = price * quantity

        const discount = discountData.find((d) => d.procedureId === id);
        const facility = discountData.find((d) => d.discountTypeId === 1);

        if (facility) {
            setFaclityDiscountId(facility.facilityId)
        }

        let discountValues;

        if (discount) {
            discountValues = discount.discountPercent
            setDiscountId(discount.procedureId)
        }

        const test = { name: name, amount: price, discount: discountValues}

        if (!procedureData.some(procedureData => procedureData.medServiceId === id)) {
            // Add the product to the array
            const updatedProcedure = [...procedure, test];
            setProcedure(updatedProcedure);


            // Update the total amount
            const updatedTotalAmount = updatedProcedure.reduce(
                (total, item) => total + +item.amount,
                0
            );

            setTotalAmount(updatedTotalAmount);

            if (discount && facility) {

                const discountValue = discount.discountPercent
                const facilityValue = facility.discountPercent
                const Value = +discountValue + +facilityValue
                setTotalDiscount((prevDiscount) => prevDiscount + +Value);

            } else if (discount) {
                setTotalDiscount((prevDiscount) => prevDiscount + discount.discountPercent);
            } else if (facility) {
                setTotalDiscount((prevDiscount) => prevDiscount + discount.discountPercent);
            }

            // Update localStorage
            localStorage.setItem('procedures', JSON.stringify(updatedProcedure));


            const newPrcedure = {
                "patientId": patientId,
                "medServiceId": id,
                "quantity": quantity,
                "amount": price,
                "subotal": totals,
                "remarks": remarks,
                "referrerName": referrerName,
                "rebatePaid": rebatePaid,
                "refererHospital": refererHospital,
                "refererEmail": refererEmail,
                "phoneNo": phone,
                "entryUserId": userId,
                "facilityId": facilityId,
                "procedureDiscountId": discountId,
                "faclityDiscountId": faclityDiscountId,
            };

            setProcedureData([...procedureData, newPrcedure]);

            console.log(procedureData)
        } else {
            alert("Added already")
        }
    };

    const removeProcedure = (index) => {
        const removedProduct = procedure[index];
        const updatedProcedure = procedure.filter((_, i) => i !== index);
        setProcedure(updatedProcedure);

        // Update the total amount
        const updatedTotalAmount = totalAmount - removedProduct.amount;
        setTotalAmount(updatedTotalAmount);

        const discountPercents = removedProduct.discount
        console.log(discountPercents)
        setTotalDiscount((prevDiscount) => prevDiscount - discountPercents)

        // Update localStorage
        localStorage.setItem('procedures', JSON.stringify(updatedProcedure));

        const updatedProcedureData = procedureData.filter((_, i) => i !== index);
        setProcedureData(updatedProcedureData);
    };

    useEffect(() => {
        const storedProcedure = JSON.parse(localStorage.getItem('procedures')) || [];
        setProcedure(storedProcedure);

        // Calculate total amount
        const storedTotalAmount = storedProcedure.reduce(
            (total, item) => total + +item.amount,
            0
        );

        setTotalAmount(storedTotalAmount);

    }, [totalAmount]);

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    }

    useEffect(() => {
        const updatedData = procedureData.map(item => ({
            ...item,
            "remarks": remarks,
            "referrerName": referrerName,
            "rebatePaid": rebatePaid,
            "phoneNo": phone,
            "refererHospital": refererHospital,
            "refererEmail": refererEmail,
        }));

        localStorage.setItem('procedureData', JSON.stringify(updatedData));
        // setProcedureData(updatedData)
    }, [procedureData, remarks, referrerName, rebatePaid, phone, refererHospital, refererEmail])


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = JSON.parse(localStorage.getItem('procedureData')) || [];
        if (!patientStatus) {
            patientNull.current.click();
            console.log(patientStatus)
        } else if (!patientId && !remarks) {
            errorRef.current.click();
        } else {
            console.log(procedureData)
            axios.post(`${BASE_URL}/service-manager/procedures/create`, data, axiosConfig)
                .then(response => {
                    console.log(response)
                    if (response) {
                        successRef.current.click()
                    }

                })
                .catch(err => console.log(err))
        }
    };


    useEffect(() => {
        if (rebate) {
            setSubtotal(totalAmount - rebatePaid)
        } else (
            setSubtotal(totalAmount)
        )
    }, [totalAmount, rebate, rebatePaid])

    useEffect(() => {
        setTotal(subtotal - (subtotal * (totalDiscount / 100)))

    }, [subtotal, totalDiscount])

    return (

        <div>
            {/* SUCCESS */}
            <div className="ActiveFormSection ">
                <div>
                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body SuccessModal">
                                    <center>
                                        <img src={Success} alt="" />
                                        <p>Form created successfully</p>
                                        <div className="buttonss">
                                            <button type="button" class="btn cancel" data-bs-dismiss="modal">Cancel</button>
                                            <a href="/reports"> <button type="button" class="btn light-button" >Check it out</button></a>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal1" ref={successRef} style={{ display: 'none' }}>
                    </button>
                </div>
                {/* ERROR */}
                <div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body ErrorModal">
                                    <center>
                                        <img src={Error} alt="" />
                                        <p>Field required, Fill and try again</p>
                                        <div className="buttonss">
                                            <button type="button" class="btn light-button" data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={errorRef} style={{ display: 'none' }}>

                    </button>
                </div>
                {/* PATIENT ERROR */}
                <div>
                    <div class="modal fade" id="exampleModall" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body ErrorModal">
                                    <center>
                                        <img src={Error} alt="" />
                                        <p>Patient not found</p>
                                        <div className="buttonss">
                                            <button type="button" class="btn light-button" data-bs-dismiss="modal">Cancel</button>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModall" ref={patientNull} style={{ display: 'none' }}>

                    </button>
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
                        <NewReport
                            Type="View"
                        />
                    </div>
                </div>
                <div className="divider"></div>
                <div className="form" >
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
                                        <label htmlFor="discount" className='fw3'>Patient ID</label> <br />
                                        {/* <input type="text" name="patientId" onChange={(e) => setPatientId(e.target.value)} id="discount" placeholder='AGA/453|' /> */}
                                        <input type="text" onChange={handleInputChange} name="userId" id="discount" placeholder='AGA/453' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Patient Name</label>  <br />
                                        <input type="text" name="name" value={patientName} id="discount" placeholder='Adepoju Deborah ' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Patient Mobile Number</label>  <br />
                                        <input type="text" name="number" value={patientNumber} id="discount" placeholder='+234 08143626356' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Gender</label>  <br />
                                        <input type="text" name="gender" value={patientGender} id="discount" placeholder='Male' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Age of the Patient</label>  <br />
                                        <input type="text" name="age" value={patientAge} id="discount" placeholder='' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Patient Emial</label>  <br />
                                        <input type="text" name="email" value={patientEmail} id="discount" placeholder='' />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="discount">
                                        <label htmlFor="discount" className='fw3'>Address</label>  <br />
                                        <input type="text" name="address" value={patientAddress} id="discount" placeholder='No 24, W. F. Kumuyi Street,' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="Defaultselectexample" className='label'>Procedure category</label>  <br />
                                    <div class="dropdown">
                                        <button class="btn inputt dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Select Procedure/Test
                                        </button>
                                        <ul class="dropdown-menu" style={{ width: "100%" }}>
                                            <div className="testDropdown">
                                                <div className="header">
                                                    <p>Select from the category </p>
                                                </div>
                                                {category.map((each, i) => (
                                                    <div className="each" key={i}>
                                                        <div class="form-check">
                                                            <input class="form-check-input" value={each.categoryName}
                                                                // checked={selectedValue === ' Liver Test '}
                                                                onChange={handleProcedureCategory}
                                                                type="checkbox" id="flexCheckDefaults1" />
                                                            <label class="form-check-label" for="flexCheckDefaults1">
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
                                            {categoryValue ?
                                                <li >
                                                    {categoryValue}
                                                    <img src={Arrow} onClick={() => handleCategoryDelete(categoryValue)} alt='' />
                                                </li>
                                                : <div className=""></div>
                                            }
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div className="margin30"></div>
                            <div className="col-md-6" onClick={CategoryCheck}>
                                <label htmlFor="Defaultselectexample" className='label'>Procedures</label>  <br />
                                <div class="dropdown">
                                    <button class="btn inputt dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select Procedure/Test
                                    </button>
                                    <ul class="dropdown-menu" style={{ width: "100%" }}>
                                        <div className="testDropdown">
                                            <div className="header">
                                                <p>Select </p>
                                            </div>
                                            {/* {procedures.map((each, i) => (
                                     <div className="each">
                                         <div class="form-check">
                                             <input class="form-check-input" value={each.medServiceName}
                                                 // checked={selectedValue === ' Liver Test '}
                                                 onChange={(event) => handleProcedure(event, each.price)}
                                                 type="checkbox" id="flexCheckDefaultts1" />
                                             <label class="form-check-label" for="flexCheckDefaultts1">
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
                                                    <div class="form-check">
                                                        <input class="form-check-input" value={each.medServiceName}
                                                            // checked={selectedValue === ' Liver Test '}
                                                            onClick={(event) => handleAddProcedure(each.medServiceId, each.price, each.medServiceName)}
                                                            // onClick={(event) => addProcedure({ name: `${each.medServiceName}`, amount: `${each.price}` })}
                                                            type="checkbox" id={`flexCheckDefaultts+${i}`} />
                                                        <label class="form-check-label" for={`flexCheckDefaultts+${i}`}>
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
                                <span className='errorMessage'>{error}</span> <br />
                                <div className="selecteedValues">
                                    <ul>
                                        {procedure.map((value, index) => (
                                            <li key={index}>
                                                {value.name} - {value.amount}
                                                <img src={Arrow} onClick={() => removeProcedure(index)} alt='' />
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>


                        <div className="deduction">
                            <h2>Deduction</h2>
                            <p>You are to populate the Rebate Amount to efficiency calculate a deduction</p>
                            <div className="dividerTwo"></div>
                        </div>
                        <div className="Rebate">
                            <div className="row">
                                <div className="col-md-6 mt-4">
                                    <div class="form-check" >
                                        <input class="form-check-input" type="checkbox" onChange={toggleRebate} value="" id="flexCheckDefaultt" />
                                        <label class="form-check-label" for="flexCheckDefaultt">
                                            Rebate
                                        </label>
                                    </div>
                                    <div className="int">
                                        <img src={Int} alt="" />
                                        <p className='fw3'>click on the box if rebate was paid</p>
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
                        {rebate ? <div className="">
                            <div className="margin30"></div>
                            <div className="Rebate">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="discount">
                                            <label htmlFor="discount" className='fw3'>Rebate Paid </label>  <br />
                                            <input type="text" name="rebatePaid" onChange={(e) => setRebatePaid(e.target.value)} id="discount" placeholder='Enter Amount of Rebate Paid' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="discount">
                                            <label htmlFor="discount" className='fw3'>Referrers Name</label>  <br />
                                            <input type="text" name="referrerName" onChange={(e) => setReferrerName(e.target.value)} id="discount" placeholder='Enter Referee Name' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="margin30"></div>
                            <div className="Rebate">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="discount">
                                            <label htmlFor="discount" className='fw3'>Referrer’s Hospital/Laboratory</label>  <br />
                                            <input type="text" name="refersHospital" onChange={(e) => setRefererHospital(e.target.value)} id="discount" placeholder='Enter Laboratory Name' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="discount">
                                            <label htmlFor="discount" className='fw3'>Referrer’s Email Address</label>  <br />
                                            <input type="text" name="refersEmail" id="discount" onChange={(e) => setRefererEmail(e.target.value)} placeholder='Enter Referrer Email Address' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="margin30"></div>
                            <div className="phone">
                                <div className="col-md-6">
                                    <label htmlFor="discount" className='fw3'>Referrer’s Phone Number</label>  <br />
                                    <PhoneInput
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={setPhone}
                                    />
                                </div>
                            </div>
                        </div> : <div></div>
                        }
                        <div className="margin30"></div>
                        <div className="remark">
                            <label htmlFor="discount" className='fw3'>Remark</label> <br />
                            <textarea name="remarks" onChange={(e) => setRemarks(e.target.value)} id="" placeholder='Leave a Message for the diagnostic center'></textarea>
                        </div>
                        <div className="margin40"></div>
                        <div className="">
                            <div className="col-md-6">
                                <div className="total">
                                    <div className="">
                                        <div className="">
                                            <p className='gray'>Subtotal:</p>
                                        </div>
                                        <div className="amount">
                                            <img src={Naira} alt="" />
                                            <p className='fw3'>{MoneyFormat(subtotal)}.00</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="">
                                            <p className='gray'>Discount:</p>
                                        </div>
                                        <div className="amount">
                                            <p className='fw3 red'>( </p>
                                            <img src={RedNaira} alt="" />
                                            <p className='fw3 red'>{totalDiscount}</p>
                                            <p className='fw3 red'> )</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="">
                                            <p className='f20'>Total:</p>
                                        </div>
                                        <div className="amount">
                                            <img src={Naira} alt="" />
                                            <p className='f20'>{MoneyFormat(total)}.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="margin30"></div>
                        <div className="ttext">
                            <p className='gray f15'>The data collected helps us to track utilisation and tailor our support under the EIP to your needs. Thank you for filling it out correctly</p>
                        </div>
                        <div className="margin40"></div>
                        <center>
                            <button type="submit" className={buttonClass} onClick={handleSubmit} >Submit</button>
                        </center>
                        <div className="margin30"></div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Form