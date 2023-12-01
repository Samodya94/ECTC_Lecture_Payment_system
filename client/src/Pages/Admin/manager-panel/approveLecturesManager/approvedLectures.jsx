import { React, useState, useCallback, useMemo, useEffect } from "react";
import Service from "../../../../utilities/httpService"
// Styles
import styles from "./approveLectures.module.css";

// Components
import TableComponent from "./components/approvedCoverageTable";
import DropdownInput from "./components/dropdownInput";
import MonthSelector from "./components/monthSelectorField";

const tableColumns = [
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Date",
  "Start Time",
  "End Time",
  "Total Hours",
  "Lecture Coverage",
];

const lecturerList = [
  { _id: "1", name: "Asha Madushani" },
  { _id: "2", name: "Dammika Priyasad" },
  { _id: "3", name: "Charith Athulgala" },
];

const ApprovedLectures = () => {
  const [lecturer, setLecturer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const service = useMemo(() => new Service(), []);

  const [approvedCoverages, setApprovedCoverages] = useState([]);

  const getApprovedLectureCoverage = useCallback(() => {
    const response = service.get(`coverage/approved`);
    response
      .then((res) => {
        setApprovedCoverages(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getApprovedLectureCoverage();
  }, [getApprovedLectureCoverage]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(selectedMonth, selectedYear, lecturer);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Approved Lecture Coverages</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <MonthSelector
            handleDateChange={handleDateChange}
            style={{ width: "300px", marginLeft: "0px" }}
          />
          <DropdownInput
            list={lecturerList}
            handleOptionChange={handleOptionChange}
            selectedBranch={lecturer}
            style={{ width: "300px" }}
          />
          <button className={styles.button} type="submit">
            View
          </button>
        </form>
        <div>
          <TableComponent columns={tableColumns} rows={approvedCoverages} />
        </div>
      </div>
    </>
  );
};

export default ApprovedLectures;
