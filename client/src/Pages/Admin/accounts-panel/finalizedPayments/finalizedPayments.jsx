import { React, useState, useMemo, useCallback, useEffect } from "react";

// Styles
import styles from "./finalizedPayments.module.css";

// Components
import TableComponent from "./components/finalizedPaymentTable";
import DropdownInput from "./components/dropdownInput";
import MonthSelector from "../../components/monthSelectorField";

import Service from "../../../../utilities/httpService";

const tableColumns = [
  "Lecturer",
  "Course",
  "Batch",
  "Month",
  "Hours",
  "PayRate",
  "Payment",
  "Document",
];

const FinalizedPayments = () => {
  const [lecturer, setLecturer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDateChange = (event) => {
    const selectedValue = event.target.value;

    // Extracting month and year from the selected date
    const [year, month] = selectedValue.split("-");

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleOptionChange = (e) => {
    setLecturer(e.target.value);
  };

  const service = useMemo(() => new Service(), []);

  const [approvedPayment, setApprovedPayment] = useState([]);

  const getApprovedPayments = useCallback(async () => {
    try {
      const response = await service.get("/payment/approvedpayment");
      setApprovedPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  }
    , [service]);

  useEffect(() => {
    getApprovedPayments();
  }, [getApprovedPayments]);


  //get lecturer name list from lecturer collection
  useEffect(() => {
    const respone = service.get(`lecturer/`)
    respone.then((res) => {
      setLecturerList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [lecturerList, setLecturerList] = useState([]);

  const lecturerListAll = lecturerList.map((item) => {
    return { _id: item._id, name: item.firstName + " " + item.lastName };
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (lecturer === "" && selectedMonth === "" && selectedYear === "") {
      getApprovedPayments();
    }
    else if (lecturer === "" && selectedMonth !== "" && selectedYear !== "") {
      const response = approvedPayment.filter((item) => {
        const date = new Date(item.month);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (month === parseInt(selectedMonth) && year === parseInt(selectedYear));
      });
      setApprovedPayment(response);
    }
    else if (lecturer !== "" && selectedMonth === "" && selectedYear === "") {
      const response = approvedPayment.filter((item) => {
        return (item.lecturerId === lecturer);
      });
      setApprovedPayment(response);
    }
    else if (lecturer !== "" && selectedMonth !== "" && selectedYear !== "") {
      const response = approvedPayment.filter((item) => {
        const date = new Date(item.month);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (item.lecturerId === lecturer && month === parseInt(selectedMonth) && year === parseInt(selectedYear));
      });
      setApprovedPayment(response);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setLecturer("");
    setSelectedMonth("");
    setSelectedYear("");
    getApprovedPayments();
  };



  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Finalized Payment Reports</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <MonthSelector
            handleDateChange={handleDateChange}
            style={{ width: "300px", marginLeft: "0px" }}
          />
          <DropdownInput
            list={lecturerListAll}
            handleOptionChange={handleOptionChange}
            selectedBranch={lecturer}
            style={{ width: "300px" }}
          />
          <button className={styles.button} type="submit">
            View
          </button>
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        </form>
        <div>
          <TableComponent columns={tableColumns} rows={approvedPayment} />
        </div>
      </div>
    </>
  );
};

export default FinalizedPayments;
