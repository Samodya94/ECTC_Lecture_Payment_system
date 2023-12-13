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
  "Action",
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
    if (lecturer === "" && selectedMonth === "" && selectedYear === "") {
      getApprovedLectureCoverage();
    }
    else if (lecturer === "" && selectedMonth !== "" && selectedYear !== "") {
      const response = approvedCoverages.filter((item) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (month === parseInt(selectedMonth) && year === parseInt(selectedYear));
      });
      setApprovedCoverages(response);
    }
    else if (lecturer !== "" && selectedMonth === "" && selectedYear === "") {
      const response = approvedCoverages.filter((item) => {
        return (item.lectureid === lecturer);
      });
      setApprovedCoverages(response);
    }
    else if (lecturer !== "" && selectedMonth !== "" && selectedYear !== "") {
      const response = approvedCoverages.filter((item) => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return (item.lectureid === lecturer && month === parseInt(selectedMonth) && year === parseInt(selectedYear));
      });
      setApprovedCoverages(response);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setLecturer("");
    setSelectedMonth("");
    setSelectedYear("");
    getApprovedLectureCoverage();
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
          <TableComponent columns={tableColumns} rows={approvedCoverages} />
        </div>
      </div>
    </>
  );
};

export default ApprovedLectures;