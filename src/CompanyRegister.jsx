import React, { useEffect, useState } from "react";
import {
  db,
  fetchDataFromFirebase,
  getComanyById,
  getCurrentBKKTime,
  isEmailRegistered,
  likeFilter,
} from "./util";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";

import { SnackbarProvider, useSnackbar } from "notistack";

function CompanyRegister() {
  const { companyId, typeRegister } = useParams();
  const company = getComanyById(companyId);

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institute: "",
    code: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);

    async function fetchData() {
      try {
        const data = await fetchDataFromFirebase();
        setRegisteredEmails(data.map((item) => item.email));
        setRegisteredName(data.map((item) => item.name));
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const [nameSimilarList, setNameSimilarList] = useState([]);

  const handleNameChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setNameSimilarList(likeFilter(registeredName, e.target.value));
  };

  const [registeredEmails, setRegisteredEmails] = useState([]);
  const [registeredName, setRegisteredName] = useState([]);
  const [emailError, setEmailError] = useState(false);
  const [isEmailAlreadyRegistered, setIsEmailAlreadyRegistered] =
    useState(false);

  const handleEmailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);

    const isEmailAlreadyRegistered = isEmailRegistered(
      e.target.value,
      registeredEmails
    );

    setEmailError(!isValidEmail || isEmailAlreadyRegistered);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "register"), {
        name: formData.name,
        email: formData.email,
        institute: formData.institute,
        code: formData.code,
        timestamp: getCurrentBKKTime(),
        applyType: typeRegister,
        sponsor: companyId,
        approved: true,
        imageUrl: "",
      });

      setFormData({
        name: "",
        email: "",
        institute: "",
        code: "",
      });

      enqueueSnackbar("ลงทะเบียนสำเร็จแล้ว", { variant: "success" });
      navigate(`/company/${companyId}`, {
        state: { message: "ลงทะเบียนสำเร็จแล้ว", status: "success" },
      });

      setIsLoading(false);
    } catch (error) {
      console.log("Error submitting form:", error);
      enqueueSnackbar("ลงทะเบียนไม่สำเร็จ", { variant: "error" });
      navigate(`/company/${companyId}`, {
        state: { message: "ลงทะเบียนไม่สำเร็จ", status: "error" },
      });

      setIsLoading(false);
    } finally {
    }
  };

  const StyledListItem = styled(ListItem)(({ theme }) => ({
    padding: 0,
    margin: 0,
    fontSize: 12,
    color: "gray",
  }));

  const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    padding: 0,
    margin: 0,
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 2 }} />
      <Typography variant="h4" sx={{ textTransform: "uppercase", mb: 2 }}>
        {company.name}
        {company.product && ` - ${company.product}`}
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        ลงทะเบียน {typeRegister}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ "& .MuiTextField-root": { mb: 2 } }}
      >
        <Card sx={{ marginBottom: 2, padding: 2 }}>
          <SnackbarProvider maxSnack={3}>
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
                onChange={handleNameChange}
              />
              {formErrors.name && (
                <FormHelperText>{formErrors.name}</FormHelperText>
              )}
              {nameSimilarList.length > 0 && formData.name.length > 0 && (
                <Box marginBottom={2}>
                  <Box marginBottom={1}>ชื่อที่คล้ายกันที่ลงทะเบียนแล้ว</Box>
                  <List disablePadding sx={{ listStyle: "none" }}>
                    {nameSimilarList.map((item) => (
                      <StyledListItem key={item} disableGutters>
                        <StyledListItemText
                          primary={item}
                          disableTypography
                        ></StyledListItemText>
                      </StyledListItem>
                    ))}
                  </List>
                </Box>
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading || Object.keys(formErrors).length > 0}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </SnackbarProvider>
        </Card>

        <Box sx={{ flexGrow: 1, mt: 3, width: { xs: "100%", sm: "auto" } }}>
          <Link to={`/company/${companyId}`}>
            <Button size="small" variant="outlined" fullWidth color="primary">
              กลับไปที่หน้าบริษัท
            </Button>
          </Link>
        </Box>

      </Box>
    </>
  );
}

export default CompanyRegister;
