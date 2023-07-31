import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(setValue, getValues) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  if (!setValue || !getValues) return;
  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing");
        }
      },
      (error) => {
        console.log("Error" + error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    const desertRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(desertRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage(null);
        setProgress(0);
      })
      .catch((error) => {
        console.log("Can not remove image because error:" + error);
      });
  };
  const handleResetImage = () => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetImage,
  };
}
