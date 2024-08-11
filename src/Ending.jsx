import React from "react";
import { db, fetchDataFromFirebase } from "./util";
import { collection, getDocs } from "firebase/firestore";

function Ending() {
  const downloadFeedback = async () => {
    // download feedback data
    const data = await fetchFeedbackDataFromFirebase();
    console.log(data);
    // Convert data to CSV
    const csvData = convertFeedbackDataToCsv(data);

    // Create a Blob object
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element

    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback.csv"; // Set the filename
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const downloadRegister = async () => {
    // download register data
    const data = await fetchDataFromFirebase();
    // Convert data to CSV
    const csvData = convertRegisterDataToCsv(data);

    // Create a Blob object
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element

    const a = document.createElement("a");
    a.href = url;
    a.download = "register.csv"; // Set the filename
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  function handleNullValues(value) {
    let newValue = value === null ? " " : value;
    // remove \n from the value if newValue is a string
    if (typeof newValue === "string") {
      newValue = newValue.replace(/\n/g, "");
    }
    return newValue;
  }

  function convertFeedbackDataToCsv(data) {
    // Assuming 'data' is an array of objects
    const headers = Object.keys(data[0]).join(",");
    const csvRows = data.map((obj) => {
      let row = [
        handleNullValues(obj.id),
        handleNullValues(obj.rating),
        handleNullValues(obj.comment),
        handleNullValues(obj.userCode),
        handleNullValues(obj.timestamp),
      ].join(",");
      return row;
    });
    return headers + "\n" + csvRows.join("\n");
  }

  function convertRegisterDataToCsv(data) {
    // Assuming 'data' is an array of objects
    const headers =
      "id,name,code,institute,email,applyType,sponsor,approved,discarded,timestamp";
    const csvRows = data.map((obj) => {
      let row = [
        handleNullValues(obj.id),
        handleNullValues(obj.name),
        handleCodeValue(obj.code),
        handleNullValues(obj.institute),
        handleNullValues(obj.email),
        handleNullValues(obj.applyType),
        handleNullValues(obj.sponsor),
        handleNullValues(obj.approved),
        handleNullValues(obj.discarded),
        handleNullValues(obj.timestamp),
      ].join(",");
      return row;
    });
    return headers + "\n" + csvRows.join("\n");
  }

  const handleCodeValue = (value) => {
    if (value === null) {
      return " ";
    }

    if (value.length > 8) {
      return " ";
    }

    // if in front of value has "ว" or "ว." remove it and remove all spaces
    if (value.includes("ว") || value.includes("ว.")) {
      return value.replace("ว.", "").replace("ว", "").replace(/\s+/g, "");
    }

    // if value is a number, return the number
    if (!isNaN(value)) {
      return value;
    }

    // } else if (value.includes("ว") || value.includes("ว.")) {
    //   return value.replace("ว", "").replace("ว.", "").replace(/\s+/g, "");
    // } else if (+value === NaN) {
    //   return " ";
  };

  return (
    <div>
      <br />
      <button onClick={() => downloadFeedback()}>download feedback</button>
      <br />
      <button onClick={() => downloadRegister()}>download register</button>
    </div>
  );
}

export default Ending;

async function fetchFeedbackDataFromFirebase() {
  const querySnapshot = await getDocs(collection(db, "feedback"));
  const fetchedData = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({ id: doc.id, ...doc.data() });
  });
  return fetchedData;
}
