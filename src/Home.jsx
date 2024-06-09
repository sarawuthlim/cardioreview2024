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

import image from '../src/assets/heart.jpeg';
import keynoteLectureUrl from '../src/assets/KeynoteLecture.png';

const imageText = "PMK Cardio Review 2024";

const title = "PMK Cardio Review 2024";
const description =
  "The Journey of Cardiology: From the Past to the Future";

import daiichi from "../src/assets/1-Daiichi.jpg";
import bayer from "../src/assets/1-Bayer.jpg";
import boehringer from "../src/assets/1-Boehringer.jpg";
import novartis from "../src/assets/1-Novartis.jpg";
import astraZeneca from "../src/assets/1-AstraZeneca.jpg";
import abbottMedical from "../src/assets/1-AbbottMedical.jpg";
import novoNordisk from "../src/assets/1-NovoNordisk.jpg";

const diamondSponsors = [
  {
    img: daiichi,
    title: "Daiichi Sankyo",
  },
  {
    img: bayer,
    title: "Bayer Thai",
  },
  {
    img: boehringer,
    title: "Boehringer Ingelheim",
  },
  {
    img: novartis,
    title: "Novartis",
  },
  {
    img: astraZeneca,
    title: "AstraZeneca",
  },
  {
    img: abbottMedical,
    title: "Abbott Medical",
  },
  {
    img: novoNordisk,
    title: "Novo Nordisk",
  },
];

import biopharm from "../src/assets/2-Biopharm.jpg";
import amgen from "../src/assets/2-Amgen.jpg";

const platinumSponsors = [
  {
    img: biopharm,
    title: "Biopharm",
  },
  {
    img: amgen,
    title: "Amgen",
  },
];

import menarini from "../src/assets/3-AMenarini.jpg";
import asahi from "../src/assets/3-Asahi.jpg";
import atb from "../src/assets/3-ATB.jpg";
import berlin from "../src/assets/3-Berlin.jpg";
import bostonScientific from "../src/assets/3-BostonScientific.svg";
import medtronic from "../src/assets/3-Medtronic.jpg";
import organon from "../src/assets/3-Organon.jpg";
import pfizer from "../src/assets/3-Pfizer.jpg";
import servier from "../src/assets/3-Servier.svg";
import thaiOtsuka from "../src/assets/3-ThaiOtsuka.jpg";
import viatris from "../src/assets/3-Viatris.jpg";
import zuellig from "../src/assets/3-Zuellig.jpg";
import lgChem from "../src/assets/3-LGChem.jpg";
import roche from "../src/assets/3-Roche.jpg";
import meditop from "../src/assets/3-Meditop.jpg";

const goldSponsors = [
  {
    img: menarini,
    title: "A.Menarini",
  },
  {
    img: asahi,
    title: "Asahi Kasei",
  },
  {
    img: atb,
    title: "American Taiwan Biopharm",
  },
  {
    img: berlin,
    title: "Berlin",
  },
  {
    img: bostonScientific,
    title: "Boston Scientific",
  },
  {
    img: medtronic,
    title: "Medtronic",
  },
  {
    img: organon,
    title: "Organon",
  },
  {
    img: pfizer,
    title: "Pfizer",
  },
  {
    img: servier,
    title: "Servier",
  },
  {
    img: thaiOtsuka,
    title: "Thai Otsuka",
  },
  {
    img: viatris,
    title: "Viatris",
  },
  {
    img: zuellig,
    title: "Zuellig Pharma",
  },
  {
    img: lgChem,
    title: "LG Chem",
  },
  {
    img: roche,
    title: "Roche Diagnostics",
  },
  {
    img: meditop,
    title: "Meditop",
  }
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
