import {
  Box,
  Card,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchDataFromFirebase } from "./util";
import ClearIcon from "@mui/icons-material/Clear";

function CheckContent({ onLoadingChange }) {
  const [data, setData] = useState([]);
  const [enteredInput, setEnteredInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [similarNameOrEmailList, setSimilarNameOrEmailList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    onLoadingChange(isLoading);
  }, []);

  const handleChange = (e) => {
    setEnteredInput(e.target.value);

    const inputValue = e.target.value.toLowerCase();

    const filteredData = data.filter((item) => {
      const itemName = item.name.toLowerCase();
      const itemEmail = item.email.toLowerCase();
      return itemName.includes(inputValue) || itemEmail.includes(inputValue);
    });
    setSimilarNameOrEmailList(filteredData);
  };

  return (
    <>
      <FormControl fullWidth>
        <TextField
          type="text"
          variant="outlined"
          color="primary"
          label="ชื่อ สกุล หรือ email ที่ต้องการค้นหา"
          name="enteredInput"
          value={enteredInput}
          fullWidth
          required
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setEnteredInput("")} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Box sx={{ mt: 2 }} fullWidth>
        {similarNameOrEmailList.length > 0 &&
          enteredInput != "" &&
          similarNameOrEmailList.map((item, index) => (
            <Card key={index} sx={{ mb: 1, padding: 1 }}>
              <Typography variant="body1" sx={{ display: "block" }}>
                {item.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "grey" }}
              >
                {item.email}
              </Typography>

              {item.approved && !item.discarded && (
                <Chip label="ลงทะเบียนสำเร็จ" color="success" size="small" />
              )}

              {!item.approved && !item.discarded && (
                <Chip label="รอการตรวจสอบ" color="warning" size="small" />
              )}

              {item.discarded && (
                <>
                  <Chip label="มีข้อผิดพลาด" color="error" size="small" />
                  <Typography
                    variant="caption"
                    sx={{ display: "block", color: "red" }}
                  >
                    กรุณาติดต่อเจ้าหน้าที่
                  </Typography>
                </>
              )}
            </Card>
          ))}
      </Box>
    </>
  );
}

export default CheckContent;
