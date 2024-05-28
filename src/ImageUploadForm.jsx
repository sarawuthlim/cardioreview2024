import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import {
  TextField,
  Button,
  Box,
  FormControl,
  FormHelperText,
} from "@mui/material";

async function fetchDataFromFirebase() {
  const querySnapshot = await getDocs(collection(db, "register"));
  const fetchedData = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({ id: doc.id, ...doc.data() });
  });
  return fetchedData;
}

// function check whether given email is already registered (in the email array)
function isEmailRegistered(email, emailArray) {
  return emailArray.includes(email);
}

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

function ImageUploadForm({ onLoadingChange }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredEmails, setRegisteredEmails] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        setData(data);
        // set registered emails
        setRegisteredEmails(data.map((item) => item.email));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const [emailError, setEmailError] = useState(false);

  const handleEmailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);

    const isEmailAlreadyRegistered = isEmailRegistered(
      e.target.value,
      registeredEmails
    );

    setEmailError(!isValidEmail || isEmailAlreadyRegistered);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institute: "",
    code: "",
    image: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const errors = {};
    if (e.target.name === "email" && emailError) {
      errors.email = "Invalid email address";
    }
    setFormErrors(errors);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: e.target.files[0] });

    // Create image preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    onLoadingChange(true);

    try {
      // 1. Create new file name from input
      const newFileName = `${formData.image.name.replace(/\s+/g, "_")}`;

      // 2. Image Upload
      let imageUrl = "";
      if (formData.image) {
        const storageRef = ref(storage, `images/${newFileName}`);
        await uploadBytes(storageRef, formData.image);
        imageUrl = await getDownloadURL(storageRef);
      }

      // 3. Store Data in Firestore
      await addDoc(collection(db, "register"), {
        name: formData.name,
        email: formData.email,
        institute: formData.institute,
        code: formData.code,
        imageUrl,
        timestamp: new Date().toLocaleDateString(),
        applyType: "self",
        approved: false,
      });

      // 4. Reset form and loading state
      setFormData({
        name: "",
        email: "",
        institute: "",
        code: "",
        image: null,
      });
      setIsLoading(false);
      onLoadingChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
      onLoadingChange(false);
    }
  };

  return (
    <>
      <h2>ลงทะเบียน</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& .MuiTextField-root": { mb: 2 } }}
      >
        <FormControl error={!!formErrors.name} fullWidth>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="ชื่อ สกุล (ไม่ต้องใส่คำนำหน้า)"
            name="name"
            value={formData.name}
            fullWidth
            required
            onChange={handleChange}
          />
          {formErrors.name && (
            <FormHelperText>{formErrors.name}</FormHelperText>
          )}
        </FormControl>
        <FormControl error={!!formErrors.email} fullWidth>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={
              emailError
                ? "Invalid email address or this email is already registered"
                : ""
            }
            fullWidth
            required
          />
          {emailError && formErrors.email && (
            <FormHelperText>{formErrors.email}</FormHelperText>
          )}
        </FormControl>

        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="สถาบันที่ทำงาน/ศึกษา"
          name="institute"
          value={formData.institute}
          fullWidth
          onChange={handleChange}
        />

        <TextField
          type="text"
          variant="outlined"
          color="secondary"
          label="เลข ว. เฉพาะแพทย์ (เพื่อให้ได้ CME)"
          name="code"
          value={formData.code}
          fullWidth
          onChange={handleChange}
        />

        <Button variant="outlined" component="label" fullWidth>
          แนบรูปภาพหลักฐานโอนเงิน 1,000 บาท *
          <input
            type="file"
            accept="image/*"
            name="image"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        <div style={{ height: "15px" }}></div>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            style={{ width: "80%", height: "auto" }}
          />
        )}
        <div style={{ height: "10px" }}></div>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={
            isLoading || !previewUrl || Object.keys(formErrors).length > 0
          }
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </>
  );
}

export default ImageUploadForm;
