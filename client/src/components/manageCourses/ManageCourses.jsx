import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './manageCourses.module.css';

const AddCourse = () => {

   const [courseName, setCourseName] = useState("");
   const [courseFee, setCourseFee] = useState("");
   const [courseDuration, setCourseDuration] = useState("");
   const [token, setToken] = useState("");
   const [courses, setCourses] = useState([]); // State to store existing courses
   const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

   const navigate = useNavigate()

   useEffect(() => {
      // Manually set a valid token here for testing
      const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTNlODUzNzM1YzlhNWMxMGRhYjdlMyIsImlhdCI6MTY5NDAyOTEzMywiZXhwIjoxNjk2NjIxMTMzfQ.sn1qmW_tCV10Uqv3No9k2y_hjOtjYhZjjOYS0Rh-mq4";
      setToken(validToken);

      // Fetch existing courses when the component mounts
      fetchExistingCourses(validToken);
   }, []);

   const fetchExistingCourses = async (token) => {
      try {
         const res = await fetch(`http://localhost:8000/api/course`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "GET",
         });
         const existingCourses = await res.json();
         setCourses(existingCourses);
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleCreateCourses = async (e) => {
      e.preventDefault()
      try {
         // Uploading courses
         const res = await fetch(`http://localhost:8000/api/course`, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
               courseName,
               courseFee,
               courseDuration
            })
         });
         const ectc = await res.json();
         alert("Preferred Course added Successfully");
         setCourseName(""); // Clear the input fields
         setCourseFee("");
         setCourseDuration("");
         fetchExistingCourses(token); // Refresh the list of existing courses
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleRemoveCourse = async (courseId) => {
      try {
         const res = await fetch(`http://localhost:8000/api/course/${courseId}`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "DELETE",
         });
         const result = await res.json();
         alert("Course removed Successfully");
         fetchExistingCourses(token); // Refresh the list of existing courses
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
   }

   // Filter courses based on the search term
   const filteredCourses = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>Manage Courses</h2>
            <form onSubmit={handleCreateCourses} encType="multipart/form-data">
               <div className={classes.inputWrapper}>
                  <label>Course Name:</label>
                  <input
                     type="text"
                     placeholder="Enter Course Name"
                     className={classes.input}
                     value={courseName}
                     onChange={(e) => setCourseName(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Course Fee:</label>
                  <input
                     type="text"
                     placeholder="Enter Course Fee"
                     className={classes.input}
                     value={courseFee}
                     onChange={(e) => setCourseFee(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Course Duration:</label>
                  <input
                     type="text"
                     placeholder="Enter Course Duration in Hours"
                     className={classes.input}
                     value={courseDuration}
                     onChange={(e) => setCourseDuration(e.target.value)}
                  />
               </div>

               <div className={classes.buttonWrapper}>
                  <button type="submit" className={classes.submitBtn}>
                    Add Course
                  </button>
               </div>
            </form>

            {/* Search bar */}
            <div className={classes.searchBar}>
               <input
                  type="text"
                  placeholder="Search Courses"
                  value={searchTerm}
                  onChange={handleSearch}
               />
            </div>

            {/* Table displaying existing courses */}
            <table className={classes.courseTable}>
               <thead>
                  <tr>
                     <th>Course Name</th>
                     <th>Course Fee</th>
                     <th>Course Duration</th>
                     <th>Action</th> {/* Added a new column for Remove buttons */}
                  </tr>
               </thead>
               <tbody>
                  {filteredCourses.map((course) => (
                     <tr key={course._id}>
                        <td>{course.courseName}</td>
                        <td>{course.courseFee}</td>
                        <td>{course.courseDuration}</td>
                        <td>
                           <button
                              className={classes.removeBtn}
                              onClick={() => handleRemoveCourse(course._id)}
                           >
                              Remove
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default AddCourse;
