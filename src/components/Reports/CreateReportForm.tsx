import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { environment } from "../../environments";
import axios, { AxiosResponse } from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox, ListItemText } from "@mui/material";
import {
  IMedService,
  IProcedure,
  IMedserviceCategory,
} from "../../Models/procedures.models";
import BlackPlusIcon from "../../assets/icons/filled-white-plus.svg";

const CreateReportForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm();

  const patientId = watch("patientId");

  const [isNewPatient, setIsNewPatient] = useState(true); // whether the patient was fetched

  const FetchPatient = async () => {
    // 1404174
    const url = `${environment.baseUrl}/patient/getpatientbyuniqueid/${patientId}`;

    return axios
      .get(url)
      .then((res: AxiosResponse) => {
        if (res.data.success && res.data.data) {
          setIsNewPatient(false);
          setValue("patientName", res.data.data?.patientName);
          setValue("patientPhone", res.data.data?.patientPhone);
          setValue("patientAge", res.data.data?.patientAge);
          setValue("patientAddress", res.data.data?.patientAddress);
          setValue("patientGenderId", res.data.data?.patientGenderId);
          setValue("patientEmail", res.data.data?.patientEmail);
        } else {
          setIsNewPatient(true);
        }
      })
      .catch((err) => {
        setIsNewPatient(true);
      });
  };

  const facilityId = "fb3d1285-af5d-422d-99b7-0724b26a24c3";
  const userId = "USER-ID";

  // multiselect guys with their handlers
  const [categoriesList, setCategoriesList] = useState<IMedserviceCategory[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    // console.log(selectedCategories);
  }, [selectedCategories]);

  const renderSelectedCategories = (selected: number[]) => {
    let ans = "";
    selected.forEach((x, index) => {
      ans =
        ans +
        (index ? ", " : "") +
        categoriesList.find((r) => r.categoryId === x)?.categoryName;
    });
    return ans;
  };

  const renderSelectedProcedures = (selected: number[]) => {
    let ans = "";
    selected.forEach((x, index) => {
      ans =
        ans +
        (index ? ", " : "") +
        proceduresList.find((r) => r.medServiceId === x)?.medServiceName;
    });
    return ans;
  };

  const [proceduresList, setProceduresList] = useState<IMedService[]>([]);
  const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);

  const handleChange_categories = (
    event: SelectChangeEvent<typeof selectedCategories>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(value as number[]);
  };

  const handleChange_procedures = (
    event: SelectChangeEvent<typeof selectedProcedures>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedProcedures(value as number[]);
  };

  const FetchProedure = () => {
    const url = `${environment.baseUrl}/service-manager/medServices/getall`;
    axios
      .get(url)
      .then((res: AxiosResponse) => {
        setProceduresList(res.data.data);
      })
      .catch((err) => {});
  };

  const FetchCategory = () => {
    const url = `${environment.baseUrl}/service-manager/medServiceCategory/getactivemedservicecategory`;
    axios
      .get(url)
      .then((res: AxiosResponse) => {
        setCategoriesList(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    FetchProedure();
    FetchCategory();
  }, []);

  //   rebates
  const [proceduresListForRebate, setProceduresListForRebate] = useState<
    number[]
  >([]);
  const [proceduresWithRebate, setProceduresWithRebate] = useState<number[]>(
    []
  );

  const handleRebateSelectionFromDropdown = (
    event: SelectChangeEvent<number>
  ) => {
    if (proceduresWithRebate.find((x) => x === event.target.value)) {
      // if the an already selected one is selected again
      return;
    }
    setProceduresWithRebate(
      proceduresWithRebate.slice(0, -1).concat(event.target.value as number)
    );
    // after selecting an event.target.value for rebate, remove it from the list
    setProceduresListForRebate(
      proceduresListForRebate.filter((x) => x !== event.target.value)
    );
  };

  const handleAddRebateClick = () => {
    if (proceduresListForRebate.length) {
      setProceduresWithRebate(proceduresWithRebate.concat(0));
    }
  };

  //   useEffect(() => {
  //     const rebate = false; // please remember to change
  //     if (rebate) {
  //       let total = 0;
  //       const proceduresToConsider = getValues().rebatesArray;

  //       // loop over all procedures selected
  //       for (let item of selectedProcedures) {
  //         let amount = Number(item.price) || 0;
  //         // check if the selectedProcedures has rebate
  //         const rebateInfo = proceduresToConsider?.find(
  //           (x) => x.id === item.medServiceId
  //         );
  //         if (rebateInfo?.rebatePaid) {
  //           const rebatePaid = Number(rebateInfo.rebatePaid) || 0;
  //           amount = amount - (rebatePaid * amount) / 100;
  //         }

  //         total = total + amount;
  //       }

  //       setSubTotal(total);
  //     } else {
  //       const totalPrice = selectedProcedures.reduce(
  //         (acc, item) => acc + item.price,
  //         0
  //       );
  //       setSubTotal(totalPrice);
  //     }
  //   }, [selectedProcedures]);

  // populate the dropdown for rebates selection based on the selected procedures
  useEffect(() => {
    setProceduresListForRebate(
      selectedProcedures.filter(
        (x) => !proceduresWithRebate.some((y) => y === x)
      )
    );
  }, [selectedProcedures, proceduresWithRebate]);

  //   remove from the selected procedures with rebates if they are unselected from the procedures list
  useEffect(() => {
    setProceduresWithRebate(
      proceduresWithRebate.filter((x) =>
        selectedProcedures.some((y) => y === x)
      )
    );
    console.log(
      proceduresWithRebate.filter((x) =>
        selectedProcedures.some((y) => y === x)
      )
    );
  }, [selectedProcedures]);

  const renderValueForSelectedRebate = (selected: number) => {
    return proceduresList.find((x) => x.medServiceId === selected)
      ?.medServiceName;
  };

  return (
    <section className=" p-5 md:p-10 xl:px-20 ">
      <form className="[box-shadow:_0px_4px_40px_0px_#0D95891A] bg-white rounded-2xl p-5 md:p-8">
        <div className="border-b-[2px] pb-1 border-b-solid border-borderLine">
          <h4 className="font-bold text-xl">Patient Details</h4>
          <p className="text-sm text-greyText2 mt-1">
            You are about to fill in the patient basic information
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mt-8 md:mt-10">
          {/* <SearchBox onSelect={handleSelect} /> */}
          {/* <div className="hidden md:block"></div> */}

          <div className="form-input-label-holder">
            <label>Patient ID</label>
            <input
              {...register("patientId")}
              name="patientId"
              placeholder="AGA/453"
              className="ce-input"
            />
          </div>

          <div className="form-input-label-holder">
            <label>Patient Name</label>
            <input
              className="ce-input"
              {...register("patientName")}
              placeholder="Adepoju Deborah "
            />
          </div>

          <div className="form-input-label-holder">
            <label>Patient Mobile Number</label>
            <input
              {...register("patientPhone")}
              className="ce-input"
              placeholder="+234 08143626356"
            />
          </div>

          <div className="form-input-label-holder">
            <label>Gender</label>
            <Controller
              name="patientGender"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <Select {...field}>
                  <MenuItem value={0} disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>
              )}
            />
          </div>

          <div className="form-input-label-holder">
            <label>Age of the Patient</label>
            <input {...register("patientAge")} className="ce-input" />
          </div>

          <div className="form-input-label-holder">
            <label>Patient Email</label>
            <input
              type="email"
              className="ce-input"
              placeholder="patient@cloudequipment.io"
              {...register("patientEmail")}
            />
          </div>

          <div className="form-input-label-holder">
            <label>Address</label>
            <input
              className="ce-input"
              {...register("patientAddress")}
              placeholder="No 24, W. F. Kumuyi Street,"
            />
          </div>

          <div className="form-input-label-holder">
            <label>Procedure category</label>
            <Select
              multiple
              name="Procedure category"
              value={selectedCategories}
              onChange={(val) => handleChange_categories(val)}
              renderValue={renderSelectedCategories}
            >
              {categoriesList.map((cat) => (
                <MenuItem key={cat.categoryId} value={cat.categoryId}>
                  <Checkbox
                    checked={
                      selectedCategories.findIndex((x) => {
                        return x === cat.categoryId;
                      }) > -1
                    }
                  />
                  <ListItemText>{cat.categoryName}</ListItemText>
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="form-input-label-holder">
            <label>Procedures</label>
            <Select
              multiple
              name="Procedures"
              value={selectedProcedures}
              onChange={(val) => handleChange_procedures(val)}
              renderValue={renderSelectedProcedures}
            >
              {proceduresList.map((medservice) => (
                <MenuItem
                  key={medservice.medServiceId}
                  value={medservice.medServiceId}
                >
                  <Checkbox
                    checked={
                      selectedProcedures.findIndex((x) => {
                        return x === medservice.medServiceId;
                      }) > -1
                    }
                  />
                  <ListItemText>{medservice.medServiceName}</ListItemText>
                  <span>₦{medservice.price}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="border-b-[2px] pb-1 mt-6 md:mt-10 border-b-solid border-borderLine">
          <h4 className="font-bold text-xl">Rebate</h4>
          <p className="text-sm text-greyText2 mt-1">
            Click the add button to add rebate to various procedure
          </p>
        </div>

        {proceduresWithRebate.map((procedureId) => (
          <div
            key={procedureId}
            className="grid mt-6 md:grid-cols-2 gap-5 md:gap-8"
          >
            <div className="form-input-label-holder">
              <label>Procedure for Rebate</label>
              <Select
                name="Procedure category"
                // value={procedureId ?? 0}
                onChange={handleRebateSelectionFromDropdown}
                // renderValue={renderValueForSelectedRebate}
              >
                {proceduresListForRebate.map((rxt) => (
                  <MenuItem key={rxt} value={rxt}>
                    <ListItemText>
                      {
                        proceduresList.find((x) => x.medServiceId === rxt)
                          ?.medServiceName
                      }
                    </ListItemText>
                    <span>
                      ₦
                      {
                        proceduresList.find((x) => x.medServiceId === rxt)
                          ?.price
                      }
                    </span>
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="form-input-label-holder">
              <label>Rebate Amount</label>
              <input className="ce-input" readOnly />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddRebateClick}
          type="button"
          className="mt-4 flex items-center gap-1 cursor-pointer"
        >
          <img src={BlackPlusIcon} />{" "}
          <span className="text-greenText text-sm">
            Add Rebate to a Procedure
          </span>
        </button>

        <div className="border-b-[2px] pb-1 mt-6 md:mt-10 border-b-solid border-borderLine">
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
