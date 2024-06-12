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
} from "@mui/material";
import { agendaArray } from "./agendaArray";

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
              </Box>
            </CardContent>
          )}
        </Card>
      ))}
    </>
  );
}

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
