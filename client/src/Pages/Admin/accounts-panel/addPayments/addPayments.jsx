import { React, useState, useCallback, useEffect, useMemo } from "react";

// Styles
import styles from "./addPayments.module.css";

// Components
import TableComponent from "./components/addPaymentTable";
import MonthSelector from "../../components/monthSelectorField";
import PendingTableComponent from "./components/approvalPendingTable";

import Service from "../../../../utilities/httpService";

const tableColumns = [
  "Lecturer Name",
  "Branch",
  "Course Name",
  "Batch Code",
  "Pay Month",
  "Pay Rate",
  "Action",
];

const tableColumns1 = [
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Month",
  "Total Hours",
  "Payment Rate",
  "Total Payment",
  "Action",
];

const AddPayments = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [approvedCoverages, setApprovedCoverages] = useState([]);
  const [pendingPayment, setPendingPayment] = useState([]);
  const service = useMemo(() => new Service(), []);

  const getApprovedCoverages = useCallback(async () => {
    try {
      const response = await service.get("/coverage/pay/paymentnotapproved");
      setApprovedCoverages(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [service]);

  useEffect(() => {
    getApprovedCoverages();
  }, [getApprovedCoverages]);

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
      getApprovedCoverages();
      getPendingPayments();
    }
    else {
      const response = approvedCoverages.filter((item) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return month === parseInt(selectedMonth) && year === parseInt(selectedYear);
      });
      setApprovedCoverages(response);
      const response1 = pendingPayment.filter((item) => {
        const date = new Date(item.month);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return month === parseInt(selectedMonth) && year === parseInt(selectedYear);
      });
      setPendingPayment(response1);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedMonth("");
    setSelectedYear("");
    getApprovedCoverages();
    getPendingPayments();
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Add Payments for Approved Lectures</p>
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
          <TableComponent columns={tableColumns} rows={approvedCoverages} />
        </div>
        <p className={styles.heading} style={{ marginTop: "50px" }}>
          Approval Pending Payments
          {selectedYear ? ` - ${selectedYear} / ${selectedMonth}` : ""}
        </p>
        <div>
          <PendingTableComponent columns={tableColumns1} rows={pendingPayment} />
        </div>
      </div>
    </>
  );
};

export default AddPayments;
