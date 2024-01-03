import { React, useState, useMemo, useCallback, useEffect } from "react";

// Styles
import styles from "./approvePayments.module.css";

// Components
import TableComponent from "./components/approvePaymentTable";
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
  "Coverages",
  "Documents",
  "Action",
];

const ApprovePaymentsFinance = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDateChange = (event) => {
    const selectedValue = event.target.value;

    // Extracting month and year from the selected date
    const [year, month] = selectedValue.split("-");

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedMonth === "" && selectedYear === "") {
      getPendingPayments();
    }
    else {
      const response = pendingPayment.filter((item) => {
        const date = new Date(item.month);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return month === parseInt(selectedMonth) && year === parseInt(selectedYear);
      });
      setPendingPayment(response);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedMonth("");
    setSelectedYear("");
    getPendingPayments();
  };

  const service = useMemo(() => new Service(), []);

  const [pendingPayment, setPendingPayment] = useState([]);

  const getPendingPayments = useCallback(async () => {
    try {
      const response = await service.get("/payment/pendingpayment");
      setPendingPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  }
    , [service]);

  useEffect(() => {
    getPendingPayments();
  }, [getPendingPayments]);

  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Approve Payments</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <MonthSelector
            handleDateChange={handleDateChange}
            style={{ width: "300px", marginLeft: "0px" }}
          />
          <button className={styles.button} type="submit">
            View
          </button>
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        </form>
        <div>
          <TableComponent columns={tableColumns} rows={pendingPayment} />
        </div>
      </div>
    </>
  );
};

export default ApprovePaymentsFinance;
