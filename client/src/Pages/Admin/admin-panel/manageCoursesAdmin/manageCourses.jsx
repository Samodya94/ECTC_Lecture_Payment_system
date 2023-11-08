import { React, useState, useEffect, useMemo, useCallback } from "react";

// Styles
import styles from "./manageCourses.module.css";

// Components
import TableComponent from "./components/coursesTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
import Service from "../../../../utilities/httpService";

const tableColumns = ["Course Name", "Course Fee", "Course Duration", "Action"];

const ManageCourses = () => {
  const [courseName, setCourseName] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  const service = useMemo(() => new Service(), []);


  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getCourses();
    } else {
      const filteredCourses = courses.filter((course) =>
        course.courseName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCourses(filteredCourses);
    }
  };

  const getCourses = useCallback(() => {
    const response = service.get(`course/`);
    response
      .then((res) => {
        setCourses(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getCourses();

  }, [getCourses]);

  //new course 
  const newCourse = {
    courseName: courseName,
    courseFee: courseFee,
    courseDuration: courseDuration,

  };

  //create new course function
  function createCourse(e) {
    e.preventDefault();
    const response = service.post(`course/`, newCourse);
    response.then((res) => {
      alert("New Course Added");
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Manage Courses</p>
          <form onSubmit={createCourse}>
            <InputField
              lable={"Course Name"}
              placeholder={"Enter Course Name"}
              setValue={setCourseName}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Course Fee (RS)"}
              placeholder={"Enter Course Fee"}
              setValue={setCourseFee}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Course Duration (Months)"}
              placeholder={"Enter Course Duration"}
              setValue={setCourseDuration}
              style={{ width: "300px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Add Course"}
                type={"submit"}
                style={{
                  backgroundColor: "#5A84AE",
                  padding: "10px 20px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginTop: "20px",
                }}
              />
            </div>
          </form>
        </div>
        <div>
          <p className={styles.subHeading}>Course Details</p>
          <SearchField lable={"Search By Name"} handleChange={handleSearch} />
          <div>
            <TableComponent columns={tableColumns} rows={courses} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCourses;
