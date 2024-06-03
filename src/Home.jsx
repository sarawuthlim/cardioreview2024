import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import "./Home.css";
import { Link } from "react-router-dom";
import DrawerAppBar from "./DrawerAppBar";

const image = "src/assets/heart.jpeg";
const imageText = "PMK Cardio Review 2024";
const title = "PMK Cardio Review 2024";
const description =
  "A comprehensive review of cardiovascular diseases and treatments.";
const keynoteLectureUrl = "src/assets/KeynoteLecture.png";

const diamondSponsors = [
  {
    img: "src/assets/1-Daiichi.jpg",
    title: "Daiichi Sankyo",
  },
  {
    img: "src/assets/1-Bayer.jpg",
    title: "Bayer Thai",
  },
  {
    img: "src/assets/1-Boehringer.jpg",
    title: "Boehringer Ingelheim",
  },
  {
    img: "src/assets/1-Novartis.jpg",
    title: "Novartis",
  },
  {
    img: "src/assets/1-AstraZeneca.jpg",
    title: "AstraZeneca",
  },
  {
    img: "src/assets/1-AbbottMedical.jpg",
    title: "Abbott Medical",
  },
  {
    img: "src/assets/1-NovoNordisk.jpg",
    title: "Novo Nordisk",
  },
];

const platinumSponsors = [
  {
    img: "src/assets/2-Biopharm.jpg",
    title: "Biopharm",
  },
  {
    img: "src/assets/2-Amgen.jpg",
    title: "Amgen",
  },
];

const goldSponsors = [
  {
    img: "src/assets/3-AMenarini.jpg",
    title: "A.Menarini",
  },
  {
    img: "src/assets/3-Asahi.jpg",
    title: "Asahi Kasei",
  },
  {
    img: "src/assets/3-ATB.jpg",
    title: "American Taiwan Biopharm",
  },
  {
    img: "src/assets/3-Berlin.jpg",
    title: "Berlin",
  },
  {
    img: "src/assets/3-BostonScientific.svg",
    title: "Boston Scientific",
  },
  {
    img: "src/assets/3-Medtronic.jpg",
    title: "Medtronic",
  },
  {
    img: "src/assets/3-Organon.jpg",
    title: "Organon",
  },
  {
    img: "src/assets/3-Pfizer.jpg",
    title: "Pfizer",
  },
  {
    img: "src/assets/3-Servier.svg",
    title: "Servier",
  },
  {
    img: "src/assets/3-ThaiOtsuka.jpg",
    title: "Thai Otsuka",
  },
  {
    img: "src/assets/3-Viatris.jpg",
    title: "Viatris",
  },
  {
    img: "src/assets/3-Zuellig.jpg",
    title: "Zuellig Pharma",
  },
  {
    img: "src/assets/3-LGChem.jpg",
    title: "LG Chem",
  },
  {
    img: "src/assets/3-Roche.jpg",
    title: "Roche Diagnostics",
  },
];

function Home() {
  return (
    <>
      <DrawerAppBar />
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 2,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src={image} alt={imageText} />}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container>
          <Grid item md={12}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 6 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {title}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {description}
              </Typography>
              <Link to="/register">
                <Button variant="contained" size="large">
                  Register Now !!!
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="ิิbody1" color="primary" gutterBottom>
            การประชุมวิชาการ <br />
            แผนกโรคหัวใจและหลอดเลือด <br />
            โรงพยาบาลพระมงกุฎเกล้า <br />
            ณ ชั้น 10 อาคารเฉลิมพระเกียรติ 6 รอบ พระชนมพรรษา<br />
            13-14 กรกฎาคม 2567
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ width: "100%", mt: 2 }}>
        <img
          src={keynoteLectureUrl}
          alt="ดร.วิทย์​ สิทธิเวคิน"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>

      <Card sx={{ minWidth: 275, mt: 4 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            Diamond Sponsors
          </Typography>
          <ImageList cols={2} gap={26}>
            {diamondSponsors.map((item) => (
              <ImageListItem key={item.img} sx={{ height: 150 }}>
                {" "}
                // Set height here
                <Box
                  sx={{
                    paddingTop: "56.25%", // Adjust based on your desired aspect ratio (e.g., 16:9 = 56.25%)
                    position: "relative",
                  }}
                >
                  <img
                    srcSet={item.img}
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Use 'contain' to avoid cropping
                    }}
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275, mt: 4 }}>
        <CardContent>
          <Typography variant="h4" color="primary" gutterBottom>
            Platinum Sponsors
          </Typography>
          <ImageList cols={2}>
            {platinumSponsors.map((item) => (
              <ImageListItem key={item.img} sx={{ height: 100 }}>
                {" "}
                // Set height here
                <Box
                  sx={{
                    paddingTop: "17%", // Adjust based on your desired aspect ratio (e.g., 16:9 = 56.25%)
                    position: "relative",
                  }}
                >
                  <img
                    srcSet={item.img}
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Use 'contain' to avoid cropping
                    }}
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 275, mt: 4 }}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            Gold Sponsors
          </Typography>
          <ImageList cols={3} gap={16}>
            {goldSponsors.map((item) => (
              <ImageListItem key={item.img} sx={{ height: 100 }}>
                {" "}
                // Set height here
                <Box
                  sx={{
                    paddingTop: "20%", // Adjust based on your desired aspect ratio (e.g., 16:9 = 56.25%)
                    position: "relative",
                  }}
                >
                  <img
                    srcSet={item.img}
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Use 'contain' to avoid cropping
                    }}
                  />
                </Box>
              </ImageListItem>
            ))}
          </ImageList>
        </CardContent>
      </Card>
    </>
  );
}

export default Home;
