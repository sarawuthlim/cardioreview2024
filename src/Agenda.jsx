import React, { useEffect, useState } from "react";
import DrawerAppBar from "./DrawerAppBar";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Chip,
  Box,
  ToggleButton,
  Container,
  Divider,
  Grid,
  ToggleButtonGroup,
  Avatar,
  Button,
  Rating,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { agendaArray } from "./agendaArray";
import Modal from "@mui/material/Modal";
import { addDoc, collection } from "firebase/firestore";

import { db, getCurrentBKKTime } from "./util";

function Agenda() {
  const [agenda, setAgenda] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(chooseDate());
  const [filteredAgenda, setFilteredAgenda] = useState([]);

  useEffect(() => {
    setAgenda(agendaArray);
    setFilteredAgenda(
      agendaArray.filter((item) => item.date[1] == selectedDate[1])
    );
  }, []);

  const handleDateChange = (event, newDate) => {
    setSelectedDate(newDate);
    setFilteredAgenda(agenda.filter((item) => item.date[1] == newDate[1]));
  };

  // function about rating
  const [openModal, setOpenModal] = useState(false);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");
  const [userCode, setUserCode] = useState("");
  const [headerModal, setHeaderModal] = useState({ title: "", id: "" });

  const handleCloseModal = () => {
    setOpenModal(false);
    setRating(null);
    setComment("");
    setUserCode("");
  };

  const handleRating = (id, title) => {
    setHeaderModal({ title: title, id: id });
    setOpenModal(true);
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success', 'error', 'warning', 'info'

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmitModal = async () => {
    try {
      const feedbackData = {
        id: headerModal.id,
        rating: rating,
        comment: comment || null,
        userCode: userCode || null,
        timestamp: getCurrentBKKTime(),
      };
      // save to firestore
      const feedbackCollection = collection(db, "feedback");
      await addDoc(feedbackCollection, feedbackData);

      setSnackbarMessage("Feedback submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setSnackbarMessage(
        "There was an error submitting your feedback. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Container maxWidth={false} sx={{ marginBottom: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography variant="h4" component="h1" gutterBottom marginTop={0}>
            Agenda
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={selectedDate}
            exclusive
            onChange={handleDateChange}
            sx={{ marginTop: 2 }}
          >
            <ToggleButton
              value="13 กรกฎาคม 67"
              size="large"
              sx={{ paddingX: 2 }}
            >
              เสาร์ 13 ก.ค. 67
            </ToggleButton>
            <ToggleButton
              value="14 กรกฎาคม 67"
              size="large"
              sx={{ paddingX: 2 }}
            >
              อาทิตย์ 14 ก.ค. 67
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Divider sx={{ marginY: 2 }} />
      </Container>
      {filteredAgenda.map((item) => (
        <Card
          sx={
            item.room && item.speaker
              ? { minWidth: 345, mb: 2 }
              : { minWidth: 345, mb: 2, bgcolor: "#c0d5f1" }
          }
          key={item.id}
          elevation={item.title.includes("Break") ? 0 : 3}
        >
          <CardHeader
            title={
              <Typography
                variant="h5"
                component="div"
                align="center"
                color={item.title.includes("Break") ? "white" : "black"}
                fontWeight={item.title.includes("Break") ? "normal" : "bold"}
              >
                {item.title}
              </Typography>
            }
            subheader={
              <>
                {item.speaker && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    align="center"
                  >
                    {!item.speaker && item.speaker}
                  </Typography>
                )}
                <Typography variant="h6" color="text.secondary" align="center">
                  {typeof item.speaker === "string" && item.speaker}
                  {item.speaker &&
                    typeof item.speaker === "object" &&
                    item.speaker.join(" | ")}
                </Typography>
                {item.title.includes("Break") && (
                  <Typography variant="body1" color="white" align="center">
                    {item.startTime} - {item.endTime}
                  </Typography>
                )}
              </>
            }
          />
          {item.speaker && item.speaker.length >= 1 && (
            <CardContent>
              {item.type == "Invited Keynote Lecture" && (
                <Box
                  sx={{ display: "flex", justifyContent: "center" }}
                  marginBottom={2}
                >
                  <Avatar
                    alt="Invited Keynote Lecture"
                    src={item.imageUrl}
                    sx={{ width: 150, height: 150 }}
                  />
                </Box>
              )}
              <Typography variant="body1" color="text.secondary">
                {item.startTime} - {item.endTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Room: {item.room}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {item.type && (
                  <Chip
                    label={`${item.type}`}
                    color="info"
                    variant="outlined"
                    sx={{ mt: 1, width: "fit-content" }}
                  />
                )}
                {item.sponsor && (
                  <Chip
                    label={`Sponsored by ${item.sponsor}`}
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1, width: "fit-content" }}
                  />
                )}
                {
                  // if item.title not inlcude "Break" add "Rating" button that open modal have onClick
                  !item.title.includes("Break") && (
                    <Chip
                      label="Feedback"
                      color="warning"
                      variant="filled"
                      sx={{ mt: 1, width: "fit-content" }}
                      onClick={() => handleRating(item.id, item.title)}
                    />
                  )
                }
                {
                  // if item.slide is not empty add "Slide" button that open new tab
                  item.slide && (
                    <Chip
                      label="Slide"
                      color="primary"
                      variant="filled"
                      sx={{
                        mt: 1,
                        width: "fit-content",
                        "&:hover": { cursor: "pointer" },
                      }}
                      component="a"
                      href={item.slide}
                      target="_blank"
                    />
                  )
                }
              </Box>
            </CardContent>
          )}
        </Card>
      ))}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="feedback-modal"
      >
        <Box sx={style}>
          <h2>{headerModal.title}</h2>
          <div>โปรดให้คะแนนและความคิดเห็น</div>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            precision={0.5} // Allow half-star ratings
            size="large"
            sx={{ mb: 2 }} // Add bottom margin
          />

          <TextField
            label="Comment (Optional)"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="เลขลำดับเพื่อลุ้นรางวัล (Optional)"
            value={userCode}
            fullWidth
            onChange={(e) => setUserCode(e.target.value)}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleSubmitModal} disabled={!rating}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Position at bottom-left
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default Agenda;

function chooseDate() {
  const bangkokDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  const date14072024 = new Date("2024-07-14T00:00:00").toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  if (new Date(bangkokDate) < new Date(date14072024)) {
    return "13 กรกฎาคม 67";
  } else {
    return "14 กรกฎาคม 67";
  }
}
