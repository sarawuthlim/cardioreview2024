import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1, // Padding top/bottom
        px: 2, // Padding left/right
        mt: "auto", // Push footer to bottom with margin-top: auto
        backgroundColor: "lightblue"
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ display: "block" }}
        >
          แผนกโรคหัวใจและหลอดเลือด
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ display: "block" }}
        >
          กองอายุรกรรม โรงพยาบาลพระมงกุฎเกล้า
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ display: "block" }}
        >
          โทร. 0-2763-3827 , 0-2354-7726
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ display: "block" }}
        >
          email: cardiology.pmk@hotmail.com
        </Typography>
      </Container>
    </Box>
  );
}
