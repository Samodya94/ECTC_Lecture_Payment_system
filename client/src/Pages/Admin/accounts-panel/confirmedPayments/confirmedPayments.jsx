import { React, useState, useEffect, useMemo } from "react";
import axios from 'axios';
import Service from "../../../../utilities/httpService";

// Styles
import styles from "./confirmedPayments.module.css";

// Components
import DropdownField from "../../components/dropdownField";
import PrimaryButton from "../../components/primaryButton";
import MonthSelector from "../../components/monthSelectorField";

const ConfirmedPayments = () => {
  const [lecturerId, setLecturerId] = useState("");
  const [batch, setBatch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const service = useMemo(() => new Service(), []);

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


  useEffect(() => {
    const respone = service.get(`batch/`)
    respone.then((res) => {
      setBatchList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [batchList, setBatchList] = useState([]);

  const batchListAll = batchList.map((item) => {
    return { _id: item._id, name: item.batchCode };
  });

  const handleDateChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleLecturerChange = (e) => {
    setLecturerId(e.target.value);
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  };

  async function getLecturerName(lecturerid) {
    try {
      let lecturerName = "";
      lecturerList.forEach((item) => {
        if (item._id === lecturerid) {
          lecturerName = item.firstName + " " + item.lastName;
        }
      });
      return lecturerName;
    } catch (err) {
      console.log(err);
    }
  }

  const handleDownload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const lname = await getLecturerName(lecturerId);

    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/api/payment/report/export', {
        responseType: 'blob',
        params: {
          lecturerId: lecturerId,
          batchcode: batch,
          month: selectedMonth,
        },
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${lname}_Payment.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Confirmed Lecturer Payments</p>
          <form onSubmit={handleDownload}>
            <DropdownField
              lable={"Lecturer"}
              list={lecturerListAll}
              handleOptionChange={handleLecturerChange}
              selectedBranch={lecturerId}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Batch"}
              list={batchListAll}
              handleOptionChange={handleBatchChange}
              selectedBranch={batch}
              style={{ width: "318px" }}
            />
            <MonthSelector
              lable={"Month"}
              handleDateChange={handleDateChange}
              style={{ width: "300px", marginLeft: "0px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Export Report"}
                type={"submit"}
                style={{
                  backgroundColor: "#5A84AE",
                  padding: "10px 20px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginTop: "20px",
                }}
              />
              {isLoading ? 'Downloading...' : ''}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmedPayments;
