import { React, useState } from "react";

// Styles
import styles from "./photoUploadCard.module.css";

const PhotoUploadCard = ({ profileImage, setProfileImage }) => {
  //   const [profileImage, setProfileImage] = useState(null);

  const onImageChange = (e) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const selectedFile = e.target.files[0];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      // It's a valid image file (jpg or png), proceed with the logic
      console.log("File is valid:", selectedFile);
      // Convert the selected image to a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // It's not a valid image file
      alert("Invalid file type. Please select a jpg or png file.");
      // Clear the input value to reset the selection
      e.target.value = null;
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <p className={styles.heading}>Upload a Profile Picture</p>
          <p className={styles.subHeading}>jpg | png</p>
        </div>
        <div className={styles.imageUploadDiv}>
          <input
            type="file"
            onChange={onImageChange}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.profileImgPreview}>
          {profileImage && <img src={profileImage} alt="Selected Profile" />}
        </div>
      </div>
    </>
  );
};

export default PhotoUploadCard;
