import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SuccessSelfRegister() {
  const navigate = useNavigate();
  const [secondsRemaining, setSecondsRemaining] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    if (secondsRemaining === 0) {
      clearInterval(timer);
      navigate("/home");
    }

    return () => clearInterval(timer);
  }, [secondsRemaining, navigate]);
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 2 }} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "0 auto", flexGrow: 1, maxWidth: 1000, minWidth: 270}}
      >
        <Card
          sx={{
            
            padding: 3,
            flexGrow: 1,
            backgroundColor: "success.main",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1, color: "white" }}>
            ลงทะเบียนเรียบร้อยแล้ว
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "white", display: "block" }}
          >
            ท่านสามารถตรวจสอบผลการลงทะเบียน
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "white", display: "block" }}
          >
            ได้ที่หน้าเว็บหลัก
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, color: "white", display: "block" }}
          >
            หลังการตรวจสอบ 5 วันทำการ
          </Typography>
        </Card>
      </Grid>
      <Box sx={{ flexGrow: 1, mt: 1 }}>
        <Button
          size="large"
          variant="outlined"
          fullWidth
          onClick={() => navigate("/home")}
          color="success"
        >
          กลับไปที่หน้าหลัก
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ display: "block", marginTop: 1 }}>
          ...เปลี่ยนไปที่หน้าหลักใน {secondsRemaining} วินาที...
        </Typography>
      </Box>
    </>
  );
}

export default SuccessSelfRegister;
