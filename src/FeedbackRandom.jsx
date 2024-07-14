import React, { useEffect, useState } from "react";
import { db } from "./util";
import { collection, getDocs } from "firebase/firestore";
import { agendaArray } from "./agendaArray";
import {
  Card,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Styled TableContainer for centering and width adjustment
const CenteredTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "80%",
  margin: "0 auto", // Center horizontally
}));

// Styled TableCell for auto-fitting content
const AutoFitTableCell = styled(TableCell)(({ theme }) => ({
  width: "auto",
}));

function FeedbackResults() {
  const [data, setData] = useState();

  // fetch feedback data from firebase
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchFeedbackDataFromFirebase();
        //agendaArray: filter where speaker is not empty
        let result = agendaArray
          .filter((agenda) => agenda.speaker)
          .map((agenda) => {
            const ratingCounts = response
              .filter((item) => item.id == agenda.id)
              .reduce((acc, item) => {
                const ratingKey = `rating${Math.round(item.rating * 2)}Count`;
                acc[ratingKey] = (acc[ratingKey] || 0) + 1;
                return acc;
              }, {});

            const totalCount = Object.values(ratingCounts).reduce(
              (sum, count) => sum + count,
              0
            );
            const comments = response
              .filter((item) => item.id == agenda.id && item.comment)
              .map((item) => item.comment);

            return {
              id: agenda.id,
              title: agenda.title,
              speaker: formatSpeaker(agenda.speaker),
              ...ratingCounts,
              totalCount,
              comments,
            };
          });

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // console.log(data);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>Feedback</h1>
      {data &&
        data.map((item) => (
          <Card key={item.id} style={{ marginBottom: "1rem" }}>
            <h2>{item.title}</h2>
            <p>Speaker: {item.speaker}</p>
            <p>ให้คะแนนทั้งหมด: {item.totalCount} คน</p>
            <div>
              <CenteredTableContainer component={Paper}>
                <Table sx={{ tableLayout: "auto" }}>
                  <colgroup>
                    <col style={{ width: 75 }} />
                    <col style={{ width: 71 }} />
                    <col style={{ width: 105 }} />
                    <col style={{ width: "auto" }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rating</TableCell>
                      <TableCell align="right">Count</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                      <TableCell align="left">Bar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(item)
                      .filter((key) => key.startsWith("rating"))
                      .sort((a, b) => item[b] - item[a])
                      .map((key) => {
                        const rating = key.replace("rating", "");
                        const count = item[key];
                        const percentage = (count / item.totalCount) * 100;

                        return (
                          <TableRow key={key}>
                            <TableCell component="th" scope="row">
                              {rating.replace("Count", "") / 2}
                            </TableCell>
                            <TableCell align="right">{count}</TableCell>
                            <TableCell align="right">
                              {percentage.toFixed(2)}%
                            </TableCell>
                            <TableCell align="left">
                              <div
                                style={{
                                  width: `${percentage}%`,
                                  height: "1em",
                                  backgroundColor: "lightblue",
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CenteredTableContainer>
            </div>
            {/* show only have comments */}
            {item.comments.length > 0 ? (
              <>
                <p style={{ textAlign: "left", paddingLeft: 25 }}>Comments:</p>
                <ul>
                  {item.comments.map((comment, index) => (
                    // li with align left and bullet as "-"
                    <li
                      key={index}
                      style={{ textAlign: "left", listStyle: "-" }}
                    >
                      {comment}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No comments</p>
            )}
          </Card>
        ))}
    </>
  );
}

export default FeedbackResults;

async function fetchFeedbackDataFromFirebase() {
  const querySnapshot = await getDocs(collection(db, "feedback"));
  const fetchedData = [];
  querySnapshot.forEach((doc) => {
    fetchedData.push({ id: doc.id, ...doc.data() });
  });
  return fetchedData;
}

function formatSpeaker(x) {
  if (Array.isArray(x)) {
    // Check if x is an array
    return x.join(" | "); // Join array elements with " | "
  } else {
    return x; // Return the string as is
  }
}
